import React from "react";
import PropTypes from "prop-types";
import {map} from "lodash";
import {
    getCurrentLevelSections,
    isSectionLocked
} from "../../../utils/helper/helperFunctions";
import * as classnames from "classnames";
import {Link} from "react-router-dom";

const sections = (appStatus, currentLevel, onClickSectionLink, onHandleToolTip) => map(getCurrentLevelSections(appStatus.sections, currentLevel.id), (section, key) => {
    const active = 'active';
    const sectionUrl = '/level/' + currentLevel.slug + '/section/' + section.slug;

    const isLocked = isSectionLocked(appStatus.businessStatus.businessOptionStatuses, section);
    const lockedClass = isLocked ? 'locked' : '';

    return (
        <li key={section.id} className={classnames(active, lockedClass)}>
            <Link className="link-box" to={sectionUrl} onClick={(e) => onClickSectionLink(e, currentLevel, section, isLocked)}>
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
    level: PropTypes.object.isRequired
};

export default SectionGridList;