import React, {Component} from "react";
import {map} from "lodash";
import * as classnames from "classnames";
import {Link, withRouter} from "react-router-dom";
import PropTypes from "prop-types";
import {findStatus, generateAppRelativeUrl} from "../../../../utils/helper/helperFunctions";
import {Panel, PanelGroup} from "react-bootstrap";
import SectionLinks from "./SectionLinks";

class LevelLinks extends Component {

    render() {
        const { appStatus, onClickLevelLink, onClickSectionLink } = this.props;

        const {levels, currentLevelId, businessStatus} = appStatus;

        const {levelStatuses, sectionStatuses, businessOptionStatuses} = businessStatus;

        //generate level list from levels
        const levelsList = map(levels, (level, key) => {
            //generate level Image from level id
            const levelStatus = findStatus(levelStatuses, level.id);
            const levelImg = (levelStatus.completed_percent >= 100) ? level.badge_icon : level.icon;
            const levelUrl = generateAppRelativeUrl(level.slug);

            const sectionLinksProps = {
                level: level,
                onClickSectionLink: onClickSectionLink,
                sectionStatuses: sectionStatuses,
                businessOptionStatuses: businessOptionStatuses,
                currentSectionId: appStatus.currentSectionId
            };
            return (
                <Panel key={level.slug} eventKey={level.id} className={classnames("panel-faq", {"active": currentLevelId === level.id})}>
                    <Panel.Heading>
                        <Panel.Title toggle>
                            <a onClick={(e) => onClickLevelLink(e, level )} href={levelUrl}
                            >
                                <figure className={classnames({"goldbadge-img" : (levelStatus.completed_percent >= 100)})}><img src={levelImg} alt="" /></figure>
                                <h6>{ level.name }</h6>
                            </a>
                        </Panel.Title>
                    </Panel.Heading>
                    <Panel.Body collapsible>
                        <ul className="getting-start-list">
                            <SectionLinks {...sectionLinksProps}/>
                        </ul>
                    </Panel.Body>
                </Panel>
            )
        });

        const handleSelect = (newKey) => {
            //do nothing
        };

        return (
            (levels.length > 1) ?
            <PanelGroup accordion id={`accordion-uncontrolled-level-links`} activeKey={currentLevelId} onSelect={(newKey)=>handleSelect(newKey)}>
                {levelsList}
            </PanelGroup> :
                <div></div>
        );
    }
}

LevelLinks.propTypes = {
    appStatus: PropTypes.object.isRequired,
    setCurrent: PropTypes.func.isRequired,
    setCompletedStatus: PropTypes.func.isRequired,
    getBusinessOptionFromUrl: PropTypes.func.isRequired,
    addFlashMessage: PropTypes.func.isRequired,
    onClickLevelLink: PropTypes.func.isRequired,
    onClickSectionLink: PropTypes.func.isRequired,
};

export default withRouter(LevelLinks);