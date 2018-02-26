import React, {Component} from "react";
import {withRouter} from "react-router-dom";
import {connect} from "react-redux";
import jwt_decode from "jwt-decode";
import {getAllUrlParams} from "../../utils/helper/helperFunctions";
import {sendVerificationEmail, setCurrentUser, verifyEmail} from "../../services/actions/authActions";
import {addFlashMessage} from "../../services/actions/flashMessageAction";
import setAuthorizationToken from "../../utils/axios/setAuthorizationToken";
import {setCurrentLevel} from "../../services/actions/appStatusAction";
import WelcomePage from "./pages/WelcomePage";
import GuestPage from "./pages/GuestPage";
import EmailVerificationPage from "./pages/EmailVerificationPage";

class HomeContainer extends Component {
    constructor(props) {
        super(props);
        this.state = {
            showVerifyLink: false,
            email_verification_token: ''
        };

        this.onClickStart = this.onClickStart.bind(this);
        this.onVerifyAccount = this.onVerifyAccount.bind(this);
        this.onSendVerificationEmail = this.onSendVerificationEmail.bind(this);
    }

    componentDidMount() {
        if (getAllUrlParams(this.props.location.search).email_verification_token) {
            this.setState({
                showVerifyLink : true,
                email_verification_token: getAllUrlParams(this.props.location.search).email_verification_token
            })
        }
        this.props.setCurrentLevel({});
    }

    render() {
        const { auth, appStatus } = this.props;

        const lastVisitedPath = appStatus.history && appStatus.history.last_visited ?
            appStatus.history.last_visited : '/level/getting-started';

        const welcomePageProps = {
            onClickStart: this.onClickStart,
            lastVisitedPath: lastVisitedPath
        };

        const guestPageProps = {
            onClickStart: this.onClickStart
        };

        const emailVerificationPageProps = {
            showVerifyLink: this.state.showVerifyLink,
            onVerifyAccount: this.onVerifyAccount,
            onSendVerificationEmail: this.onSendVerificationEmail,
        };

        return (
            auth.isAuthenticated ?
                (
                    (auth.isVerified) ?
                        <WelcomePage {...welcomePageProps}/>:
                        <EmailVerificationPage {...emailVerificationPageProps}/>
                )
                : <GuestPage {...guestPageProps}/>
        );
    }

    onClickStart(e) {
        e.preventDefault();
        const {appStatus, history, setCurrentLevel} = this.props;
        setCurrentLevel(appStatus.levels[0]);
        history.push('/level/getting-started');
    };

    onVerifyAccount(e) {
        e.preventDefault();

        this.props.verifyEmail({
            email_verification_token: this.state.email_verification_token
        }).then(
            (response) => {
                const token = response.data.token;
                if (token) {
                    localStorage.setItem("jwtToken", token);
                    setAuthorizationToken(token);
                    this.props.setCurrentUser(jwt_decode(token).user);

                    this.props.addFlashMessage({
                        type: "success",
                        text: "Successfully verified! Welcome!"
                    });
                }
                this.props.getAppStatus();
                this.props.history.push('/');
            },
            ( error ) => {
                if (error.response.data.error) {
                    this.props.addFlashMessage({
                        type: "error",
                        text: 'Unable to verify account'
                    });
                }
            }
        );
    }

    onSendVerificationEmail(e) {
        e.preventDefault();
        const {sendVerificationEmail, addFlashMessage} = this.props;
        sendVerificationEmail().then(
            (response) => {
                addFlashMessage({
                    type: "success",
                    text: "Verification Email Sent"
                });
            },
            ( error ) => {
                if (error.response.data.error) {
                    addFlashMessage({
                        type: "error",
                        text: 'Unable to send Verification Email'
                    });
                }
            }
        );
    };
}

function mapStateToProps(state) {
    return {
        auth: state.authReducer,
        appStatus: state.appStatusReducer
    }
}


export default withRouter(connect(mapStateToProps, {setCurrentLevel, setCurrentUser, sendVerificationEmail, addFlashMessage, verifyEmail})(HomeContainer));