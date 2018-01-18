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
import {addFlashMessage} from "../../actions/flashMessageAction";

class NavigationBar extends Component {

    logout(e) {
        e.preventDefault();
        this.props.logout();
        this.props.history.push("/");
    }

    render() {
        const { appStatus, addFlashMessage, setCurrentLevel, setCurrentSection, setCurrentBusinessOption, getBusinessOptionFromUrl, history } = this.props;

        const onClickLevelLink = function(e, url) {
            e.preventDefault();
            setCurrentLevel(appStatus.levels[0]);
            setCurrentSection({});
            setCurrentBusinessOption({});
            history.push(url);
        };

        return (
            <section className="left-sec bg-navy">
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
                            addFlashMessage={addFlashMessage}
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
    getBusinessOptionFromUrl: PropTypes.func.isRequired,
    addFlashMessage: PropTypes.func.isRequired
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
    addFlashMessage,
    setCurrentBusinessOption,
    getBusinessOptionFromUrl
})(NavigationBar));