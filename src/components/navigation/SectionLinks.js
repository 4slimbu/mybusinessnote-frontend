import React, {Component} from "react";
import {map} from "lodash";
import {Link, NavLink, withRouter} from "react-router-dom";
import * as classnames from "classnames";
import {generateAppRelativeUrl} from "./helperFunctions";

class SectionLinks extends Component {
    render() {
        const { level } = this.props;

        const sectionsList = map(level.sections, (section, key) => {
            const complete = section.completed_percent == 100 ? true : false;
            return (
                <li key={section.id}><Link to={generateAppRelativeUrl(level.slug, section.slug)}>
                    <span className={classnames("circle-span", { "complete" : complete })} ></span>{ section.name }</Link>
                </li>
            )
        });

        return (
            <div>
                { sectionsList }
            </div>
        )
    }
}

export default SectionLinks;