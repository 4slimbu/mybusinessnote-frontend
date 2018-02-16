import React, {Component} from "react";
import {map} from "lodash";
import * as classnames from "classnames";
import {generateAppRelativeUrl} from "./helperFunctions";
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
                if ((key - 1) >= 0) {
                    if (level.id === 3) {
                        //check if higher section isn't touched
                        for(let i = key; i < level.sections.length; i++) {
                            if(level.sections[i].completed_percent > 0) continue;
                            if (level.sections[key - 1].completed_percent < '100') {
                                addFlashMessage({
                                    type: "error",
                                    text: "Section Locked!"
                                });
                                return;
                            }
                        }
                    } else {
                        //check if higher level isn't touched
                        if (appStatus.levels[level.id].completed_percent === 0) {
                            //check if higher section isn't touched
                            for(let i = key; i < level.sections.length; i++) {
                                if(level.sections[i].completed_percent > 0) continue;
                                if (level.sections[key - 1].completed_percent < '100') {
                                    addFlashMessage({
                                        type: "error",
                                        text: "Section Locked!"
                                    });
                                    return;
                                }
                            }

                        }
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
                setCompletedStatus({});
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
    setCompletedStatus: PropTypes.func.isRequired,
    getBusinessOptionFromUrl: PropTypes.func.isRequired,
    addFlashMessage: PropTypes.func.isRequired
};

export default withRouter(SectionLinks);