import React, {Component} from "react";
import {map} from "lodash";
import * as classnames from "classnames";
import {generateAppRelativeUrl} from "./helperFunctions";
import PropTypes from "prop-types";
import {withRouter} from "react-router-dom";

class SectionLinks extends Component {

    render() {
        const {level, setCurrentLevel, setCurrentSection, history, getBusinessOptionFromUrl} = this.props;

        const sectionsList = map(level.sections, (section, key) => {
            const complete = section.completed_percent == 100 ? true : false;
            const sectionUrl = generateAppRelativeUrl(level.slug, section.slug);
            const onClickSectionLink= function(e, sectionUrl) {
                e.preventDefault();
                setCurrentLevel(level);
                setCurrentSection(section);
                getBusinessOptionFromUrl(generateAppRelativeUrl(level.id, section.id));
                history.push(sectionUrl);
            };
            return (
                <li key={section.id}><a href={sectionUrl} onClick={(e) => onClickSectionLink(e, sectionUrl)}>
                    <span className={classnames("circle-span", {"complete": complete})}></span>{section.name}</a>
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
    level: PropTypes.object.isRequired,
    setCurrentLevel: PropTypes.func.isRequired,
    setCurrentSection: PropTypes.func.isRequired,
    getBusinessOptionFromUrl: PropTypes.func.isRequired
};

export default withRouter(SectionLinks);