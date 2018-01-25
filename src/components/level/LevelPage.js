import React, {Component} from "react";
import LevelIntroPage from "./LevelIntroPage";
import {connect} from "react-redux";
import PropTypes from "prop-types";
import {
    generateLevelCompletedPercent,
    getCurrentLevelByUrl, mbjLog
} from "../navigation/helperFunctions";
import {
    getBusinessOption, setCompletedStatus, setCurrentBusinessOption, setCurrentLevel,
    setCurrentSection, setShowCompletedPage, setToolTipContent
} from "../../actions/appStatusAction";
import LevelCompletePage from "./LevelCompletePage";
import {addFlashMessage} from "../../actions/flashMessageAction";

class LevelPage extends Component {
    componentDidMount() {
        mbjLog('level c d m');
    }

    componentWillReceiveProps(nextProps) {
        mbjLog('level c w r p');
        // if (this.props.history.location.pathname != nextProps.history.location.pathname) {
        //     const currentLevel = getCurrentLevelByUrl(nextProps.appStatus.levels, nextProps.history.location.pathname);
        //     if (currentLevel && currentLevel.id) {
        //         nextProps.setCurrentLevel(currentLevel);
        //     }
        // }
    }

    render() {
        let page;
        const { setCurrentLevel, setCurrentSection, setCurrentBusinessOption,
            setShowCompletedPage, setCompletedStatus,
            setToolTipContent, appStatus, addFlashMessage } = this.props;
        const { levels = [], currentLevel = {} } = this.props.appStatus;
        const nextLevel = (appStatus.levels && appStatus.levels[currentLevel.id]) ? appStatus.levels[currentLevel.id] : currentLevel;
        const completedPercent = generateLevelCompletedPercent(levels, currentLevel);

        page = (<LevelIntroPage
            appStatus={this.props.appStatus}
            addFlashMessage={addFlashMessage}
            level={currentLevel}
            setCurrentLevel={setCurrentLevel}
            setCurrentSection={setCurrentSection}
            setCurrentBusinessOption={setCurrentBusinessOption}
            setToolTipContent={setToolTipContent}
        />);

        if (completedPercent === -1) {
            page = (
                <section className="mid-sec bg-red mCustomScrollbar" data-mcs-theme="dark">
                    <div className="content-wrapper step-one">
                    </div>
                </section>
            );
        }

        if (appStatus.completed_status.level) {
            page = (<LevelCompletePage
                level={currentLevel}
                nextLevel={nextLevel}
                setCurrentLevel={setCurrentLevel}
                setCurrentSection={setCurrentSection}
                setCurrentBusinessOption={setCurrentBusinessOption}
                setShowCompletedPage={setShowCompletedPage}
                setCompletedStatus={setCompletedStatus}
            />)
        }

        return (
            <div>
                { page }
            </div>
        );
    }
}

LevelPage.propTypes = {
    appStatus: PropTypes.object.isRequired,
    getBusinessOption: PropTypes.func.isRequired,
    setCurrentLevel: PropTypes.func.isRequired,
    setCurrentSection: PropTypes.func.isRequired,
    setCurrentBusinessOption: PropTypes.func.isRequired,
    setCompletedStatus: PropTypes.func.isRequired,
    setToolTipContent: PropTypes.func.isRequired,
    getCurrentLevelByUrl: PropTypes.func.isRequired,
    setShowCompletedPage: PropTypes.func.isRequired,
    addFlashMessage: PropTypes.func.isRequired
};

function mapStateToProps(state) {
    return {
        appStatus: state.appStatusReducer
    }
}

export default connect(mapStateToProps, {
    getBusinessOption,
    setCurrentLevel,
    setCurrentSection,
    setCompletedStatus,
    setCurrentBusinessOption,
    getCurrentLevelByUrl,
    addFlashMessage,
    setToolTipContent,
    setShowCompletedPage
} )(LevelPage);