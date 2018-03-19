import React, {Component} from "react";
import PropTypes from 'prop-types';
import TextFieldGroup from "../../common/TextFieldGroup";
import {withRouter} from "react-router-dom";
import ReCAPTCHA from "react-google-recaptcha";
import {validateFields} from "../../../utils/validation/FieldValidator";
import request from "../../../services/request";
import {ROUTES} from "../../../constants/routes";
import {MESSAGES} from "../../../constants/messages";

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
        const {auth} = this.props;
        if (auth.isAuthenticated) {
            const {user} = auth;
            const newState = {
                ...this.state,
                first_name: {
                    ...this.state.first_name,
                    oldValue: user.first_name,
                },
                last_name: {
                    ...this.state.last_name,
                    oldValue: user.last_name,
                },
                email: {
                    ...this.state.email,
                    oldValue: user.email,
                },
                phone_number: {
                    ...this.state.phone_number,
                    oldValue: user.phone_number,
                },
            };
            this.setState(newState);
        }
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
            },
            captcha_response: "",
            errorCode: '',
            errors: {},
            isChanged: false,
        })
    }

    onChange(e) {

        if (e.target.name === 'password' && e.target.value === '') {
            this.setState({
                confirm_password: {
                    ...this.state.confirm_password,
                    value: ''
                }
            })
        }

        this.setState({
            [e.target.name]: {
                ...this.state[e.target.name],
                value: e.target.value,
                isChanged: true
            },
            isChanged: true
        }, function () {
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

    /**
     * Validates Form fields
     *
     * @param dataObject - is an object containing field key:value pair
     * @returns bool
     */
    isFormValid(dataObject) {
        const rules = {
            first_name: 'required',
            last_name: 'required',
            email: 'required|email',
            phone_number: 'required|phone_number',
            password: 'required|min:8|lowercase|uppercase|num|specialChar|max:20',
            confirm_password: 'match:password',
            captcha_response: 'captcha'
        };
        const {errors, isValid} = validateFields(dataObject, rules);

        this.setState({
            errors: isValid ? {} : errors
        });

        return isValid;
    }

    onSubmit(e) {
        e.preventDefault();
        const {appStatus, auth, makeRequest, history} = this.props;

        if (auth.isAuthenticated && !this.state.isChanged) {
            history.push(ROUTES.ADD_BUSINESS_DETAILS);
        }

        const dataObject = {
            first_name: this.state.first_name.value,
            last_name: this.state.last_name.value,
            email: this.state.email.value,
            phone_number: this.state.phone_number.value,
            password: this.state.password.value,
            confirm_password: this.state.confirm_password.value,
            captcha_response: this.state.captcha_response
        };

        if (this.isFormValid(dataObject)) {
            if (auth.isAuthenticated) {
                makeRequest(request.Auth.save, {
                    first_name: this.state.first_name.value,
                    last_name: this.state.last_name.value,
                    email: this.state.email.value,
                    phone_number: this.state.phone_number.value,
                    password: this.state.password.value,
                    confirm_password: this.state.confirm_password.value,
                    captcha_response: this.state.captcha_response
                }).then(
                    (responseData) => {
                        history.push(ROUTES.ADD_BUSINESS_DETAILS);
                    },
                    (errorData) => {
                        this.resetFields();
                        this.setState({
                            errorCode: errorData.errorCode ? errorData.errorCode : '',
                            errors: errorData.errors ? errorData.errors : {}
                        });
                    }
                );
            } else {
                makeRequest(request.Auth.register, {
                    first_name: this.state.first_name.value,
                    last_name: this.state.last_name.value,
                    email: this.state.email.value,
                    phone_number: this.state.phone_number.value,
                    password: this.state.password.value,
                    confirm_password: this.state.confirm_password.value,
                    business_category_id: appStatus.business.business_category_id,
                    sell_goods: appStatus.business.sell_goods,
                    captcha_response: this.state.captcha_response
                }).then(
                    (responseData) => {
                        history.push(ROUTES.ADD_BUSINESS_DETAILS);
                    },
                    (errorData) => {
                        this.resetFields();
                        this.setState({
                            errorCode: errorData.errorCode ? errorData.errorCode : '',
                            errors: errorData.errors ? errorData.errors : {}
                        });
                    }
                );
            }
        }
    }

    checkIfUserExists(e) {
        const data = {
            email: this.state.email.value,
        };

        if (this.isFormValid(data)) {

            this.props.makeRequest(request.Auth.checkIfExists, data, {message: MESSAGES.LOADING_USER_CHECK}).then(
                (responseData) => {
                    if (responseData.isPresent) {
                        this.setState({
                            errors: {
                                ...this.state.errors,
                                "email": MESSAGES.ERR_EMAIL_ALREADY_EXIST
                            }
                        });
                    }
                },
                (error) => {
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
        const {appStatus} = this.props;
        const errors = this.state.errors;

        return (
            <form className="apps-form" onSubmit={this.onSubmit}>
                <TextFieldGroup fieldObject={this.state.first_name} onChange={this.onChange} error={errors.first_name}/>
                <TextFieldGroup fieldObject={this.state.last_name} onChange={this.onChange} error={errors.last_name}/>
                <TextFieldGroup fieldObject={this.state.email} onChange={this.onChange} onBlur={this.checkIfUserExists} error={errors.email}/>
                <TextFieldGroup fieldObject={this.state.phone_number} onChange={this.onChange} error={errors.phone_number}/>
                <TextFieldGroup fieldObject={this.state.password} onChange={this.onChange} error={errors.password}/>
                <TextFieldGroup fieldObject={this.state.confirm_password} onChange={this.onChange} error={errors.confirm_password}/>

                <div className="form-group re-captcha">
                    <ReCAPTCHA
                        sitekey="6LfTLEUUAAAAAH0_f9L8VcdN2c_oJHqEFyAncjMX"
                        onChange={this.onReceiveCaptchaResponse}
                    />
                    {errors.captcha_response && <span className="form-error-message">{errors.captcha_response}</span>}
                </div>
                <div className="btn-wrap">
                    <button className="btn btn-default btn-md">Continue</button>
                </div>
            </form>
        );
    }
}

SignUpForm.propTypes = {
    appStatus: PropTypes.object.isRequired,
    auth: PropTypes.object.isRequired,
    makeRequest: PropTypes.func.isRequired,
};

export default withRouter(SignUpForm);