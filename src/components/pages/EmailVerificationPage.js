import React, {Component} from "react";
import {Link, withRouter} from "react-router-dom";
import {connect} from "react-redux";
import TextFieldGroup from "../common/TextFieldGroup";

class EmailVerificationPage extends Component {
    render() {
        const { auth, appStatus } = this.props;

        const lastVisitedPath = appStatus.history && appStatus.history.last_visited ?
            appStatus.history.last_visited : '/level/getting-started';

        return (
            <section className="mid-sec bg-red mCustomScrollbar" data-mcs-theme="dark">
                <div className="content-wrapper step-one">
                    <div className="col-md-12">
                        <div className="btn-wrap">
                            <h3>Verification Needed</h3>
                            <p>Please click on the verification link sent on your email to verify your account then click on continue. </p>
                            <form className="apps-form" onSubmit={this.onSubmit}>

                                <TextFieldGroup
                                    label="Verification Code"
                                    onChange={this.onChange}
                                    value=''
                                    type="text"
                                    field="email_verification_code"
                                />
                                <div className="btn-wrap">
                                    <button className="btn btn-default btn-md">Verify</button>
                                </div>
                            </form>
                        </div>
                    </div>
                    <div className="col-md-12">
                        <div className="btn-wrap">
                            <p>Didn't receive any verification email. Send me the verification email again!</p>
                            <button onClick={ this.onSendVerificationEmail } className="btn btn-default btn-md">Send Verification Email</button>
                        </div>
                    </div>
                </div>
            </section>
        );
    }
}

function mapStateToProps(state) {
    return {
        auth: state.authReducer,
        appStatus: state.appStatusReducer
    }
}


export default withRouter(connect(mapStateToProps, {})(EmailVerificationPage));