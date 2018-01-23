import React, {Component} from "react";
import {Link, withRouter} from "react-router-dom";

class WelcomePage extends Component {
    render() {
        return (
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
                            <Link to="/login" className="btn btn-default btn-md">Continue</Link>
                        </div>
                    </div>
                </div>
            </section>
        );
    }
}

export default withRouter(WelcomePage);