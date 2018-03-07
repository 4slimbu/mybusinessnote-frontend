import React, {Component} from "react";
import {map} from "lodash";
import * as classnames from "classnames";
import {findStatus, generateAppRelativeUrl, isSectionLocked} from "../../../../utils/helper/helperFunctions";
import PropTypes from "prop-types";
import {Link, withRouter} from "react-router-dom";

class SectionLinks extends Component {

    render() {
        const {
            level, sectionStatuses, businessOptionStatuses, currentSectionId
        } = this.props;

        const sectionsList = map(level.sections, (section, key) => {
            const sectionUrl = generateAppRelativeUrl(level.slug, section.slug);
            const sectionStatus = findStatus(sectionStatuses, section.id);
            const lockedClass = isSectionLocked(businessOptionStatuses, section) ? 'locked' : '';
            return (
                <li key={section.id} className={classnames(lockedClass)}>
                    <Link to={sectionUrl}>
                        <span className={classnames("circle-span", {"complete": sectionStatus.completed_percent === 100}, {"active": currentSectionId === section.id})}></span>
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
    setCurrentLevel: PropTypes.func.isRequired,
    setCurrentSection: PropTypes.func.isRequired,
    setCompletedStatus: PropTypes.func.isRequired,
    getBusinessOptionFromUrl: PropTypes.func.isRequired,
    addFlashMessage: PropTypes.func.isRequired
};

export default withRouter(SectionLinks);