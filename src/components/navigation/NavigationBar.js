import React, {Component} from "react";
import {Link, withRouter} from "react-router-dom";
import {connect} from "react-redux";
import PropTypes from "prop-types";
import {logout} from "../../actions/authActions";
import LevelLinks from "./LevelLinks";
import {
    getBusinessOptionFromUrl, setCurrentBusinessOption, setCurrentLevel,
    setCurrentSection
} from "../../actions/appStatusAction";
import {getCurrentLevelByUrl} from "./helperFunctions";

class NavigationBar extends Component {

    logout(e) {
        e.preventDefault();
        this.props.logout();
        this.props.history.push("/");
    }

    render() {
        const { appStatus, setCurrentLevel, setCurrentSection, setCurrentBusinessOption, getBusinessOptionFromUrl, history } = this.props;
        const { isAuthenticated } = this.props.auth;

        const userLinks = (
            <ul>
                <li>
                    <strong>Hi! { appStatus.first_name + ' ' + appStatus.last_name }   </strong>
                    <button onClick={this.logout.bind(this)}>Logout</button>
                </li>
            </ul>
        );

        const guestLinks = (
            <ul>
                <li>
                    <Link to="/login"><button>Login</button></Link>
                </li>
            </ul>
        );

        const onClickLevelLink = function(e, url) {
            e.preventDefault();
            setCurrentLevel(appStatus.levels[0]);
            setCurrentSection({});
            setCurrentBusinessOption({});
            history.push(url);
        };

        return (
            <section className="left-sec bg-navy">
                <div>
                    { isAuthenticated ? userLinks : guestLinks }
                </div>
                <Link to="/"
                      onClick={(e) => onClickLevelLink(e, '/' )}
                      className="site-branding">
                    <img src={`${process.env.PUBLIC_URL}/assets/images/apps-logo.png`} alt="" />
                </Link>
                <h3 className="tagline-head">Let your <br/>journey begins</h3>
                <div className="menu-accordion">
                    <div className="panel-group" id="accordion2" role="tablist" aria-multiselectable="true">
                        <LevelLinks
                            appStatus={appStatus}
                            setCurrentLevel={setCurrentLevel}
                            setCurrentSection={setCurrentSection}
                            setCurrentBusinessOption={setCurrentBusinessOption}
                            getBusinessOptionFromUrl={getBusinessOptionFromUrl}
                        />
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
    setCurrentLevel: PropTypes.func.isRequired,
    setCurrentSection: PropTypes.func.isRequired,
    setCurrentBusinessOption: PropTypes.func.isRequired,
    getBusinessOptionFromUrl: PropTypes.func.isRequired
};

function mapStateToProps(state) {
    return {
        auth: state.authReducer,
        appStatus: state.appStatusReducer
    }
}

export default withRouter(connect(mapStateToProps, {
    logout,
    setCurrentLevel,
    setCurrentSection,
    setCurrentBusinessOption,
    getBusinessOptionFromUrl
})(NavigationBar));