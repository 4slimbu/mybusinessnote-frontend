import React, {Component} from "react";
import FlashMessageList from "./layout/flash/FlashMessageList";
import PropTypes from "prop-types";
import {connect} from "react-redux";
import {withRouter} from "react-router-dom";
import ErrorBoundary from "./ErrorBoundary";
import LayoutContainer from "./layout/LayoutContainer";
import LeftSideBar from "./layout/left-sidebar/LeftSideBarContainer";
import RightSideBar from "./layout/right-sidebar/RightSideBar";
import MainContentContainer from "./layout/main-content/MainContentContainer";
import RouteSwitch from "../RouteSwitch";
import {makeRequest} from "../actions/requestAction";
import request from "../services/request";
import {setNews} from "../actions/newsAction";
import LoadingMessage from "./layout/loading/LoadingMessage";
import {isItemLoaded, publicUrl} from "../utils/helper/helperFunctions";
import {setToolTipContent} from "../actions/appStatusAction";
import {ROUTES} from "../constants/routes";

class App extends Component {

    componentDidMount() {
        this.bootstrap(this.props);
    }

    componentWillReceiveProps(nextProps) {
        if (this.props.location.pathname !== nextProps.location.pathname) {
            nextProps.setToolTipContent({});
        }
    }

    bootstrap(props) {
        props.makeRequest(request.Level.all);
        props.makeRequest(request.BusinessOption.all);
        props.makeRequest(request.BusinessCategory.all);
        if (props.auth.isAuthenticated) {
            props.makeRequest(request.Business.getStatus);
            props.makeRequest(request.Business.get);
        }
        props.makeRequest(request.News.byTag, 'general').then(responseData => {
            props.setNews({
                tag: 'general',
                news: responseData
            });
        });

    }

    isAppReady() {
        const {levels, sections, businessOptions} = this.props.appStatus;
        return isItemLoaded(levels) && isItemLoaded(sections) && isItemLoaded(businessOptions);
    }

    render() {
        return (
            this.isAppReady() ?
                <ErrorBoundary>
                    <LayoutContainer>
                        <LoadingMessage/>
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
    setToolTipContent,
    setNews,
})(App));