import React, {Component} from "react";
import LoginForm from "./LoginForm";
import {
    loginSocialUser, sendForgotPasswordEmail, setCurrentUser, updateUserPassword,
    userLoginFormRequest
} from "../../actions/authActions";
import {connect} from "react-redux";
import PropTypes from "prop-types";
import {addFlashMessage} from "../../actions/flashMessageAction";
import {getAppStatus, getBusinessOptionFromUrl} from "../../actions/appStatusAction";

class LoginPage extends Component {
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
            <section className="mid-sec bg-red mCustomScrollbar" data-mcs-theme="dark">
                <div className="content-wrapper step-one">
                    <LoginForm
                        addFlashMessage={addFlashMessage}
                        userLoginFormRequest={userLoginFormRequest}
                        getAppStatus={getAppStatus}
                        setCurrentUser={setCurrentUser}
                        getBusinessOptionFromUrl={getBusinessOptionFromUrl}
                        loginSocialUser={loginSocialUser}
                        sendForgotPasswordEmail={sendForgotPasswordEmail}
                        updateUserPassword={updateUserPassword}
                    />
                </div>
            </section>
        )
    }
}

LoginPage.propTypes = {
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
})(LoginPage);