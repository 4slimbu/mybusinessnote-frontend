import React, {Component} from "react";
import PropTypes from "prop-types";
import TextFieldGroup from "../../common/TextFieldGroup";
import {validateLogin} from "../../../utils/validation/LoginFormValidation";
import {withRouter} from "react-router-dom";
import SocialLoginButton from "./SocialLoginButton";

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

    isFormValid(data = null) {
        let input = (data) ? data : this.state;
        const {errors, isValid} = validateLogin(input);

        if (!isValid) {
            this.setState({errors});
        }

        return isValid;
    }


    onLoginFormSubmit(e) {
        e.preventDefault();

        this.setState({errors: {}, isLoading: true});

        this.props.userLoginFormRequest({
            email: this.state.email.value,
            password: this.state.password.value
        }).then(
            (response) => {
                this.props.handleSuccessResponse(response.data);
                this.props.history.push('/');
            },
            (error) => {
                this.props.handleErrorResponse(error.response.data);
                this.setState({errors: error.response.data.errors});
            }
        );
    }

    render() {
        const {errors, email, password} = this.state;

        return (
            <div>
                <form className="apps-form" onSubmit={this.onLoginFormSubmit}>
                    <h1>Login</h1>

                    { errors.form && <div className="alert alert-danger">{errors.form}</div> }

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
    userLoginFormRequest: PropTypes.func.isRequired,
    addFlashMessage: PropTypes.func.isRequired,
    getAppStatus: PropTypes.func.isRequired,
    setCurrentUser: PropTypes.func.isRequired,
    getBusinessOptionFromUrl: PropTypes.func.isRequired,
    loginSocialUser: PropTypes.func.isRequired,
    updateUserPassword: PropTypes.func.isRequired,
    sendForgotPasswordEmail: PropTypes.func.isRequired,
    handleSuccessResponse: PropTypes.func.isRequired,
    handleErrorResponse: PropTypes.func.isRequired,
};

export default withRouter(LoginForm);