import React, {Component} from "react";
import FlashMessageList from "./layout/flash/FlashMessageList";
import PropTypes from "prop-types";
import {connect} from "react-redux";
import {
    getAppStatus, getBusinessCategories,
    setCurrentBusinessOption, setCurrentLevel,
    setCurrentSection
} from "../actions/appStatusAction";
import {withRouter} from "react-router-dom";
import {
    getCurrentLevelByUrl,
    getCurrentSectionByUrl, publicUrl
} from "../utils/helper/helperFunctions";
import ErrorBoundary from "./ErrorBoundary";
import LayoutContainer from "./layout/LayoutContainer";
import LeftSideBar from "./layout/left-sidebar/LeftSideBarContainer";
import RightSideBar from "./layout/right-sidebar/RightSideBar";
import MainContentContainer from "./layout/main-content/MainContentContainer";
import Loading from "./common/Loading";
import RouteSwitch from "../RouteSwitch";
import {makeRequest} from "../actions/requestAction";
import request from "../services/request";

class App extends Component {

    componentDidMount() {
        this.props.makeRequest(request.Level.all);
        this.props.makeRequest(request.Business.getStatus);
        this.props.makeRequest(request.News.byTag, {tag: 'general'});
        //if auth make

        this.props.getAppStatus().then((response) => {
            const appStatus = this.props.appStatus;
            const url = this.props.history.location.pathname;
            const currentLevel = getCurrentLevelByUrl(appStatus.levels, url);

            if (currentLevel) {
                this.props.setCurrentLevel(currentLevel);

                const currentSection = getCurrentSectionByUrl(currentLevel.sections, url);

                if (currentSection) {
                    this.props.setCurrentSection(currentSection);
                } else {
                    this.props.setCurrentSection({});
                    this.props.setCurrentBusinessOption({});
                }
            } else {
                this.props.setCurrentLevel({});
            }

        });
    }

    render() {
        const {auth, appStatus} = this.props;
        return (
            appStatus.levels && (appStatus.businessStatus) ?
                <ErrorBoundary>
                    <LayoutContainer>
                        {(auth.isFetching || appStatus.isFetching) && <Loading/>}
                        <FlashMessageList/>
                        <LeftSideBar/>

                        <MainContentContainer>
                            <RouteSwitch/>
                        </MainContentContainer>

                        <RightSideBar/>
                    </LayoutContainer>
                </ErrorBoundary>
                :
                <div className="app-loading">
                    <img className="logo" src={publicUrl("/assets/images/app_logo_256.png")} alt=""/>
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
};

function mapStateToProps(state) {
    return {
        auth: state.authReducer,
        appStatus: state.appStatusReducer
    }
}

export default withRouter(connect(mapStateToProps, {
    makeRequest,
    getAppStatus,
    getBusinessCategories,
    setCurrentLevel,
    setCurrentSection,
    setCurrentBusinessOption
})(App));