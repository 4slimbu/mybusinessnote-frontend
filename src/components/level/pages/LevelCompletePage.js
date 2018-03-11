import React from "react";
import {Link} from "react-router-dom";
import PropTypes from "prop-types";
import {dashboardUrl, isItemLoaded, publicUrl} from "../../../utils/helper/helperFunctions";

const LevelCompletePage = (props) => {
    const {
        currentLevel, nextLevel, onClickLevelLink
    } = props;
    const nextLevelUrl = isItemLoaded(nextLevel) ? '/level/' + nextLevel.slug : dashboardUrl();
    return (
        <div className="level-complete">
            <h5 className="obvious-h5 hidden-xs">{ currentLevel.name }</h5>
            {currentLevel.badge_message && <div className="content-wrap" dangerouslySetInnerHTML={{__html: currentLevel.badge_message}} />}
            <img className="complete-block-img"
                 src={publicUrl('/assets/images/level-complete.png')} alt=""/>
            <div className="bottom-block-complete">
                {
                    !isItemLoaded(nextLevel) ?
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
    currentLevel: PropTypes.object.isRequired,
    nextLevel: PropTypes.object.isRequired,
};

export default LevelCompletePage;