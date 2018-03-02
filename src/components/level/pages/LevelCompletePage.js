import React, {Component} from "react";
import {Link} from "react-router-dom";
import PropTypes from "prop-types";
import {dashboardUrl, publicUrl} from "../../../utils/helper/helperFunctions";

const LevelCompletePage = (props) => {
    const {
        level, nextLevel, onClickLevelLink
    } = props;
    const nextLevelUrl = '/level/' + nextLevel.slug;
    const isLast = (level.id === nextLevel.id);
    return (
        <div className="level-complete">
            <h5 className="obvious-h5 hidden-xs">{ level.name }</h5>
            {level.badge_message && <div className="content-wrap" dangerouslySetInnerHTML={{__html: level.badge_message}} />}
            <img className="complete-block-img"
                 src={publicUrl('/assets/images/level-complete.png')} alt=""/>
            <div className="bottom-block-complete">
                {
                    isLast ?
                        <div className="btn-wrap">
                            <a href={dashboardUrl()} className="btn btn-default btn-md">Go to Dashboard</a>
                            <br/><br/>
                        </div>
                        :
                        <div>
                            <div className="btn-wrap">
                                <Link onClick={(e) => onClickLevelLink(e, nextLevelUrl)}
                                      to={nextLevelUrl} className="btn btn-default btn-md">Continue to
                                    level {nextLevel.id}</Link>
                            </div>
                            <Link onClick={(e) => onClickLevelLink(e, nextLevelUrl)}
                                  to={nextLevelUrl} className="next-session-link">
                                <i className="fa fa-chevron-down" aria-hidden="true"></i>
                            </Link>
                            <h6>{ nextLevel.name }</h6>
                        </div>
                }
            </div>
        </div>
    );
};

LevelCompletePage.propTypes = {
    level: PropTypes.object.isRequired,
    nextLevel: PropTypes.object.isRequired,
};

export default LevelCompletePage;