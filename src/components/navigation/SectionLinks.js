import React, {Component} from "react";
import {map} from "lodash";
import * as classnames from "classnames";
import {generateAppRelativeUrl} from "./helperFunctions";
import PropTypes from "prop-types";
import {withRouter} from "react-router-dom";

class SectionLinks extends Component {

    render() {
        const {level, onClickLink} = this.props;

        const sectionsList = map(level.sections, (section, key) => {
            const complete = section.completed_percent == 100 ? true : false;
            const sectionUrl = generateAppRelativeUrl(level.slug, section.slug);
            return (
                <li key={section.id}><a href={sectionUrl} onClick={(e) => onClickLink(e, sectionUrl)}>
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
    onClickLink: PropTypes.func.isRequired
};

export default withRouter(SectionLinks);