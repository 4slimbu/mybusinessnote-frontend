import React, {Component} from "react";
import {map} from "lodash";
import * as classnames from "classnames";
import {withRouter} from "react-router-dom";
import PropTypes from "prop-types";
import {findStatus, generateAppRelativeUrl, getStatus, isItemLoaded} from "../../../../utils/helper/helperFunctions";
import {Panel, PanelGroup} from "react-bootstrap";
import SectionLinks from "./SectionLinks";

class LevelLinks extends Component {

    render() {
        const {appStatus, onClickLevelLink, onClickSectionLink} = this.props;

        const {levels, currentLevel, businessStatus} = appStatus;

        const {levelStatuses} = businessStatus;

        //generate level list from levels
        const levelsList = map(levels, (level, key) => {
            //generate level Image from level id
            const levelStatus = getStatus(levelStatuses, level.id);
            const levelImg = (levelStatus.completed_percent >= 100) ? level.badge_icon : level.icon;
            const levelUrl = generateAppRelativeUrl(level.slug);

            const sectionLinksProps = {
                level: level,
                appStatus: appStatus,
                onClickSectionLink: onClickSectionLink
            };

            return (
                <Panel key={level.slug} eventKey={level.id}
                       className={classnames("panel-faq", {"active": currentLevel.id === level.id})}>
                    <Panel.Heading>
                        <Panel.Title toggle>
                            <div onClick={(e) => onClickLevelLink(e, level)}
                            >
                                <figure
                                    className={classnames({"goldbadge-img": (levelStatus.completed_percent >= 100)})}>
                                    <img src={levelImg} alt=""/></figure>
                                <h6>{level.name}</h6>
                            </div>
                        </Panel.Title>
                    </Panel.Heading>
                    <Panel.Body collapsible>
                        {
                            isItemLoaded(appStatus.sections) && !currentLevel.is_down ?
                            <ul className="getting-start-list">
                                <SectionLinks {...sectionLinksProps}/>
                            </ul>
                                :
                                <div className="margin-top-15-px"></div>
                        }
                    </Panel.Body>
                </Panel>
            )
        });

        const handleSelect = (newKey) => {
            //do nothing
        };

        return (
            (levels.length > 0) ?
                <PanelGroup accordion id={`accordion-uncontrolled-level-links`} activeKey={currentLevel.id}
                            onSelect={(newKey) => handleSelect(newKey)}>
                    {levelsList}
                </PanelGroup> :
                <div></div>
        );
    }
}

LevelLinks.propTypes = {
    appStatus: PropTypes.object.isRequired,
    setCurrent: PropTypes.func.isRequired,
    addFlashMessage: PropTypes.func.isRequired,
    onClickLevelLink: PropTypes.func.isRequired,
    onClickSectionLink: PropTypes.func.isRequired,
};

export default withRouter(LevelLinks);