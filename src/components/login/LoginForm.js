import React, {Component} from "react";
import PropTypes from "prop-types";
import jwt_decode from "jwt-decode";
import TextFieldGroup from "../common/TextFieldGroup";
import {validateLogin} from "../../utils/validation/LoginFormValidation";
import {withRouter} from "react-router-dom";
import setAuthorizationToken from "../../utils/setAuthorizationToken";
import {mbjLog} from "../navigation/helperFunctions";
import {validateEmail, validateUpdatePassword, validateUpdateUser} from "../../utils/validation/UserValidation";

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
            isLoading: false
        };

        this.onChange = this.onChange.bind(this);
        this.onLoginFormSubmit = this.onLoginFormSubmit.bind(this);
        this.onClickForgotPassword = this.onClickForgotPassword.bind(this);
        this.onSendForgotPasswordEmailFormSubmit = this.onSendForgotPasswordEmailFormSubmit.bind(this);
        this.onUpdatePasswordFormSubmit = this.onUpdatePasswordFormSubmit.bind(this);
    }

    componentDidMount() {
        mbjLog('login form: cdm: this.props', this.props, 'debug');
        if (this.props.match.params.driver) {
            mbjLog('login form: cdm: driver', this.props.match.params.driver);
            this.props.loginSocialUser(
                this.props.location.pathname + this.props.location.search
            ).then(
                (response) => {
                    this.setState({isLoading: false});

                    const token = response.data.token;
                    if (token) {
                        localStorage.setItem("jwtToken", token);
                        setAuthorizationToken(token);
                        this.props.setCurrentUser(jwt_decode(token).user);

                        this.props.addFlashMessage({
                            type: "success",
                            text: "Logged in successfully! Welcome!"
                        });
                    }

                    if (response.data.success === false) {
                        if (response.data.error_code === 'user_already_exist') {
                            this.props.addFlashMessage({
                                type: "error",
                                text: "User with provider email already exist"
                            });
                        }
                    }

                    this.props.getAppStatus();
                    this.props.history.push('/');
                },
                ( error ) => {
                    this.setState({errors: error.response.data.error, isLoading: false});
                }
            );
        }
    }

    isFormValid(data = null) {
        let input = (data) ? data : this.state;
        const {errors, isValid} = validateLogin(input);

        if (!isValid) {
            this.setState({errors});
        }

        return isValid;
    }

    isSendForgotPasswordEmailFormValid() {
        const {errors, isValid} = validateEmail(this.state.email);

        if (!isValid) {
            this.setState({errors});
        }

        return isValid;
    }

    isUpdatePasswordFormValid() {
        const {errors, isValid} = validateUpdatePassword(this.state);

        if (!isValid) {
            this.setState({errors});
        }

        return isValid;
    }

    onChange(e) {
        this.setState({
            [e.target.name]: e.target.value
        });
    }

    onSendForgotPasswordEmailFormSubmit(e) {
        e.preventDefault();
        if (this.isSendForgotPasswordEmailFormValid()) {
            this.props.sendForgotPasswordEmail({
                email: this.state.email
            }).then(
                (response) => {
                    this.setState({showUpdatePasswordForm: true});

                    this.props.addFlashMessage({
                        type: "success",
                        text: "Password reset email sent"
                    });
                },
                ( error ) => {
                    if (error.response.data.error) {
                        this.props.addFlashMessage({
                            type: "error",
                            text: 'Unable to send password reset email'
                        });
                    }
                }
            );
        }
    }

    onUpdatePasswordFormSubmit(e) {
        e.preventDefault();

        if (this.isUpdatePasswordFormValid()) {
            this.props.updateUserPassword({
                forgot_password_token: this.state.forgot_password_token,
                password: this.state.password,
                confirm_password: this.state.confirm_password,
            }).then(
                (response) => {
                    const token = response.data.token;
                    if (token) {
                        localStorage.setItem("jwtToken", token);
                        setAuthorizationToken(token);
                        this.props.setCurrentUser(jwt_decode(token).user);

                        this.props.addFlashMessage({
                            type: "success",
                            text: "Password updated successfully"
                        });
                    }
                    this.props.getAppStatus();
                    this.props.history.push('/');
                },
                ( error ) => {
                    if (error.response.data.error) {
                        this.props.addFlashMessage({
                            type: "error",
                            text: 'Unable to reset user password'
                        });
                    }
                }
            );
        }
    }

    onLoginFormSubmit(e) {
        e.preventDefault();

        if (this.isFormValid()) {
            this.setState({errors: {}, isLoading: true});

            this.props.userLoginFormRequest({
                siwps: this.state.email,
                sdlkw: this.state.password
            }).then(
                (response) => {
                    this.setState({isLoading: false});

                    const token = response.data.token;
                    if (token) {
                        localStorage.setItem("jwtToken", token);
                        setAuthorizationToken(token);
                        this.props.setCurrentUser(jwt_decode(token).user);

                        this.props.addFlashMessage({
                            type: "success",
                            text: "Logged in successfully! Welcome!"
                        });
                    }
                    this.props.getAppStatus();
                    this.props.history.push('/');
                },
                ( error ) => {
                    mbjLog(error);
                    if (error.response.data.error.form) {
                        this.props.addFlashMessage({
                            type: "error",
                            text: error.response.data.error.form
                        });
                    }
                    this.setState({errors: error.response.data.error, isLoading: false});
                }
            );
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
            isForgotPassword: false
        })
    }

    render() {
        const {errors, email, password, confirm_password, forgot_password_token} = this.state;

        const updatePasswordForm = (
            <form className="apps-form" onSubmit={this.onUpdatePasswordFormSubmit}>
                <h1>Reset Password</h1>

                { errors.form && <div className="alert alert-danger">{errors.form}</div> }

                <TextFieldGroup
                    error={errors.forgot_password_token}
                    label="Reset Code"
                    onChange={this.onChange}
                    value={forgot_password_token}
                    type="text"
                    field="forgot_password_token"
                />

                <TextFieldGroup
                    error={errors.password}
                    label="Password"
                    onChange={this.onChange}
                    value={password}
                    type="password"
                    field="password"
                />

                <TextFieldGroup
                    error={errors.confirm_password}
                    label="Confirm Password"
                    onChange={this.onChange}
                    value={confirm_password}
                    type="password"
                    field="confirm_password"
                />
                <div className="btn-wrap">
                    <button className="btn btn-default btn-md">Update Password</button>
                    <a onClick={(e) => this.onClickBackToLogin(e)} className="btn btn-default btn-md">Back</a>
                </div>
            </form>
        );

        const forgotPasswordForm = (
                this.state.showUpdatePasswordForm ?
                    updatePasswordForm :
                    <form className="apps-form" onSubmit={this.onSendForgotPasswordEmailFormSubmit}>
                        <h1>Reset Password</h1>

                        { errors.form && <div className="alert alert-danger">{errors.form}</div> }

                        <TextFieldGroup
                            error={errors.email}
                            label="Email"
                            onChange={this.onChange}
                            value={email}
                            type="text"
                            field="email"
                        />
                        <div className="btn-wrap">
                            <button className="btn btn-default btn-md">Send Reset Password Email</button>
                            <a onClick={(e) => this.onClickBackToLogin(e)} className="btn btn-default btn-md">Back</a>
                        </div>
                    </form>

        );

        const loginForm = (
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
                <div className="btn-wrap">
                    <button className="btn btn-default btn-md">Login</button>
                    <a onClick={(e) => this.onClickForgotPassword(e)} className="btn btn-default btn-md">Forgot Password</a>
                </div>
            </form>
        );
        return (
            <div>

                {
                    this.state.isForgotPassword ? forgotPasswordForm : loginForm
                }

                <p>&nbsp;</p>
                <p className="text-center">OR Login with</p>
                <div className="row">

                    <div className="col-md-6 text-right col-sm-12">
                        <a className="btn btn-primary" href={ process.env.REACT_APP_API_BASE_URL + '/login/oauth/google'} ><i className="fa fa-google"></i> Google</a>
                    </div>
                    <div class="col-md-6 col-sm-12 text-left">
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