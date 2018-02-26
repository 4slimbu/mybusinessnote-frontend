import React, {Component} from "react";
import {
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
import UpdatePasswordPage from "./pages/UpdatePasswordPage";

class LoginContainer extends Component {

    constructor(props) {
        super(props);
        this.state = {
            isShowLoginForm: true,
            isShowForgotPasswordForm: false,
            isShowUpdatePasswordForm: false,
            isShowSocialLoginProcessingPage: false,
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

        return (
            <div>
                {
                    this.state.isShowSocialLoginProcessingPage ? <SocialLoginProcessingPage/> :
                        (this.state.isForgotPassword ? <ForgotPasswordPage/> : <LoginPage/>)
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
    sendForgotPasswordEmail: PropTypes.func.isRequired
};

export default connect(null, {
    addFlashMessage,
    userLoginFormRequest,
    getAppStatus,
    setCurrentUser,
    getBusinessOptionFromUrl,
    loginSocialUser,
    sendForgotPasswordEmail,
    updateUserPassword
})(LoginContainer);