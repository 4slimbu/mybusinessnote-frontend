import React, {Component} from "react";
import FlashMessageList from "./layout/flash/FlashMessageList";
import PropTypes from "prop-types";
import {connect} from "react-redux";
import {
    setCurrentBusinessOption, setCurrentLevel,
    setCurrentSection
} from "../actions/appStatusAction";
import {withRouter} from "react-router-dom";
import {
    publicUrl
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
import {setNews} from "../actions/newsAction";

class App extends Component {

    componentDidMount() {
        this.props.makeRequest(request.Level.all);
        if (this.props.auth.isAuthenticated) {
            this.props.makeRequest(request.Business.getStatus);
            this.props.makeRequest(request.Business.get);
        }
        this.props.makeRequest(request.News.byTag, 'general');
        this.props.makeRequest(request.News.byTag, 'general').then(responseData => {
            this.props.setNews({
                tag: 'general',
                news: responseData
            });
        });
    }

    render() {
        const {auth, appStatus, news} = this.props;
        return (
            appStatus.levels.length > 0 && Object.keys(news).length > 0?
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
    news: PropTypes.object.isRequired,
    setNews: PropTypes.func.isRequired,
    setCurrentLevel: PropTypes.func.isRequired,
    setCurrentSection: PropTypes.func.isRequired,
    setCurrentBusinessOption: PropTypes.func.isRequired,
};

function mapStateToProps(state) {
    return {
        auth: state.authReducer,
        appStatus: state.appStatusReducer,
        news: state.newsReducer,
    }
}

export default withRouter(connect(mapStateToProps, {
    makeRequest,
    setNews,
    setCurrentLevel,
    setCurrentSection,
    setCurrentBusinessOption
})(App));