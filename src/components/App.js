import React, {Component} from "react";
import NavigationBar from "./navigation/NavigationBar";
import Routes from "../Routes";
import FlashMessageList from "./flash/FlashMessageList";
import ToolTip from "./tooltip/ToolTip";
import PropTypes from "prop-types";
import {connect} from "react-redux";
import {
    getAppStatus, getBusinessCategories, setAppStatus, setCurrentBusinessOption, setCurrentLevel,
    setCurrentSection
} from "../actions/appStatusAction";
import {withRouter} from "react-router-dom";
import {
    filterLevelsBySlug, generateAppRelativeUrl, getCurrentLevelByUrl,
    getCurrentSectionByUrl, mbjLog
} from "./navigation/helperFunctions";
import {logout} from "../actions/authActions";

class App extends Component {

    componentDidMount() {
        mbjLog('app: c d m');
        this.props.getBusinessCategories();
        this.props.getAppStatus().then((response) => {
            const appStatus = this.props.appStatus;
            const url = this.props.history.location.pathname;

            // mbjLog('app: get app status response', response);
            // mbjLog('app: calling appStatus inside response', this.props.appStatus);
            // mbjLog('app: appStatus.levels', appStatus.levels);
            // mbjLog('app: url', url);

            const currentLevel = getCurrentLevelByUrl(appStatus.levels, url);

            if (currentLevel) {
                mbjLog('app: currentLevel', currentLevel);
                this.props.setCurrentLevel(currentLevel);

                const currentSection = getCurrentSectionByUrl(currentLevel.sections, url);

                if (currentSection) {
                    this.props.setCurrentSection(currentSection);
                } else {
                    this.props.setCurrentSection({});
                    this.props.setCurrentBusinessOption({});
                }
            }

        });
        mbjLog('app: current url location:', this.props.history.location.pathname);

        // setCurrentLevel(level);
        // setCurrentSection(section);
        // getBusinessOptionFromUrl(generateAppRelativeUrl(level.id, section.id));
    }

    componentWillReceiveProps(nextProps) {
        mbjLog('app: c w r p');

    }

    render() {
        const { auth, logout, appStatus } = this.props;
        const { businessCategories, currentTipCategoryId } = this.props.appStatus;
        return (
            <div id="page" className="hfeed site">
                <div id="content" className="site-content">
                    <div id="primary" className="content-area">
                        <main id="main" className="site-main">
                            <div className="section-wrapper">
                                <NavigationBar/>
                                <FlashMessageList/>
                                <Routes/>
                                <ToolTip
                                    toolTip={appStatus.toolTip}
                                    businessCategories={businessCategories}
                                    currentTipCategoryId={currentTipCategoryId}
                                    auth={auth}
                                    logout={logout}
                                />
                            </div>
                        </main>
                        {/* #main */}
                    </div>
                    {/* #primary */}
                </div>
                {/* #content */}
            </div>
        )
    }
}

App.propTypes = {
    auth: PropTypes.object.isRequired,
    appStatus: PropTypes.object.isRequired,
    getAppStatus: PropTypes.func.isRequired,
    getBusinessCategories: PropTypes.func.isRequired,
    setCurrentLevel: PropTypes.func.isRequired,
    setCurrentSection: PropTypes.func.isRequired,
    setCurrentBusinessOption: PropTypes.func.isRequired,
    logout: PropTypes.func.isRequired
};

function mapStateToProps(state) {
    return {
        auth: state.authReducer,
        appStatus: state.appStatusReducer
    }
}


export default withRouter(connect(mapStateToProps, {
    getAppStatus,
    getBusinessCategories,
    setCurrentLevel,
    setCurrentSection,
    setCurrentBusinessOption,
    logout
})(App));