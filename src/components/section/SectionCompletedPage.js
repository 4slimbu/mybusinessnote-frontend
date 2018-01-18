import React, {Component} from "react";
import {Link, withRouter} from "react-router-dom";
import PropTypes from "prop-types";

class SectionCompletedPage extends Component {
    render() {
        const {level, nextLevel, setCurrentLevel, setCurrentSection, setCurrentBusinessOption, history} = this.props;
        const onClickLevelLink = function (e, levelUrl) {
            e.preventDefault();
            setCurrentLevel(nextLevel);
            setCurrentSection({});
            setCurrentBusinessOption({});
            history.push(levelUrl);
        };
        const nextLevelUrl = '/level/' + nextLevel.slug;
        return (
            <div className="level-7">
                <section className="mid-sec bg-red">
                    <div className="content-wrapper step-one">
                        <h5 className="obvious-h5">{ level.name }</h5>
                        <h1>Congratulations</h1>
                        <p>Level {level.id} complete!</p>
                        <img className="complete-block-img"
                             src={`${process.env.PUBLIC_URL}/assets/images/level-complete.png`} alt=""/>
                        <div className="bottom-block-complete">
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
                    </div>
                </section>
            </div>
        );
    }
}

SectionCompletedPage.propTypes = {
    level: PropTypes.object.isRequired,
    nextLevel: PropTypes.object.isRequired,
    setCurrentLevel: PropTypes.func.isRequired,
    setCurrentSection: PropTypes.func.isRequired,
    setCurrentBusinessOption: PropTypes.func.isRequired
};

export default withRouter(SectionCompletedPage);