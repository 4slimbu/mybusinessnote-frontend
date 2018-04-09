import React, {Component} from "react";
import PropTypes from 'prop-types';
import TextFieldGroup from "../../common/TextFieldGroup";
import {withRouter} from "react-router-dom";
import ReCAPTCHA from "react-google-recaptcha";
import {validateFields} from "../../../utils/validation/FieldValidator";
import request from "../../../services/request";
import {ROUTES} from "../../../constants/routes";
import {MESSAGES} from "../../../constants/messages";
import {getAllFields, getChangedFields, getRulesForChangedFields} from "../../../utils/helper/helperFunctions";

class SignUpForm extends Component {
    constructor(props) {
        super(props);

        // All required rules
        this.rules = {
            first_name: 'required',
            last_name: 'required',
            email: 'required|email',
            phone_number: 'required|phone_number',
            password: 'required|min:8|lowercase|uppercase|num|specialChar|max:20',
            confirm_password: 'match:password',
            captcha_response: 'captcha'
        };

        // Initial State
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
            captcha_response: {
                isChanged: false,
                label: "Captcha",
                name: "captcha_response",
                value: "",
            },
            errorCode: '',
            errors: {},
            isChanged: false,
        };

        // Binding Methods
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

            // Set data from store
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
        let currentFieldName, currentFieldValue;

        // Check for captcha response
        if (typeof  e === 'string') {
            currentFieldName = 'captcha_response';
            currentFieldValue = e;
        } else {
            currentFieldName = e.target.name;
            currentFieldValue = e.target.value;
        }

        // If no password then no need for confirm password
        if (currentFieldName === 'password' && currentFieldValue === '') {
            this.setState({
                confirm_password: {
                    ...this.state.confirm_password,
                    value: ''
                }
            })
        }

        // Update the states with new field value
        this.setState({
            [currentFieldName]: {
                ...this.state[currentFieldName],
                value: currentFieldValue,
                isChanged: true
            },
            isChanged: true
        }, function () {
            const changedField = {[currentFieldName]: currentFieldValue};
            const allFields = getAllFields(this.state);
            const rules = getRulesForChangedFields(this.rules, changedField);
            const {errors, isValid} = validateFields(allFields, rules);

            if (! isValid) {
                this.setState({
                    errors: {
                        ...this.state.errors,
                        ...errors
                    }
                });
            } else {
                const errors = {...this.state.errors};
                if (errors[currentFieldName]) {
                    delete errors[currentFieldName];
                }
                this.setState({
                    errors: errors
                });
            }

        });


    }

    /**
     * Validates Form fields
     *
     * @param dataObject - is an object containing field key:value pair
     * @param rules
     * @returns bool
     */
    isFormValid(dataObject, rules) {
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
            return;
        }

        const allFields = getAllFields(this.state);
        const changedFields = getChangedFields(this.state);
        const rulesForChangedFields = getRulesForChangedFields(this.rules, changedFields);

        if (auth.isAuthenticated && this.isFormValid(allFields, rulesForChangedFields)) {
            makeRequest(request.Auth.save, changedFields, {message: MESSAGES.SAVING}).then(
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
        } else if (!auth.isAuthenticated && this.isFormValid(allFields, this.rules)) {
            makeRequest(request.Auth.register, changedFields, {message: MESSAGES.SAVING}).then(
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

    checkIfUserExists(e) {
        const data = {
            email: this.state.email.value,
        };

        const rules = getRulesForChangedFields(this.rules, data);
        const {errors, isValid} = validateFields(data, rules);
        if (isValid) {

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
        const {appStatus, auth} = this.props;
        const errors = this.state.errors;

        return (
            <form className="apps-form" onSubmit={this.onSubmit}>
                <TextFieldGroup fieldObject={this.state.first_name} onChange={this.onChange} error={errors.first_name}/>
                <TextFieldGroup fieldObject={this.state.last_name} onChange={this.onChange} error={errors.last_name}/>
                <TextFieldGroup fieldObject={this.state.email} onChange={this.onChange} onBlur={this.checkIfUserExists}
                                error={errors.email} disabled={auth.isAuthenticated}/>
                <TextFieldGroup fieldObject={this.state.phone_number} onChange={this.onChange}
                                error={errors.phone_number}/>
                {
                    !auth.isAuthenticated &&
                    <div>
                        <TextFieldGroup fieldObject={this.state.password} onChange={this.onChange} error={errors.password}/>
                        <TextFieldGroup fieldObject={this.state.confirm_password} onChange={this.onChange}
                                        error={errors.confirm_password}/>
                        <div className="form-group re-captcha">
                            <ReCAPTCHA
                                sitekey="6LfTLEUUAAAAAH0_f9L8VcdN2c_oJHqEFyAncjMX"
                                onChange={this.onChange}
                            />
                            {errors.captcha_response && <span className="form-error-message">{errors.captcha_response}</span>}
                        </div>
                    </div>
                }

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