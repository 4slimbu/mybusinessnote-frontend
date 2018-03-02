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
    getCurrentSectionByUrl
} from "../utils/helper/helperFunctions";
import ErrorBoundary from "./ErrorBoundary";
import LayoutContainer from "./layout/LayoutContainer";
import LeftSideBar from "./layout/left-sidebar/LeftSideBar";
import RightSideBar from "./layout/right-sidebar/RightSideBar";
import MainContentContainer from "./layout/main-content/MainContentContainer";
import Loading from "./common/Loading";
import RouteSwitch from "../RouteSwitch";

class App extends Component {

    componentDidMount() {
        //do app bootstrapping stuff here
        //call appBootstrap() action which will set:
        //user if exist
        //business if exist
        //levels and sections

        this.props.getBusinessCategories();
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
        const { auth, appStatus } = this.props;
        return (
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
    getAppStatus,
    getBusinessCategories,
    setCurrentLevel,
    setCurrentSection,
    setCurrentBusinessOption
})(App));