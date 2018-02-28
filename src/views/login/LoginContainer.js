import React, {Component} from "react";
import {connect} from "react-redux";
import PropTypes from "prop-types";
import ForgotPasswordPage from "./pages/ForgotPasswordPage";
import SocialLoginProcessingPage from "./pages/SocialLoginProcessingPage";
import {doesUserExists} from "../../services/actions/signUpActions";
import {addFlashMessage} from "../../services/actions/flashMessageAction";
import LoginPage from "./pages/LoginPage";
import {handleErrorResponse, handleSuccessResponse, postRequest} from "../../services/actions/requestAction";

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
        const {postRequest, handleSuccessResponse, handleErrorResponse, doesUserExists, addFlashMessage} = this.props;
        const loginPageProps = {
            postRequest: postRequest,
            handleSuccessResponse: handleSuccessResponse,
            handleErrorResponse: handleErrorResponse,
            doesUserExists: doesUserExists,
            addFlashMessage: addFlashMessage
        };

        return (
            <div>
                {
                    this.state.isShowSocialLoginProcessingPage ? <SocialLoginProcessingPage/> :
                        (this.state.isForgotPassword ? <ForgotPasswordPage/> : <LoginPage {...loginPageProps}/>)
                }
            </div>
        )
    }
}

LoginContainer.propTypes = {
    postRequest: PropTypes.func.isRequired,
    handleSuccessResponse: PropTypes.func.isRequired,
    handleErrorResponse: PropTypes.func.isRequired,
    addFlashMessage: PropTypes.func.isRequired,
};

export default connect(null, {
    postRequest,
    handleSuccessResponse,
    handleErrorResponse,
    doesUserExists,
    addFlashMessage
})(LoginContainer);