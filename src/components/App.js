import React, {Component} from "react";
import NavigationBar from "./navigation/NavigationBar";
import Routes from "../Routes";
import FlashMessageList from "./flash/FlashMessageList";
import ToolTip from "./tooltip/ToolTip";
import PropTypes from "prop-types";
import {connect} from "react-redux";
import {getAppStatus, setAppStatus} from "../actions/appStatusAction";
import {withRouter} from "react-router-dom";

class App extends Component {

    componentDidMount() {
        this.props.getAppStatus();
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
    getAppStatus: PropTypes.func.isRequired,
    setAppStatus: PropTypes.func.isRequired,
};

function mapStateToProps(state) {
    return {
        auth: state.authReducer,
    }
}


export default withRouter(connect(mapStateToProps, {getAppStatus, setAppStatus})(App));