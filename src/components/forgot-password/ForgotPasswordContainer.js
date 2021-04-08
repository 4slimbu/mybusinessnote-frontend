import React, {Component} from "react";
import {connect} from "react-redux";
import PropTypes from "prop-types";
import {callApi, makeRequest} from "../../actions/requestAction";
import EmailSentResponsePage from "./pages/EmailSentResponsePage";
import UpdatePasswordPage from "./pages/UpdatePasswordPage";
import ForgotPasswordPage from "./pages/ForgotPasswordPage";
import {getAllUrlParams} from "../../utils/helper/helperFunctions";
import PasswordUpdatedResponsePage from "./pages/PasswordUpdatedResponsePage";

class ForgotPasswordContainer extends Component {

    constructor(props) {
        super(props);
        this.state = {
            isShowForgotPasswordPage: true,
            isShowUpdatePasswordPage: false,
            isShowEmailSentResponsePage: false,
            isShowPasswordUpdatedResponsePage: false,
            forgot_password_token: ''
        };

        this.showForgotPasswordPage = this.showForgotPasswordPage.bind(this);
        this.showUpdatePasswordPage = this.showUpdatePasswordPage.bind(this);
        this.showEmailSentResponsePage = this.showEmailSentResponsePage.bind(this);
        this.showPasswordUpdatedResponsePage = this.showPasswordUpdatedResponsePage.bind(this);
        this.redirectTo = this.redirectTo.bind(this);
    }

    componentDidMount() {
        if (getAllUrlParams(this.props.location.search).forgot_password_token) {
            this.setState({
                forgot_password_token: getAllUrlParams(this.props.location.search).forgot_password_token
            });
            this.showUpdatePasswordPage();
        }
    }

    showForgotPasswordPage() {
        this.setState({
            isShowForgotPasswordPage: true,
            isShowUpdatePasswordPage: false,
            isShowEmailSentResponsePage: false,
            isShowPasswordUpdatedResponsePage: false
        })
    }

    showUpdatePasswordPage() {
        this.setState({
            isShowForgotPasswordPage: false,
            isShowUpdatePasswordPage: true,
            isShowEmailSentResponsePage: false,
            isShowPasswordUpdatedResponsePage: false
        })
    }

    showEmailSentResponsePage() {
        this.setState({
            isShowForgotPasswordPage: false,
            isShowUpdatePasswordPage: false,
            isShowEmailSentResponsePage: true,
            isShowPasswordUpdatedResponsePage: false
        })
    }

    showPasswordUpdatedResponsePage() {
        this.setState({
            isShowForgotPasswordPage: false,
            isShowUpdatePasswordPage: false,
            isShowEmailSentResponsePage: false,
            isShowPasswordUpdatedResponsePage: true
        })
    }

    redirectTo(url) {
        this.props.history.push(url);
    }

    render() {
        const {makeRequest} = this.props;
        const forgotPasswordPageProps = {
            makeRequest: makeRequest,
            showEmailSentResponsePage: this.showEmailSentResponsePage
        };

        const updatePasswordPageProps = {
            makeRequest: makeRequest,
            forgotPasswordToken: this.state.forgot_password_token,
            showPasswordUpdatedResponsePage: this.showPasswordUpdatedResponsePage,
            redirectTo: this.redirectTo
        };

        return (
            <div>
                {
                    this.state.isShowEmailSentResponsePage ? <EmailSentResponsePage/> :
                        this.state.isShowUpdatePasswordPage ? <UpdatePasswordPage {...updatePasswordPageProps}/> :
                            this.state.isShowPasswordUpdatedResponsePage ? <PasswordUpdatedResponsePage/> :
                                <ForgotPasswordPage {...forgotPasswordPageProps}/>
                }
            </div>
        )
    }
}

ForgotPasswordContainer.propTypes = {
    makeRequest: PropTypes.func.isRequired,
};

export default connect(null, {
    makeRequest,
})(ForgotPasswordContainer);