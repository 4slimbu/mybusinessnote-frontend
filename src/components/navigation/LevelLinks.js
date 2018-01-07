import React, {Component} from "react";
import {map} from "lodash";
import * as classnames from "classnames";
import {Link, withRouter} from "react-router-dom";
import SectionLinks from "./SectionLinks";
import PropTypes from "prop-types";

class LevelLinks extends Component {

    onClickLevel(level) {
        this.props.setCurrentLevel(level);
        this.props.history.push("/level/" + level.slug);
    }

    render() {
        //get the app status object
        const { appStatus, onClickLink } = this.props;
        //init levels
        const levels = appStatus.levels;
        //init current levels
        const currentLevel = appStatus.currentLevel;

        //generate level list from levels
        const levelsList = map(levels, (level, key) => {
            //generate level Image from level id
            const levelImg = (level.completed_percent >= 100) ? "badge/gold-badge-" + level.id : "img_" + level.id;
            return (
                <div key={level.slug} className={classnames("panel panel-default panel-faq", { "active" : currentLevel.id === level.id})}>
                    <div className="panel-heading" role="tab" id={`menu${level.id}`}>
                        <div className="panel-title clearfix">
                            <Link onClick={() => this.onClickLevel(level)}
                                  role="button" data-toggle="collapse"
                                  data-parent="#accordion2"
                                  to={`/level/${level.slug}#collapse${level.id}`}
                                  aria-expanded="true" aria-controls={`collapse${level.id}`}
                            >
                                <figure className={classnames({"goldbadge-img" : (level.completed_percent >= 100)})}><img src={`${process.env.PUBLIC_URL}/assets/images/journey/${levelImg}.png`} alt="" /></figure>
                                <h6>{ level.name }</h6>
                            </Link>
                        </div>
                    </div>
                    <div id={`collapse${level.id}`} className={classnames("panel-collapse collapse", {"in" : currentLevel.id === level.id })} role="tabpanel" aria-labelledby="menu2">
                        <div className="panel-body">
                            <ul className="getting-start-list">
                                <SectionLinks level={level} appStatus={appStatus} onClickLink={(e, url)=>onClickLink(e, url)}/>
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
    onClickLink: PropTypes.func.isRequired
};

export default withRouter(LevelLinks);