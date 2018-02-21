import React, {Component} from "react";
import {map, uniqueId} from "lodash";
import * as classnames from "classnames";
import {Link, withRouter} from "react-router-dom";
import SectionLinks from "./SectionLinks";
import PropTypes from "prop-types";
import {generateAppRelativeUrl} from "./helperFunctions";
import {Panel, PanelGroup} from "react-bootstrap";

class LevelLinks extends Component {

    render() {
        //get the app status object
        const { appStatus, addFlashMessage, history, setCurrentLevel, setCurrentSection, setCurrentBusinessOption,
            setCompletedStatus,
            getBusinessOptionFromUrl} = this.props;
        //init levels
        const levels = appStatus.levels;
        //init current levels
        const currentLevel = appStatus.currentLevel;

        //generate level list from levels
        const levelsList = map(levels, (level, key) => {
            //generate level Image from level id
            const levelUrl = generateAppRelativeUrl(level.slug);
            const levelImg = (level.completed_percent >= 100) ? process.env.REACT_APP_API_BASE_IMAGE_URL + '/images/levels/' + level.badge_icon :
                process.env.REACT_APP_API_BASE_IMAGE_URL + '/images/levels/' + level.icon;
            const onClickLevelLink = function(e, levelUrl) {
                e.preventDefault();
                setCurrentLevel(level);
                setCurrentSection({});
                setCurrentBusinessOption({});
                setCompletedStatus({});
                history.push(levelUrl);
            };
            return (
                <Panel key={level.slug} eventKey={level.slug} className={classnames("panel-faq", {"active": currentLevel.id === level.id})}>
                    <Panel.Heading>
                        <Panel.Title toggle>
                            <div onClick={(e) => onClickLevelLink(e, levelUrl )}
                            >
                                <figure className={classnames({"goldbadge-img" : (level.completed_percent >= 100)})}><img src={levelImg} alt="" /></figure>
                                <h6>{ level.name }</h6>
                            </div>
                        </Panel.Title>
                    </Panel.Heading>
                    <Panel.Body collapsible>
                        <ul className="getting-start-list">
                            <SectionLinks
                                level={level}
                                appStatus={appStatus}
                                addFlashMessage={addFlashMessage}
                                setCurrentLevel={setCurrentLevel}
                                setCurrentSection={setCurrentSection}
                                setCurrentBusinessOption={setCurrentBusinessOption}
                                setCompletedStatus={setCompletedStatus}
                                getBusinessOptionFromUrl={getBusinessOptionFromUrl}
                            />
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
            <PanelGroup accordion id={`accordion-uncontrolled-level-links`} activeKey={currentLevel.slug} onSelect={(newKey)=>handleSelect(newKey)}>
                {levelsList}
            </PanelGroup> :
                <div></div>
        );
    }
}

LevelLinks.propTypes = {
    appStatus: PropTypes.object.isRequired,
    setCurrentLevel: PropTypes.func.isRequired,
    setCurrentSection: PropTypes.func.isRequired,
    setCurrentBusinessOption: PropTypes.func.isRequired,
    setCompletedStatus: PropTypes.func.isRequired,
    getBusinessOptionFromUrl: PropTypes.func.isRequired,
    addFlashMessage: PropTypes.func.isRequired
};

export default withRouter(LevelLinks);