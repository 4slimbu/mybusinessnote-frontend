import React from "react";
import PropTypes from "prop-types";
import LevelHead from "../includes/LevelHead";
import SectionGridList from "../includes/SectionGridList";

const LevelIntroPage = (props) => {
    const {appStatus, level, onClickContinue, onClickSectionLink, onHandleToolTip} = props;
    const {content} = props.level;
    const sectionGridListProps = {
        appStatus: appStatus,
        level: level,
        onClickSectionLink: onClickSectionLink,
        onHandleToolTip: onHandleToolTip

    };
    return (
        <div>
            <LevelHead currentLevel={level}/>
            <div className="content-wrap" dangerouslySetInnerHTML={{__html: content}}/>
            { level.id === 1 ? '' : <SectionGridList {...sectionGridListProps}/> }
            <div className="btn-wrap">
                <a href="#" onClick={(e) => onClickContinue(e)} className="btn btn-default btn-md">Continue</a>
            </div>
        </div>
    );
};

LevelIntroPage.propTypes = {
    appStatus: PropTypes.object.isRequired,
    level: PropTypes.object.isRequired,
    onClickContinue: PropTypes.func.isRequired,
    onClickSectionLink: PropTypes.func.isRequired,
    onHandleToolTip: PropTypes.func.isRequired,
};

export default LevelIntroPage;