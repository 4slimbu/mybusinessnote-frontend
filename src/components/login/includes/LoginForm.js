import React, {Component} from "react";
import PropTypes from "prop-types";
import TextFieldGroup from "../../common/TextFieldGroup";
import SocialLoginButton from "../../common/SocialLoginButton";
import {Link} from "react-router-dom";
import {ROUTES} from "../../../constants/routes";
import request from "../../../services/request";
import {validateFields} from "../../../utils/validation/FieldValidator";
import {MESSAGES} from "../../../constants/messages";

class LoginForm extends Component {
    constructor(props) {
        super(props);

        this.state = {
            email: {
                isChanged: false,
                label: "Email",
                name: "email",
                placeholder: "Your email",
                value: "",
                oldValue: "",
                type: "text"
            },
            password: {
                isChanged: false,
                label: "Password",
                name: "password",
                placeholder: "Enter your password",
                value: "",
                oldValue: "",
                type: "password"
            },
            errorCode: '',
            errors: {},
            isChanged: false,
        };

        this.onChange = this.onChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
    }

    resetFields() {
        this.setState({
            password: {
                ...this.state.password,
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
        }, function () {
            const dataObject = {};
            if (this.state.email.isChanged) {
                dataObject.email = this.state.email.value
            }
            if (this.state.password.isChanged) {
                dataObject.password = this.state.password.value
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
            email: 'required|email',
            password: 'required'
        };
        const {errors, isValid} = validateFields(dataObject, rules);

        this.setState({
            errors: isValid ? {} : errors
        });

        return isValid;
    }

    onSubmit(e) {
        e.preventDefault();

        const dataObject = {
            email: this.state.email.value,
            password: this.state.password.value
        };

        if (this.isFormValid(dataObject)) {
            this.submitForm();
        }
    }

    submitForm() {
        const data = {
            email: this.state.email.value,
            password: this.state.password.value
        };

        this.props.makeRequest(request.Auth.login, data, {message: MESSAGES.LOGGING}).then(
            (responseData) => {
                this.props.makeRequest(request.Business.getStatus);
                this.props.makeRequest(request.BusinessOption.all);
                this.props.makeRequest(request.Business.get);
                this.props.redirectTo(ROUTES.HOME);
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

    render() {
        const {errors} = this.state;
        return (
            <div>
                <form className="apps-form" onSubmit={this.onSubmit}>
                    <h1>Login</h1>

                    <TextFieldGroup fieldObject={this.state.email} onChange={this.onChange} error={errors.email}/>
                    <TextFieldGroup fieldObject={this.state.password} onChange={this.onChange} error={errors.password}/>

                    <Link to={ROUTES.FORGOT_PASSWORD}>Forgot Password ?</Link>
                    <div className="btn-wrap">
                        <button className="btn btn-default btn-md">Login</button>
                    </div>
                </form>
                <p>&nbsp;</p>
                <SocialLoginButton/>
            </div>
        )
    }
}

LoginForm.propTypes = {
    makeRequest: PropTypes.func.isRequired,
    redirectTo: PropTypes.func.isRequired,
};


export default LoginForm;