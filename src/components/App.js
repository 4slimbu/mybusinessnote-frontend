import React, { Component } from "react";
import FlashMessageList from "./layout/flash/FlashMessageList";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import ErrorBoundary from "./ErrorBoundary";
import LayoutContainer from "./layout/LayoutContainer";
import LeftSideBar from "./layout/left-sidebar/LeftSideBarContainer";
import RightSideBar from "./layout/right-sidebar/RightSideBar";
import MainContentContainer from "./layout/main-content/MainContentContainer";
import RouteSwitch from "../RouteSwitch";
import { makeRequest } from "../actions/requestAction";
import request from "../services/request";
import { setNews } from "../actions/newsAction";
import LoadingMessage from "./layout/loading/LoadingMessage";
import {
  generateAppRelativeUrl,
  getByEventType,
  isItemLoaded,
  publicUrl,
} from "../utils/helper/helperFunctions";
import { setEvents, setToolTipContent } from "../actions/appStatusAction";
import PopUp from "./common/PopUp";
import * as _ from "lodash";
import MetaInformation from "./common/MetaInformation";

class App extends Component {
  componentDidMount() {
    this.bootstrap(this.props);
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.location.pathname !== nextProps.location.pathname) {
      this.handleEvents(nextProps);
      this.reset(nextProps);
    }
  }

  bootstrap(props) {
    props.makeRequest(request.Level.all);
    props.makeRequest(request.BusinessOption.all);
    props.makeRequest(request.BusinessCategory.all);
    props.makeRequest(request.AppSettings.all);
    if (props.auth.isAuthenticated) {
      props.makeRequest(request.Business.getStatus);
      props.makeRequest(request.Business.get);
    }
    // props.makeRequest(request.News.byTag, 'general').then(responseData => {
    //     props.setNews({
    //         tag: 'general',
    //         news: responseData
    //     });
    // });
  }

  handleEvents(props) {
    // Handle events
    const { events, currentLevel, currentSection } = props.appStatus;
    if (
      isItemLoaded(events) &&
      isItemLoaded(currentLevel) &&
      isItemLoaded(currentSection)
    ) {
      if (isItemLoaded(getByEventType(events, "levelCompleted"))) {
        props.history.push(
          generateAppRelativeUrl(currentLevel.slug) + "/completed"
        );
        return;
      }
      if (isItemLoaded(getByEventType(events, "sectionCompleted"))) {
        if (currentSection.show_landing_page) {
          props.history.push(
            generateAppRelativeUrl(currentLevel.slug, currentSection.slug) +
              "/completed"
          );
        }
      }
    }
  }

  reset(props) {
    props.setToolTipContent({});
  }

  isAppReady() {
    const { levels, sections, businessOptions } = this.props.appStatus;
    return (
      isItemLoaded(levels) &&
      isItemLoaded(sections) &&
      isItemLoaded(businessOptions)
    );
  }

  render() {
    const { auth, appStatus } = this.props;
    const appSettings = appStatus.appSettings;
    let popUpSetting = _.find(appSettings, function (o) {
      return o.key == "popup";
    });

    return this.isAppReady() ? (
      <ErrorBoundary>
        <LayoutContainer>
          <MetaInformation appStatus={appStatus} />
          {!auth.isAuthenticated && popUpSetting && (
            <PopUp popUpSetting={popUpSetting} />
          )}
          <LoadingMessage />
          <FlashMessageList />
          <LeftSideBar />

          <MainContentContainer>
            <RouteSwitch />
          </MainContentContainer>

          <RightSideBar />
        </LayoutContainer>
      </ErrorBoundary>
    ) : (
      <div className="app-loading">
        <img
          className="logo"
          src={publicUrl("/assets/images/logo-white.png")}
          alt=""
        />
      </div>
    );
  }
}

App.propTypes = {
  auth: PropTypes.object.isRequired,
  appStatus: PropTypes.object.isRequired,
  news: PropTypes.object.isRequired,
  setNews: PropTypes.func.isRequired,
  setEvents: PropTypes.func.isRequired,
};

function mapStateToProps(state) {
  return {
    auth: state.authReducer,
    appStatus: state.appStatusReducer,
    news: state.newsReducer,
  };
}

export default withRouter(
  connect(mapStateToProps, {
    makeRequest,
    setToolTipContent,
    setNews,
    setEvents,
  })(App)
);

