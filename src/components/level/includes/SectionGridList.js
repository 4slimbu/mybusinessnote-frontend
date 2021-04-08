import React from "react";
import PropTypes from "prop-types";
import {map} from "lodash";
import {
    getCurrentLevelSections, getStatus, isLevelLocked,
} from "../../../utils/helper/helperFunctions";
import * as classnames from "classnames";
import MiniProgressBar from "../../common/MiniProgressBar";

const sections = (appStatus, currentLevel, onHandleToolTip, goTo) => map(getCurrentLevelSections(appStatus.sections, currentLevel.id), (section, key) => {
    const active = 'active';
    const sectionUrl = '/level/' + currentLevel.slug + '/section/' + section.slug;
    const sectionStatus = getStatus(appStatus.businessStatus.sectionStatuses, section.id);
    const completedPercent = sectionStatus.completed_percent ? sectionStatus.completed_percent : 0;
    const isLocked = isLevelLocked(appStatus, currentLevel);
    const lockedClass = isLocked ? 'locked' : '';

    return (
        <li key={section.id} className={classnames(active, lockedClass)}
            onTouchEnd={(e) => onHandleToolTip(e, section.id, isLocked ? '' : sectionUrl)}
            onClick={(e) => onHandleToolTip(e, section.id, isLocked ? '' : sectionUrl)}
            onMouseOver={(e) => onHandleToolTip(e, section.id, '')}
        >
            <div className="link-box">
                <div className="red-icon" href="#">
                    <img src={section.icon}
                         alt=""/>
                </div>
                <span> {section.name}</span>
            </div>
            <a className="apps-question" href="#"
               onTouchEnd={(e) => onHandleToolTip(e, section.id, '')}
               onMouseOver={(e) => onHandleToolTip(e, section.id, '')}
               onClick={(e) => onHandleToolTip(e, section.id, '')}>
                <i className="fa fa-lightbulb-o" aria-hidden="true"></i>
            </a>
            <div className="li-progress-bar">
                <MiniProgressBar completed_percent={completedPercent}/>
            </div>
        </li>
    )
});

const SectionGridList = (props) => {
    const {appStatus, currentLevel, onHandleToolTip, goTo} = props;

    return (
        <ul className="apps-icons clearfix level2-apps-icons">
            {sections(appStatus, currentLevel, onHandleToolTip, goTo)}
        </ul>
    )
};

SectionGridList.propTypes = {
    appStatus: PropTypes.object.isRequired,
    currentLevel: PropTypes.object.isRequired,
    goTo: PropTypes.func.isRequired,
    onHandleToolTip: PropTypes.func.isRequired,
};

export default SectionGridList;