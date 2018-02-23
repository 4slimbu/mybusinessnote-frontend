import React, {Component} from "react";
import {Link, withRouter} from "react-router-dom";
import {connect} from "react-redux";
import jwt_decode from "jwt-decode";
import {getAllUrlParams, getAppUrlFromApiUrl} from "../../utils/helper/helperFunctions";
import {sendVerificationEmail, setCurrentUser, verifyEmail} from "../../services/actions/authActions";
import {addFlashMessage} from "../../services/actions/flashMessageAction";
import setAuthorizationToken from "../../utils/axios/setAuthorizationToken";
import {setCurrentLevel} from "../../services/actions/appStatusAction";

class HomePage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            showVerifyLink: false,
            email_verification_token: ''
        };

        this.onVerifyAccount = this.onVerifyAccount.bind(this);
    }

    componentDidMount() {
        if (getAllUrlParams(this.props.location.search).email_verification_token) {
            this.setState({
                showVerifyLink : true,
                email_verification_token: getAllUrlParams(this.props.location.search).email_verification_token
            })
        }
    }

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

    onClickStart(e) {
        e.preventDefault();
        const {appStatus, history, setCurrentLevel} = this.props;
        setCurrentLevel(appStatus.levels[0]);
        history.push('/level/getting-started');
    };

    render() {
        const { auth, appStatus, sendVerificationEmail, addFlashMessage } = this.props;

        const lastVisitedPath = appStatus.history && appStatus.history.last_visited ?
            appStatus.history.last_visited : '/level/getting-started';

        const onSendVerificationEmail = function(e) {
            e.preventDefault();
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

        const welcomePage = (
            <section className="mid-sec bg-red mCustomScrollbar" data-mcs-theme="dark">
                <div className="content-wrapper step-one">
                    <div className="col-md-12">
                        <div className="btn-wrap">
                            <p>Take me to the start. </p>
                            <Link to="/level/getting-started" onClick={(e) => this.onClickStart(e)} className="btn btn-default btn-md">Start</Link>
                        </div>
                    </div>
                    <div className="col-md-12">
                        <div className="btn-wrap">
                            <p>Continue from where I left</p>
                            <Link to={getAppUrlFromApiUrl(lastVisitedPath)} className="btn btn-default btn-md">Continue</Link>
                        </div>
                    </div>
                </div>
            </section>
        );

        const emailVerificationPage = (
            <section className="mid-sec bg-red mCustomScrollbar" data-mcs-theme="dark">
                <div className="content-wrapper step-one">
                    <div className="col-md-12">
                        <div className="btn-wrap">
                            {
                                this.state.showVerifyLink ?
                                    <div className="btn-wrap">
                                        <p>Click on verify to verify your account.</p>
                                        <button onClick={(e) => this.onVerifyAccount(e)} className="btn btn-default btn-md">Verify</button>
                                    </div>
                                    :
                                    <div>
                                        <h3>Verification Needed</h3>
                                        <p>Please follow the link on your welcome email to verify your account. </p>
                                    </div>

                            }
                        </div>
                    </div>
                    <div className="col-md-12">
                        <div className="btn-wrap">
                            <p>Send me the verification email again!</p>
                            <button onClick={(e) => onSendVerificationEmail(e)} className="btn btn-default btn-md">Send Verification Email Again!</button>
                        </div>
                    </div>
                </div>
            </section>
        );

        const guestPage = (
            <section className="mid-sec bg-red mCustomScrollbar" data-mcs-theme="dark">
                <div className="content-wrapper step-one">
                    <div className="col-md-12">
                        <div className="btn-wrap">
                            <p>Want to start a fresh new business journey?</p>
                            <Link className="btn btn-default btn-md" to="/level/getting-started" onClick={(e) => this.onClickStart(e)}>Click Here.</Link>
                        </div>
                    </div>
                    <div className="col-md-12">
                        <div className="btn-wrap">
                            <p>Already Registered? Continue your Business Journey.</p>
                            <Link to="/login" className="btn btn-default btn-md">Login</Link>
                        </div>
                    </div>
                    <div className="col-md-12">
                        <div className="btn-wrap">
                            <p>Want to buy a business or franchise?</p>
                            <a href="http://www.franchisebusiness.com.au/" target="_blank" className="btn btn-default btn-md">Click Here</a>
                        </div>
                    </div>
                </div>
            </section>
        );
        return (
            auth.isAuthenticated ? ((auth.isVerified) ? welcomePage: emailVerificationPage) : guestPage
        );
    }
}

function mapStateToProps(state) {
    return {
        auth: state.authReducer,
        appStatus: state.appStatusReducer
    }
}


export default withRouter(connect(mapStateToProps, {setCurrentLevel, setCurrentUser, sendVerificationEmail, addFlashMessage, verifyEmail})(HomePage));