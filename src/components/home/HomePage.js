import React, {Component} from "react";
import {Link, withRouter} from "react-router-dom";
import {connect} from "react-redux";
import {getAppUrlFromApiUrl} from "../navigation/helperFunctions";

class HomePage extends Component {
    render() {
        const { auth, appStatus } = this.props;

        const lastVisitedPath = appStatus.history && appStatus.history.last_visited ?
            appStatus.history.last_visited : '/level/getting-started';

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
            auth.isAuthenticated ? welcomePage : guestPage
        );
    }
}

function mapStateToProps(state) {
    return {
        auth: state.authReducer,
        appStatus: state.appStatusReducer
    }
}


export default withRouter(connect(mapStateToProps, {})(HomePage));