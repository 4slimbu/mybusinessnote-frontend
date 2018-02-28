import React, {Component} from "react";
import PropTypes from "prop-types";
import TextFieldGroup from "../../common/TextFieldGroup";
import {validateLogin} from "../../../utils/validation/LoginFormValidation";
import SocialLoginButton from "./SocialLoginButton";
import {withRouter} from "react-router-dom";
import {POST_LOGIN_FORM_URL} from "../../../constants/apiUrls";
import {getErrorCodeMessage} from "../../../utils/helper/helperFunctions";

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
        this.onLoginFormSubmit = this.onLoginFormSubmit.bind(this);
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


    onLoginFormSubmit(e) {
        e.preventDefault();
        if (this.isFormValid()) {
            this.submitForm();
        }
    }

    submitForm() {
        this.props.postRequest(POST_LOGIN_FORM_URL, {
            email: this.state.email.value,
            password: this.state.password.value
        }).then(
            (response) => {
                const responseData = response.data;
                this.props.handleSuccessResponse(responseData);
                this.props.history.push('/');
            },
            (error) => {
                const errorData = error.response.data;
                this.props.handleErrorResponse(errorData);
                this.setState({
                    errorCode: errorData.errorCode ? errorData.errorCode : '',
                    errors: errorData.errors ? errorData.errors : {}
                });
            }
        );
    }

    render() {
        const {errors,errorCode} = this.state;
        return (
            <div>
                <form className="apps-form" onSubmit={this.onLoginFormSubmit}>
                    <h1>Login</h1>

                    { errorCode && <div className="alert alert-danger">{getErrorCodeMessage(errorCode)}</div> }

                    <TextFieldGroup fieldObject={this.state.email} onChange={this.onChange} error={errors.email} />
                    <TextFieldGroup fieldObject={this.state.password} onChange={this.onChange} error={errors.password} />

                    <a href="#" onClick={(e) => this.onClickForgotPassword(e)}>Forgot Password ?</a>
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
    postRequest: PropTypes.func.isRequired,
    handleSuccessResponse: PropTypes.func.isRequired,
    handleErrorResponse: PropTypes.func.isRequired,
};

export default withRouter(LoginForm);