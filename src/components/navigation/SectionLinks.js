import React, {Component} from "react";
import {map} from "lodash";
import * as classnames from "classnames";
import {generateAppRelativeUrl} from "./helperFunctions";
import PropTypes from "prop-types";
import {withRouter} from "react-router-dom";

class SectionLinks extends Component {

    render() {
        const {appStatus, level, setCurrentLevel, setCurrentSection, history, getBusinessOptionFromUrl, addFlashMessage} = this.props;

        const sectionsList = map(level.sections, (section, key) => {
            const complete = section.completed_percent == 100 ? true : false;
            const sectionUrl = generateAppRelativeUrl(level.slug, section.slug);
            const onClickSectionLink= function(e, sectionUrl) {
                e.preventDefault();
                if ((key - 1) >= 0) {
                    if (level.sections[key - 1].completed_percent < '100') {
                        addFlashMessage({
                            type: "error",
                            text: "Section Locked!"
                        });
                        return;
                    }
                } else {
                    if (level.id == 2) {
                        if (appStatus.levels[0].completed_percent < '100') {
                            addFlashMessage({
                                type: "error",
                                text: "Section Locked!"
                            });
                            return;
                        }
                    }
                    if (level.id == 3) {
                        if (appStatus.levels[1].completed_percent < '100') {
                            addFlashMessage({
                                type: "error",
                                text: "Section Locked!"
                            });
                            return;
                        }
                    }
                }
                setCurrentLevel(level);
                setCurrentSection(section);
                getBusinessOptionFromUrl(generateAppRelativeUrl(level.id, section.id));
                history.push(sectionUrl);
            };
            return (
                <li key={section.id}><a href={sectionUrl} onClick={(e) => onClickSectionLink(e, sectionUrl)}>
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
    getBusinessOptionFromUrl: PropTypes.func.isRequired,
    addFlashMessage: PropTypes.func.isRequired
};

export default withRouter(SectionLinks);