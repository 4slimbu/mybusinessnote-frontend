import React, {Component} from "react";
import {connect} from "react-redux";
import PropTypes from "prop-types";
import {doesUserExists} from "../../actions/signUpActions";
import {addFlashMessage} from "../../actions/flashMessageAction";
import {handleErrorResponseData, handleSuccessResponseData, callApi} from "../../actions/requestAction";
import EmailSentResponsePage from "./pages/EmailSentResponsePage";
import UpdatePasswordPage from "./pages/UpdatePasswordPage";
import ForgotPasswordPage from "./pages/ForgotPasswordPage";

class ForgotPasswordContainer extends Component {

    constructor(props) {
        super(props);
        this.state = {
            isShowForgotPasswordPage: true,
            isShowUpdatePasswordPage: false,
            isShowEmailSentResponsePage: false,
        };

        this.onShowForgotPasswordPage = this.onShowForgotPasswordPage.bind(this);
        this.onShowUpdatePasswordPage = this.onShowUpdatePasswordPage.bind(this);
        this.onShowEmailSentResponsePage = this.onShowEmailSentResponsePage.bind(this);
        this.redirectTo = this.redirectTo.bind(this);
    }

    onShowForgotPasswordPage(e) {
        e.preventDefault();
        this.setState({
            isShowForgotPasswordPage: true,
            isShowUpdatePasswordPage: false,
            isShowEmailSentResponsePage: false,
        })
    }

    onShowUpdatePasswordPage(e) {
        e.preventDefault();
        this.setState({
            isShowForgotPasswordPage: false,
            isShowUpdatePasswordPage: true,
            isShowEmailSentResponsePage: false,
        })
    }

    onShowEmailSentResponsePage(e) {
        e.preventDefault();
        this.setState({
            isShowForgotPasswordPage: false,
            isShowUpdatePasswordPage: false,
            isShowEmailSentResponsePage: true,
        })
    }

    redirectTo(url) {
        this.props.history.push(url);
    }

    render() {
        const {handleSuccessResponseData, handleErrorResponseData} = this.props;
        const forgotPasswordPageProps = {
            handleSuccessResponseData: handleSuccessResponseData,
            handleErrorResponseData: handleErrorResponseData,
            redirectTo: this.redirectTo
        };

        const emailSentResponsePageProps = {};
        const updatePasswordPageProps = {};

        return (
            <div>
                {
                    this.state.isShowEmailSentResponsePage ? <EmailSentResponsePage {...emailSentResponsePageProps}/> :
                        (this.state.isShowUpdatePasswordPage ? <UpdatePasswordPage {...updatePasswordPageProps}/> :
                            <ForgotPasswordPage {...forgotPasswordPageProps}/>)
                }
            </div>
        )
    }
}

ForgotPasswordContainer.propTypes = {
    handleSuccessResponseData: PropTypes.func.isRequired,
    handleErrorResponseData: PropTypes.func.isRequired,
    addFlashMessage: PropTypes.func.isRequired,
};

export default connect(null, {
    handleSuccessResponseData,
    handleErrorResponseData,
    doesUserExists,
    addFlashMessage
})(ForgotPasswordContainer);