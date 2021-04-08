import React from "react";
import PropTypes from "prop-types";
import LevelHead from "../includes/LevelHead";
import SectionGridList from "../includes/SectionGridList";
import {isItemLoaded} from "../../../utils/helper/helperFunctions";

const LevelIntroPage = (props) => {
    const {appStatus, currentLevel, onClickContinueJourney, goTo, onHandleToolTip} = props;
    const {content} = props.currentLevel;
    const levelHeadProps = {
        currentLevel: currentLevel,
        appStatus: appStatus
    };
    const sectionGridListProps = {
        appStatus: appStatus,
        currentLevel: currentLevel,
        goTo: goTo,
        onHandleToolTip: onHandleToolTip

    };
    return (
        isItemLoaded(currentLevel) &&
        <div>
            <LevelHead {...levelHeadProps}/>
            <div className="content-wrap" dangerouslySetInnerHTML={{__html: content}}/>
            {currentLevel.id === 1 ? '' : <SectionGridList {...sectionGridListProps}/>}
            <div className="btn-wrap">
                <a href="#" onClick={(e) => onClickContinueJourney(e)} className="btn btn-default btn-md">Continue</a>
            </div>
        </div>
    );
};

LevelIntroPage.propTypes = {
    appStatus: PropTypes.object.isRequired,
    currentLevel: PropTypes.object.isRequired,
    onClickContinueJourney: PropTypes.func.isRequired,
    goTo: PropTypes.func.isRequired,
    onHandleToolTip: PropTypes.func.isRequired,
};

export default LevelIntroPage;