import React, {Component} from "react";
import {map} from "lodash";
import * as classnames from "classnames";
import {generateAppRelativeUrl, isSectionLocked} from "../../../../utils/helper/helperFunctions";
import PropTypes from "prop-types";
import {withRouter} from "react-router-dom";

class SectionLinks extends Component {

    render() {
        const {appStatus, level, setCurrentLevel, setCurrentSection,
            setCompletedStatus,
            history, getBusinessOptionFromUrl, addFlashMessage} = this.props;

        const sectionsList = map(level.sections, (section, key) => {
            const complete = section.completed_percent == 100 ? true : false;
            const sectionUrl = generateAppRelativeUrl(level.slug, section.slug);
            const onClickSectionLink= function(e, sectionUrl) {
                e.preventDefault();
                if (isSectionLocked(appStatus, level, key)) {
                    return;
                }
                setCurrentLevel(level);
                setCurrentSection(section);
                setCompletedStatus({});
                getBusinessOptionFromUrl(generateAppRelativeUrl(level.id, section.id));
                history.push(sectionUrl);
            };
            const lockedClass = isSectionLocked(appStatus, level, key) ? 'locked' : '';
            return (
                <li key={section.id} className={classnames(lockedClass)}><a href={sectionUrl} onClick={(e) => onClickSectionLink(e, sectionUrl)}>
                    <span className={classnames("circle-span", {"complete": complete}, {"active": appStatus.currentSection.id === section.id})}></span>
                    {section.name}</a>
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