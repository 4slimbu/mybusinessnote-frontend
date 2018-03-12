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

class App extends Component {

    componentDidMount() {
        this.bootstrap();
    }

    bootstrap() {
        this.props.makeRequest(request.Level.all);
        if (this.props.auth.isAuthenticated) {
            this.props.makeRequest(request.Business.getStatus);
            this.props.makeRequest(request.Business.get);
        }
        this.props.makeRequest(request.News.byTag, 'general').then(responseData => {
            this.props.setNews({
                tag: 'general',
                news: responseData
            });
        })
    }

    render() {
        return (
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
    setNews,
})(App));