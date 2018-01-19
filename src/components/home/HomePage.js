import React, {Component} from "react";
import PropTypes from "prop-types";
import {Link, withRouter} from "react-router-dom";

class HomePage extends Component {
    render() {
        return (
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
    }
}

export default withRouter(HomePage);