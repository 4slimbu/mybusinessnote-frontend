import React from "react";
import PropTypes from "prop-types";
import {map} from "lodash";
import {getCurrentLevelSections, getStatus, isSectionLocked} from "../../../utils/helper/helperFunctions";
import * as classnames from "classnames";
import {Link} from "react-router-dom";
import MiniProgressBar from "../../common/MiniProgressBar";

const sections = (appStatus, currentLevel, onClickSectionLink, onHandleToolTip) => map(getCurrentLevelSections(appStatus.sections, currentLevel.id), (section, key) => {
    const active = 'active';
    const sectionUrl = '/level/' + currentLevel.slug + '/section/' + section.slug;
    const sectionStatus = getStatus(appStatus.businessStatus.sectionStatuses, section.id);
    const completedPercent = sectionStatus.completed_percent ? sectionStatus.completed_percent : 0;
    const isLocked = isSectionLocked(appStatus.businessStatus.businessOptionStatuses, section);
    const lockedClass = isLocked ? 'locked' : '';

    return (
        <li key={section.id} className={classnames(active, lockedClass)}
            onTouchEnd={(e) => onHandleToolTip(e, section.id)}
            onClick={(e) => onHandleToolTip(e, section.id)}
            onMouseEnter={(e) => onHandleToolTip(e, section.id)}
        >
            <Link className="link-box" to={sectionUrl}
                  onClick={(e) => onClickSectionLink(e, currentLevel, section, isLocked)}>
                <div className="red-icon" href="#">
                    <img src={section.icon}
                         alt=""/>
                </div>
                <span> {section.name}</span>
            </Link>
            <a className="apps-question" href="#"
               onTouchEnd={(e) => onHandleToolTip(e, section.id)}
               onMouseEnter={(e) => onHandleToolTip(e, section.id)}
               onClick={(e) => onHandleToolTip(e, section.id)}>
                <i className="fa fa-lightbulb-o" aria-hidden="true"></i>
            </a>
            <div className="li-progress-bar">
                <MiniProgressBar completed_percent={completedPercent}/>
            </div>
        </li>
    )
});

const SectionGridList = (props) => {
    const {appStatus, currentLevel, onClickSectionLink, onHandleToolTip} = props;

    return (
        <ul className="apps-icons clearfix level2-apps-icons">
            {sections(appStatus, currentLevel, onClickSectionLink, onHandleToolTip)}
        </ul>
    )
};

SectionGridList.propTypes = {
    appStatus: PropTypes.object.isRequired,
    currentLevel: PropTypes.object.isRequired,
    onClickSectionLink: PropTypes.func.isRequired,
    onHandleToolTip: PropTypes.func.isRequired,
};

export default SectionGridList;