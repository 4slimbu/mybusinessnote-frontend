import React, {Component} from "react";
import NavigationBar from "./navigation/NavigationBar";
import Routes from "../Routes";
import FlashMessageList from "./flash/FlashMessageList";
import ToolTip from "./tooltip/ToolTip";
import PropTypes from "prop-types";
import {connect} from "react-redux";
import {getAppStatus, setAppStatus, setCurrentLevel} from "../actions/appStatusAction";
import {withRouter} from "react-router-dom";
import {filterLevelsBySlug} from "./navigation/helperFunctions";

class App extends Component {

    componentDidMount() {
        this.props.getAppStatus();

        if (this.props.appStatus) {
            let currentLevel = filterLevelsBySlug(this.props.appStatus.levels, this.props.match.params.level);
            // this.props.setCurrentLevel(currentLevel);
        }
    }

    render() {
        return (
            <div id="page" className="hfeed site">
                <div id="content" className="site-content">
                    <div id="primary" className="content-area">
                        <main id="main" className="site-main">
                            <div className="section-wrapper">
                                <NavigationBar/>
                                <FlashMessageList/>
                                <Routes/>
                                <ToolTip/>
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
    setAppStatus: PropTypes.func.isRequired,
    setCurrentLevel: PropTypes.func.isRequired
};

function mapStateToProps(state) {
    return {
        auth: state.authReducer,
        appStatus: state.appStatusReducer
    }
}


export default withRouter(connect(mapStateToProps, {getAppStatus, setAppStatus, setCurrentLevel})(App));