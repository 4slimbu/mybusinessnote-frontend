import React, {Component} from "react";
import {Link} from "react-router-dom";
import {connect} from "react-redux";
import PropTypes from "prop-types";
import {logout} from "../../actions/authActions";
import LevelLinks from "./LevelLinks";
import {setCurrentLevel} from "../../actions/appStatusAction";

class NavigationBar extends Component {

    logout(e) {
        e.preventDefault();
        this.props.logout();
    }

    render() {
        const { appStatus, setCurrentLevel } = this.props;
        const { isAuthenticated } = this.props.auth;

        const userLinks = (
            <ul>
                <li>
                    <a href="#" onClick={this.logout.bind(this)}>Logout</a>
                </li>
            </ul>
        );

        const guestLinks = (
            <ul>
                <li>
                    <Link to="/login">Login</Link>
                </li>
            </ul>
        );

        return (
            <section className="left-sec bg-navy">
                <Link to="/" className="site-branding"><img src={`${process.env.PUBLIC_URL}/assets/images/apps-logo.png`} alt="" /></Link>
                <h3 className="tagline-head">Let your <br/>journey begins</h3>
                <div>
                    { isAuthenticated ? userLinks : guestLinks }
                </div>
                <div className="menu-accordion">
                    <div className="panel-group" id="accordion2" role="tablist" aria-multiselectable="true">
                        <LevelLinks appStatus={appStatus} setCurrentLevel={setCurrentLevel}/>
                    </div>
                </div>
            </section>
        )
    }
}

NavigationBar.propTypes = {
    auth: PropTypes.object.isRequired,
    logout: PropTypes.func.isRequired,
    appStatus: PropTypes.object.isRequired,
    setCurrentLevel: PropTypes.func.isRequired
};

function mapStateToProps(state) {
    return {
        auth: state.authReducer,
        appStatus: state.appStatusReducer
    }
}

export default connect(mapStateToProps, { logout, setCurrentLevel })(NavigationBar);