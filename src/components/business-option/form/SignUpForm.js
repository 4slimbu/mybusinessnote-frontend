import React, {Component} from "react";
import PropTypes from 'prop-types';
import jwt_decode from "jwt-decode";
import {validateEmail, validateCreateUser, validateUpdateUser} from "../../../utils/validation/UserValidation";
import TextFieldGroup from "../../common/TextFieldGroup";
import {withRouter} from "react-router-dom";
import setAuthorizationToken from "../../../utils/axios/setAuthorizationToken";
import {getAppUrlFromApiUrl, mbjLog} from "../../../utils/helper/helperFunctions";
import ReCAPTCHA from "react-google-recaptcha";

class SignUpForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            first_name: {
                isChanged: false,
                label: "First Name",
                name: "first_name",
                placeholder: "First Name",
                value: "",
                oldValue: "",
                type: "text"
            },
            last_name: {
                isChanged: false,
                label: "Last Name",
                name: "last_name",
                placeholder: "Last Name",
                value: "",
                oldValue: "",
                type: "text"
            },
            email: {
                isChanged: false,
                label: "Your Email",
                name: "email",
                placeholder: "eg. email@example.com",
                value: "",
                oldValue: "",
                type: "text"
            },
            phone_number: {
                isChanged: false,
                label: "Phone Number",
                name: "phone_number",
                placeholder: "eg. 88 8888 8888",
                value: "",
                oldValue: "",
                type: "text"
            },
            password: {
                isChanged: false,
                label: "Password",
                name: "password",
                placeholder: "Your secret password",
                value: "",
                oldValue: "",
                type: "password"
            },
            confirm_password: {
                isChanged: false,
                label: "Confirm Password",
                name: "confirm_password",
                placeholder: "Re-type your secret password",
                value: "",
                oldValue: "",
                type: "password"
            },
            captcha_response: "",
            errorCode: '',
            errors: {},
            isChanged: false,
        };
        this.onChange = this.onChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
        this.onReceiveCaptchaResponse = this.onReceiveCaptchaResponse.bind(this);
        this.checkIfUserExists = this.checkIfUserExists.bind(this);
        this.isFormValid = this.isFormValid.bind(this);
    }

    componentDidMount() {
        const {auth, appStatus} = this.props;
        const [user] = auth.user;
        this.setState({
            business_option_id: this.props.appStatus.currentBusinessOption.id,
            business_category_id: this.props.appStatus.business_category_id,
            first_name: this.props.appStatus.first_name,
            last_name: this.props.appStatus.last_name,
            email: this.props.appStatus.email,
            phone_number: this.props.appStatus.phone_number,
            sell_goods: this.props.appStatus.sell_goods,
            user_id: this.props.appStatus.user_id ? this.props.appStatus.user_id : null,
        });
    }

    componentWillReceiveProps() {
        this.setState({
            business_option_id: this.props.appStatus.currentBusinessOption.id,
            business_category_id: this.props.appStatus.business_category_id,
            first_name: this.props.appStatus.first_name,
            last_name: this.props.appStatus.last_name,
            email: this.props.appStatus.email,
            phone_number: this.props.appStatus.phone_number,
            sell_goods: this.props.appStatus.sell_goods,
        });
    }

    resetFields() {
        this.setState({
            password: {
                ...this.state.password,
                isChanged: false,
                value: ''
            },
            confirm_password: {
                ...this.state.confirm_password,
                isChanged: false,
                value: ''
            }
        })
    }

    onChange(e) {
        this.setState({
            [e.target.name]: {
                ...this.state[e.target.name],
                value: e.target.value,
                isChanged: true
            },
            isChanged: true
        }, function() {
            const dataObject = {};
            if (this.state.first_name.isChanged) {
                dataObject.first_name = this.state.first_name.value
            }
            if (this.state.last_name.isChanged) {
                dataObject.last_name = this.state.last_name.value
            }
            if (this.state.email.isChanged) {
                dataObject.email = this.state.email.value
            }
            if (this.state.phone_number.isChanged) {
                dataObject.phone_number = this.state.phone_number.value
            }
            if (this.state.password.isChanged) {
                dataObject.password = this.state.password.value
            }
            if (this.state.confirm_password.isChanged) {
                dataObject.confirm_password = this.state.confirm_password.value
            }


            this.isFormValid(dataObject);
        });


    }


    onChange(e) {
        this.setState({
            [e.target.name]: e.target.value
        });
        if (e.target.name === 'password' && e.target.value === '') {
            this.setState({
                confirm_password: ""
            })
        }
    }

    isFormValid(data = null) {
        let input = (data) ? data : this.state;
        const { errors, isValid } = (! this.props.auth.isAuthenticated) ? validateCreateUser(input) : validateUpdateUser(input);

        if(! isValid) {
            this.setState({ errors });
        } else {
            this.setState({ errors: {}})
        }

        return isValid;
    }

    isEmailValid(email) {
        const { errors, isValid } = validateEmail(email);

        if(! isValid) {
            this.setState({ errors });
        }

        return isValid;
    }

    onSubmit(e) {
        e.preventDefault();
        const appStatus = this.props.appStatus;
        if (this.isFormValid()) {
            this.setState({
                errors: {},
                isLoading: true,
                business_option_id: appStatus.currentBusinessOption.id,
            });
            if (this.props.auth.isAuthenticated) {
                this.props.userUpdateRequest(this.state, '/level/1/section/2/business-option/3').then(
                    (response) => {
                        this.setState({isLoading: false});

                        const token = response.data.token;
                        if (token) {
                            localStorage.setItem("jwtToken", token);
                            setAuthorizationToken(token);
                            this.props.setCurrentUser(jwt_decode(token).user);

                            this.props.addFlashMessage({
                                type: "success",
                                text: "Saved Successfully!"
                            });
                        }
                        const {appStatus, getAppStatus, history, getBusinessOption} = this.props;
                        getAppStatus();
                        getBusinessOption(
                            '/level/1/section/2/business-option/3/next?business_category_id=' + appStatus.business_category_id,
                            true);
                        history.push(getAppUrlFromApiUrl(appStatus.currentBusinessOption.links.next));
                    },
                    ( error ) => {
                        this.setState({errors: error.response.data.errors, isLoading: false});
                        this.props.addFlashMessage({
                            type: "error",
                            text: "Failed!"
                        });
                    }
                );
            } else {
                this.props.userSignUpFormRequest(this.state).then(
                    (response) => {
                        this.setState({isLoading: false});

                        const token = response.data.token;
                        if (token) {
                            localStorage.setItem("jwtToken", token);
                            setAuthorizationToken(token);
                            this.props.setCurrentUser(jwt_decode(token).user);

                            this.props.addFlashMessage({
                                type: "success",
                                text: "You have signed up successfully! Welcome!"
                            });
                        }

                        const {appStatus, getAppStatus,  history, getBusinessOption} = this.props;
                        getAppStatus();
                        // getBusinessOption(
                        //     '/level/1/section/2/business-option/3/next?business_category_id=' + appStatus.business_category_id,
                        //     true);
                        history.push('/');
                    },
                    ( error ) => {
                        this.setState({errors: error.response.data.errors, isLoading: false});
                        this.props.addFlashMessage({
                            type: "error",
                            text: "Failed!"
                        });
                    }
                );
            }
        }
    }

    checkIfUserExists(e) {
        const val = e.target.value;

        if (this.isEmailValid(this.state.email)) {
            this.setState({ errors: {}});

            this.props.doesUserExists(val).then(
                (response) => {
                    if (response.data.user) {
                        this.setState({
                            errors: {
                                ...this.state.errors,
                                "email" : "Email already exist in the database"
                            }
                        });
                    }
                },
                ( error ) => {
                    mbjLog('inside does user exist error', error);
                    this.setState({errors: error.response.data.errors});
                    this.props.addFlashMessage({
                        type: "error",
                        text: "Failed!"
                    });
                }
            );
        }
    }

    onReceiveCaptchaResponse(captchaResponse) {
        this.setState({
           captcha_response: captchaResponse
        });
    }

    render() {
        const { appStatus } = this.props;
        const errors = this.state.errors;

        return (
            <form className="apps-form" onSubmit={this.onSubmit}>
                <TextFieldGroup
                    error={errors.first_name}
                    label="First Name *"
                    placeholder="eg. John"
                    onChange={this.onChange}
                    value={this.state.first_name}
                    type="text"
                    field="first_name"
                />

                <TextFieldGroup
                    error={errors.last_name}
                    label="Last Name *"
                    placeholder="eg. Smith"
                    onChange={this.onChange}
                    value={this.state.last_name}
                    type="text"
                    field="last_name"
                />

                <TextFieldGroup
                    error={errors.email}
                    label="Email *"
                    placeholder="eg. john.smith@gmail.com"
                    onChange={this.onChange}
                    onBlur={this.checkIfUserExists}
                    value={this.state.email}
                    type="text"
                    field="email"
                />

                <TextFieldGroup
                    error={errors.phone_number}
                    label="Phone Number *"
                    placeholder="eg. (02) 9855 0000"
                    onChange={this.onChange}
                    value={this.state.phone_number}
                    type="text"
                    field="phone_number"
                />

                {
                    <div>
                        <TextFieldGroup
                            error={errors.password}
                            label="Password *"
                            placeholder="xxxxxxxxxxxx"
                            onChange={this.onChange}
                            onBlur={() => this.isFormValid({password: this.state.password})}
                            value={this.state.password}
                            type="password"
                            field="password"
                        />

                        <small className="note">Must include lower, upper, number and symbol min 8 characters up to 20.
                        </small>

                        <TextFieldGroup
                            error={errors.confirm_password}
                            label="Confirm Password"
                            placeholder="xxxxxxxxxxxx"
                            onChange={this.onChange}
                            value={this.state.confirm_password}
                            type="password"
                            field="confirm_password"
                        />
                    </div>
                }

                <div className="form-group re-captcha">
                    <ReCAPTCHA
                        sitekey="6LfTLEUUAAAAAH0_f9L8VcdN2c_oJHqEFyAncjMX"
                        onChange={this.onReceiveCaptchaResponse}
                    />
                    { errors.captcha_response && <span className="form-error-message">{errors.captcha_response}</span> }
                </div>
                <div className="btn-wrap">
                    <button disabled={ this.state.isLoading } className="btn btn-default btn-md">Continue</button>
                </div>
            </form>
        );
    }
}

SignUpForm.propTypes = {
    appStatus: PropTypes.object.isRequired,
    auth: PropTypes.object.isRequired,
    userSignUpFormRequest: PropTypes.func.isRequired,
    userUpdateRequest: PropTypes.func.isRequired,
    addFlashMessage: PropTypes.func.isRequired,
    doesUserExists: PropTypes.func.isRequired,
    setCurrentUser: PropTypes.func.isRequired,
    getBusinessOptionFromUrl: PropTypes.func.isRequired,
    getBusinessOption: PropTypes.func.isRequired,
    getAppStatus: PropTypes.func.isRequired
};

export default withRouter(SignUpForm);