import React, {Component} from "react";
import NavigationBar from "./navigation/NavigationBar";
import Routes from "../Routes";
import FlashMessageList from "./flash/FlashMessageList";
import ToolTip from "./tooltip/ToolTip";
import PropTypes from "prop-types";
import {connect} from "react-redux";
import {getAppStatus, getBusinessCategories, setAppStatus, setCurrentLevel} from "../actions/appStatusAction";
import {withRouter} from "react-router-dom";
import {filterLevelsBySlug, getCurrentLevelByUrl} from "./navigation/helperFunctions";

class App extends Component {

    componentDidMount() {
        this.props.getAppStatus();
        this.props.getBusinessCategories();
    }

    componentWillReceiveProps(nextProps) {
        console.log('app: this.props.appStatus', this.props.appStatus);
        console.log('app: nextProps.match.params.level', this.props);

    }

    render() {
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
                                <ToolTip businessCategories={businessCategories} currentTipCategoryId={currentTipCategoryId}/>
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
    setCurrentLevel: PropTypes.func.isRequired
};

function mapStateToProps(state) {
    return {
        auth: state.authReducer,
        appStatus: state.appStatusReducer
    }
}


export default withRouter(connect(mapStateToProps, {getAppStatus, getBusinessCategories, setCurrentLevel})(App));