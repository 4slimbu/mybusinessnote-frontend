import React, {Component} from "react";
import NavigationBar from "./navigation/NavigationBar";
import Routes from "../Routes";
import FlashMessageList from "./flash/FlashMessageList";
import ToolTip from "./tooltip/ToolTip";
import PropTypes from "prop-types";
import {connect} from "react-redux";
import {getLevels, setLevels} from "../actions/levelActions";

class App extends Component {

    componentDidMount() {
        this.props.getLevels().then(
            (response) => {
                this.props.setLevels(response.data);
            }
        );
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
};

function mapStateToProps(state) {
    return {
        auth: state.authReducer,
        levels: state.levelReducer
    }
}

App.propTypes = {
    getLevels: PropTypes.func.isRequired,
    setLevels: PropTypes.func.isRequired,
};

export default connect(mapStateToProps, {getLevels, setLevels})(App);