import React, {Component} from "react";
import {
    handleErrorResponse,
    handleSuccessResponse,
    loginSocialUser, sendForgotPasswordEmail, setCurrentUser, updateUserPassword,
    userLoginFormRequest
} from "../../services/actions/authActions";
import {connect} from "react-redux";
import PropTypes from "prop-types";
import {addFlashMessage} from "../../services/actions/flashMessageAction";
import {getAppStatus, getBusinessOptionFromUrl} from "../../services/actions/appStatusAction";
import LoginPage from "./pages/LoginPage";
import ForgotPasswordPage from "./pages/ForgotPasswordPage";
import SocialLoginProcessingPage from "./pages/SocialLoginProcessingPage";
import {getAllUrlParams} from "../../utils/helper/helperFunctions";
import setAuthorizationToken from "../../utils/axios/setAuthorizationToken";
import jwt_decode from "jwt-decode";

class LoginContainer extends Component {

    constructor(props) {
        super(props);
        this.state = {
            isShowForgotPasswordForm: false,
            isShowUpdatePasswordForm: false,
            isShowSocialLoginProcessingPage: false,
        }
    }

    componentDidMount() {
        if (getAllUrlParams(this.props.location.search).forgot_password_token) {
            this.setState({
                isShowForgotPasswordForm: true,
                forgot_password_token: getAllUrlParams(this.props.location.search).forgot_password_token
            })
        }

        if (this.props.match.params.driver) {
            this.setState({
                isShowSocialLoginProcessingPage: true
            });
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
                (error) => {
                    this.setState({errors: error.response.data.error, isLoading: false});
                }
            );
        }
    }

    render() {
        const {
            addFlashMessage,
            userLoginFormRequest,
            getAppStatus,
            setCurrentUser,
            getBusinessOptionFromUrl,
            loginSocialUser,
            sendForgotPasswordEmail,
            updateUserPassword
        } = this.props;

        const loginFormProps = {
            userLoginFormRequest: userLoginFormRequest,
            handleSuccessResponse: handleSuccessResponse,
            handleErrorResponse: handleErrorResponse
        };

        return (
            <div>
                {
                    this.state.isShowSocialLoginProcessingPage ? <SocialLoginProcessingPage/> :
                        (this.state.isForgotPassword ? <ForgotPasswordPage/> : <LoginPage {...loginFormProps}/>)
                }
            </div>
        )
    }
}

LoginContainer.propTypes = {
    userLoginFormRequest: PropTypes.func.isRequired,
    addFlashMessage: PropTypes.func.isRequired,
    getAppStatus: PropTypes.func.isRequired,
    getBusinessOptionFromUrl: PropTypes.func.isRequired,
    setCurrentUser: PropTypes.func.isRequired,
    loginSocialUser: PropTypes.func.isRequired,
    updateUserPassword: PropTypes.func.isRequired,
    sendForgotPasswordEmail: PropTypes.func.isRequired,
    handleSuccessResponse: PropTypes.func.isRequired,
    handleErrorResponse: PropTypes.func.isRequired,
};

export default connect(null, {
    addFlashMessage,
    userLoginFormRequest,
    getAppStatus,
    setCurrentUser,
    getBusinessOptionFromUrl,
    loginSocialUser,
    sendForgotPasswordEmail,
    updateUserPassword,
    handleSuccessResponse,
    handleErrorResponse
})(LoginContainer);