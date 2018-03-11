import React, {Component} from "react";
import {map} from "lodash";
import * as classnames from "classnames";
import {
    generateAppRelativeUrl, getCurrentLevelSections, getStatus,
    isSectionLocked
} from "../../../../utils/helper/helperFunctions";
import PropTypes from "prop-types";

class SectionLinks extends Component {

    render() {
        const {appStatus, level, onClickSectionLink} = this.props;
        const {sections, currentSection, businessStatus} = appStatus;
        const {sectionStatuses, businessOptionStatuses} = businessStatus;
        const currentLevelSections = getCurrentLevelSections(sections, level.id);

        const sectionsList = map(currentLevelSections, (section, key) => {
            const sectionUrl = generateAppRelativeUrl(level.slug, section.slug);
            const sectionStatus = getStatus(sectionStatuses, section.id);
            const isLocked = isSectionLocked(businessOptionStatuses, section);
            const lockedClass = isLocked ? 'locked' : '';
            return (
                <li key={section.id} className={classnames(lockedClass)}>
                    <a href={sectionUrl} onClick={(e) => onClickSectionLink(e, level, section, isLocked)}>
                        <span className={classnames("circle-span", {"complete": sectionStatus.completed_percent === 100}, {"active": currentSection.id === section.id})}></span>
                        {section.name}
                    </a>
                </li>
            )
        });

        return (
            <div>
                {sectionsList}
            </div>
        )
    }
}

SectionLinks.propTypes = {
    appStatus:PropTypes.object.isRequired,
    level: PropTypes.object.isRequired,
    onClickSectionLink: PropTypes.func.isRequired
};

export default SectionLinks;