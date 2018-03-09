import React, {Component} from "react";
import {map} from "lodash";
import * as classnames from "classnames";
import {generateAppRelativeUrl, getStatus, isSectionLocked} from "../../../../utils/helper/helperFunctions";
import PropTypes from "prop-types";
import {Link, withRouter} from "react-router-dom";

class SectionLinks extends Component {

    render() {
        const {appStatus, level} = this.props;
        const {currentSection, businessStatus} = appStatus;
        const {sectionStatuses, businessOptionStatuses} = businessStatus;

        const sectionsList = map(level.sections, (section, key) => {
            const sectionUrl = generateAppRelativeUrl(level.slug, section.slug);
            const sectionStatus = getStatus(sectionStatuses, section.id);
            const lockedClass = isSectionLocked(businessOptionStatuses, section) ? 'locked' : '';
            return (
                <li key={section.id} className={classnames(lockedClass)}>
                    <Link to={sectionUrl}>
                        <span className={classnames("circle-span", {"complete": sectionStatus.completed_percent === 100}, {"active": currentSection.id === section.id})}></span>
                        {section.name}
                    </Link>
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
};

export default withRouter(SectionLinks);