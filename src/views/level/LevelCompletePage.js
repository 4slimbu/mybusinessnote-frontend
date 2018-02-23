import React, {Component} from "react";
import {Link, withRouter} from "react-router-dom";
import PropTypes from "prop-types";
import {setShowCompletedPage} from "../../services/actions/appStatusAction";

class LevelCompletePage extends Component {
    render() {
        const {level, nextLevel, setCurrentLevel, setShowCompletedPage, setCurrentSection, setCurrentBusinessOption,
            setCompletedStatus,
            history} = this.props;
        const onClickLevelLink = function (e, levelUrl) {
            e.preventDefault();
            setCurrentLevel(nextLevel);
            setCurrentSection({});
            setCurrentBusinessOption({});
            setShowCompletedPage(false);
            setCompletedStatus({});
            history.push(levelUrl);
        };
        const nextLevelUrl = '/level/' + nextLevel.slug;
        const isLast = (level.id === nextLevel.id);
        const dashboardUrl = process.env.REACT_APP_DASHBOARD_URL + '/?token=' + localStorage.getItem("jwtToken");
        return (
            <div className="level-7">
                <section className="mid-sec bg-red">
                    <div className="content-wrapper step-one">
                        <h5 className="obvious-h5 hidden-xs">{ level.name }</h5>
                        {level.badge_message && <div className="content-wrap" dangerouslySetInnerHTML={{__html: level.badge_message}} />}
                        <img className="complete-block-img"
                             src={`${process.env.PUBLIC_URL}/assets/images/level-complete.png`} alt=""/>
                        <div className="bottom-block-complete">
                            {
                                isLast ?
                                    <div className="btn-wrap">
                                        <a href={dashboardUrl} className="btn btn-default btn-md">Go to Dashboard</a>
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
                                              to={nextLevelUrl} className="next-session-link"><i
                                            className="fa fa-chevron-down" aria-hidden="true"></i>
                                        </Link>
                                        <h6>{ nextLevel.name }</h6>
                                    </div>
                            }
                        </div>
                    </div>
                </section>
            </div>
        );
    }
}

LevelCompletePage.propTypes = {
    level: PropTypes.object.isRequired,
    nextLevel: PropTypes.object.isRequired,
    setCurrentLevel: PropTypes.func.isRequired,
    setCurrentSection: PropTypes.func.isRequired,
    setCurrentBusinessOption: PropTypes.func.isRequired,
    setCompletedStatus: PropTypes.func.isRequired,
    setShowCompletedPage: PropTypes.func.isRequired
};

export default withRouter(LevelCompletePage);