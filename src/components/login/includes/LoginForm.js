import React, {Component} from "react";
import PropTypes from "prop-types";
import TextFieldGroup from "../../common/TextFieldGroup";
import {validateLogin} from "../../../utils/validation/LoginFormValidation";
import SocialLoginButton from "../../common/SocialLoginButton";
import {Link} from "react-router-dom";
import {getErrorCodeMessage} from "../../../utils/helper/helperFunctions";
import {ROUTES} from "../../../constants/routes";
import axios from "../../../services/request";

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
            isChanged: false
        };

        this.onChange = this.onChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
    }

    onChange(e) {
        this.setState({
            [e.target.name]: {
                ...this.state[e.target.name],
                value: e.target.value,
                isChanged: true
            },
            isChanged: true
        });
    }

    isFormValid() {
        const {errors, isValid} = validateLogin({
            email: this.state.email.value,
            password: this.state.password.value
        });

        if (!isValid) {
            this.setState({errors});
        }

        return isValid;
    }

    onSubmit(e) {
        e.preventDefault();

        if (this.isFormValid()) {
            this.submitForm();
        }
    }

    submitForm() {
        axios.Auth.login({
            email: this.state.email.value,
            password: this.state.password.value
        }).then(
            (response) => {
                const responseData = response.data;
                this.props.handleSuccessResponseData(responseData);
                this.props.redirectTo('/');
            },
            (error) => {
                const errorData = error.response.data;
                this.props.handleErrorResponseData(errorData);
                this.setState({
                    errorCode: errorData.errorCode ? errorData.errorCode : '',
                    errors: errorData.errors ? errorData.errors : {}
                });
            }
        );
    }

    render() {
        const {errors, errorCode} = this.state;
        return (
            <div>
                <form className="apps-form" onSubmit={this.onSubmit}>
                    <h1>Login</h1>

                    {errorCode && <div className="alert alert-danger">{getErrorCodeMessage(errorCode)}</div>}

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
    handleSuccessResponseData: PropTypes.func.isRequired,
    handleErrorResponseData: PropTypes.func.isRequired,
    redirectTo: PropTypes.func.isRequired,
};


export default LoginForm;