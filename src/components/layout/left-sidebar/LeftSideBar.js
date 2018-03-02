import React, {Component} from "react";
import {withRouter} from "react-router-dom";
import {connect} from "react-redux";
import {Brand} from "./brand/Brand";
import LevelLinks from "./navigation/LevelLinks";
import MobileNavLinks from "./navigation/MobileNavLinks";
import {logout} from "../../../actions/authActions";
import {
    getBusinessOptionFromUrl,
    setCompletedStatus, setCurrentBusinessOption, setCurrentLevel,
    setCurrentSection
} from "../../../actions/appStatusAction";
import {addFlashMessage} from "../../../actions/flashMessageAction";
import PropTypes from "prop-types";

class LeftSideBarContainer extends Component {
    logout(e) {
        e.preventDefault();
        this.props.logout();
        this.props.history.push("/");
    }

    render() {
        const {
            appStatus, addFlashMessage, setCurrentLevel,
            setCurrentSection, setCurrentBusinessOption,
            setCompletedStatus, getBusinessOptionFromUrl
        } = this.props;

        const completed_percent = appStatus.currentLevel.completed_percent ? appStatus.currentLevel.completed_percent : 0;

        return (
            <div>
                <section className="hidden-xs left-sec bg-navy">
                    <Brand/>
                    <div className="menu-accordion">
                        <div className="panel-group" id="accordion2" role="tablist" aria-multiselectable="true">
                            <LevelLinks
                                appStatus={appStatus}
                                setCurrentLevel={setCurrentLevel}
                                setCurrentSection={setCurrentSection}
                                setCurrentBusinessOption={setCurrentBusinessOption}
                                setCompletedStatus={setCompletedStatus}
                                getBusinessOptionFromUrl={getBusinessOptionFromUrl}
                                addFlashMessage={addFlashMessage}
                            />
                        </div>
                    </div>
                </section>
                <section className="hidden-sm hidden-md hidden-lg content-block">
                    <MobileNavLinks
                        appStatus={appStatus}
                        setCurrentLevel={setCurrentLevel}
                        setCurrentSection={setCurrentSection}
                        setCurrentBusinessOption={setCurrentBusinessOption}
                        setCompletedStatus={setCompletedStatus}
                        getBusinessOptionFromUrl={getBusinessOptionFromUrl}
                        addFlashMessage={addFlashMessage}
                    />

                    <div className="progress">
                        <div className="progress-bar" role="progressbar" aria-valuenow="60" aria-valuemin="0"
                             aria-valuemax="100" style={{width: completed_percent + "%"}}>
                        </div>
                    </div>
                </section>
            </div>
        )
    }
}

LeftSideBarContainer.propTypes = {
    auth: PropTypes.object.isRequired,
    logout: PropTypes.func.isRequired,
    appStatus: PropTypes.object.isRequired,
    setCurrentLevel: PropTypes.func.isRequired,
    setCurrentSection: PropTypes.func.isRequired,
    setCurrentBusinessOption: PropTypes.func.isRequired,
    setCompletedStatus: PropTypes.func.isRequired,
    getBusinessOptionFromUrl: PropTypes.func.isRequired,
    addFlashMessage: PropTypes.func.isRequired
};

function mapStateToProps(state) {
    return {
        auth: state.authReducer,
        appStatus: state.appStatusReducer
    }
}


export default withRouter(connect(mapStateToProps, {
    logout,
    setCurrentLevel,
    setCurrentSection,
    setCompletedStatus,
    addFlashMessage,
    setCurrentBusinessOption,
    getBusinessOptionFromUrl
})(LeftSideBarContainer));