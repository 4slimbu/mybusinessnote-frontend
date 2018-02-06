import React, {Component} from "react";
import {Link, withRouter} from "react-router-dom";
import {connect} from "react-redux";
import {getAppUrlFromApiUrl} from "../navigation/helperFunctions";
import EmailVerificationForm from "./EmailVerificationForm";
import {sendVerificationEmail} from "../../actions/authActions";
import {addFlashMessage} from "../../actions/flashMessageAction";

class HomePage extends Component {
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
                            <Link to="/level/getting-started" className="btn btn-default btn-md">Start</Link>
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
                            <h3>Verification Needed</h3>
                            <p>Please follow the link on your welcome email to verify your account. </p>
                        </div>
                    </div>
                    <div className="col-md-12">
                        <div className="btn-wrap">
                            <p>Didn't receive any verification email. Send me the verification email again!</p>
                            <button onClick={(e) => onSendVerificationEmail(e)} className="btn btn-default btn-md">Send Verification Email</button>
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
                            <p>Want to start a fresh new business journey. Click here. </p>
                            <Link to="/level/getting-started" className="btn btn-default btn-md">Start</Link>
                        </div>
                    </div>
                    <div className="col-md-12">
                        <div className="btn-wrap">
                            <p>Already Registered? Continue your Business Journey.</p>
                            <Link to="/login" className="btn btn-default btn-md">Login</Link>
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


export default withRouter(connect(mapStateToProps, {sendVerificationEmail, addFlashMessage})(HomePage));