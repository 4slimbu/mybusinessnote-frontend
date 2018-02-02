import React, {Component} from "react";
import {map} from "lodash";
import * as classnames from "classnames";
import {Link, withRouter} from "react-router-dom";
import SectionLinks from "./SectionLinks";
import PropTypes from "prop-types";
import {generateAppRelativeUrl} from "./helperFunctions";

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
                <div key={level.slug} className={classnames("panel panel-default panel-faq", { "active" : currentLevel.id === level.id})}>
                    <div className="panel-heading" role="tab" id={`menu${level.id}`}>
                        <div className="panel-title clearfix">
                            <Link onClick={(e) => onClickLevelLink(e, levelUrl )}
                                  role="button" data-toggle="collapse"
                                  data-parent="#accordion2"
                                  to={`/level/${level.slug}#collapse${level.id}`}
                                  aria-expanded="true" aria-controls={`collapse${level.id}`}
                            >
                                <figure className={classnames({"goldbadge-img" : (level.completed_percent >= 100)})}><img src={levelImg} alt="" /></figure>
                                <h6>{ level.name }</h6>
                            </Link>
                        </div>
                    </div>
                    <div id={`collapse${level.id}`} className={classnames("panel-collapse collapse", {"in" : currentLevel.id === level.id })} role="tabpanel" aria-labelledby="menu2">
                        <div className="panel-body">
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
                        </div>
                    </div>
                </div>
            )
        });

        return (
            <div>
                { levelsList }
            </div>
        )
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