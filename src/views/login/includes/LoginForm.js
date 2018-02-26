import React, {Component} from "react";
import PropTypes from "prop-types";
import TextFieldGroup from "../../common/TextFieldGroup";
import {validateLogin} from "../../../utils/validation/LoginFormValidation";
import {withRouter} from "react-router-dom";

class LoginForm extends Component {
    constructor(props) {
        super(props);

        this.state = {
            email: "",
            password: "",
            confirm_password: "",
            forgot_password_token: "",
            errors: {},
            isForgotPassword: false,
            isResetEmailSent: false,
            showUpdatePasswordForm: false,
            showEmailSentResponse: false,
            isLoading: false,
            isSocialLoginProcessing: false,
        };

        this.onChange = this.onChange.bind(this);
        this.onLoginFormSubmit = this.onLoginFormSubmit.bind(this);
        this.onClickForgotPassword = this.onClickForgotPassword.bind(this);
        this.onSendForgotPasswordEmailFormSubmit = this.onSendForgotPasswordEmailFormSubmit.bind(this);
        this.onUpdatePasswordFormSubmit = this.onUpdatePasswordFormSubmit.bind(this);
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

        if (true) {
            this.setState({errors: {}, isLoading: true});

            this.props.userLoginFormRequest({
                email: this.state.email,
                password: this.state.password
            }, this);
        }
    }

    onClickForgotPassword(e) {
        e.preventDefault();
        this.setState({
            isForgotPassword: true
        })
    }

    onClickBackToLogin(e) {
        e.preventDefault();
        this.setState({
            email: '',
            isForgotPassword: false,
            isResetEmailSent: false,
            showUpdatePasswordForm: false,
            showEmailSentResponse: false,
        })
    }

    render() {
        const {errors, email, password} = this.state;

        return (
            <div>
                <form className="apps-form" onSubmit={this.onLoginFormSubmit}>
                    <h1>Login</h1>

                    { errors.form && <div className="alert alert-danger">{errors.form}</div> }

                    <TextFieldGroup
                        error={errors.email}
                        label="Email"
                        onChange={this.onChange}
                        value={email}
                        type="text"
                        field="email"
                    />
                    <TextFieldGroup
                        error={errors.password}
                        label="Password"
                        onChange={this.onChange}
                        value={password}
                        type="password"
                        field="password"
                    />
                    <a href="#" onClick={(e) => this.onClickForgotPassword(e)}>Forgot Password ?</a>
                    <div className="btn-wrap">
                        <button className="btn btn-default btn-md">Login</button>
                    </div>
                </form>
                <p>&nbsp;</p>
                <p className="text-center">OR Login with</p>
                <div className="row">

                    <div className="col-md-6 text-right col-sm-12">
                        <a className="btn btn-primary" href={ process.env.REACT_APP_API_BASE_URL + '/login/oauth/google'} ><i className="fa fa-google"></i> Google</a>
                    </div>
                    <div className="col-md-6 col-sm-12 text-left">
                        <a className="btn btn-primary" href={ process.env.REACT_APP_API_BASE_URL + '/login/oauth/facebook'} ><i className="fa fa-facebook-square"></i> Facebook</a>
                    </div>
                </div>
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
    sendForgotPasswordEmail: PropTypes.func.isRequired
};

export default withRouter(LoginForm);