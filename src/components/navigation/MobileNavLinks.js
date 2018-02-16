import React, {Component} from "react";
import {map} from "lodash";
import * as classnames from "classnames";
import {Link, withRouter} from "react-router-dom";
import SectionLinks from "./SectionLinks";
import PropTypes from "prop-types";
import {generateAppRelativeUrl} from "./helperFunctions";
import UserInfoLinks from "./UserInfoLinks";

class MobileLevelLinks extends Component {
    render() {
        //get the app status object
        const {
            appStatus, addFlashMessage, history, setCurrentLevel, setCurrentSection, setCurrentBusinessOption,
            setCompletedStatus,
            getBusinessOptionFromUrl
        } = this.props;
        //init levels
        const levels = appStatus.levels;
        //init current levels
        const currentLevel = appStatus.currentLevel;

        //navigate
        const onClickLevelLink = function (e, url) {
            e.preventDefault();
            setCurrentLevel(appStatus.levels[0]);
            setCurrentSection({});
            setCurrentBusinessOption({});
            history.push(url);
        };

        //generate level list from levels
        const levelsList = map(levels, (level, key) => {
            //generate level Image from level id
            const levelUrl = generateAppRelativeUrl(level.slug);
            const levelImg = (level.completed_percent >= 100) ? process.env.REACT_APP_API_BASE_IMAGE_URL + '/images/levels/' + level.badge_icon :
                process.env.REACT_APP_API_BASE_IMAGE_URL + '/images/levels/' + level.icon;
            const onClickLevelLink = function (e, levelUrl) {
                e.preventDefault();
                setCurrentLevel(level);
                setCurrentSection({});
                setCurrentBusinessOption({});
                setCompletedStatus({});
                history.push(levelUrl);
            };
            return (
                <li key={level.slug} className={classnames("", {"active": currentLevel.id === level.id})}>
                    <Link data-toggle="tab" onClick={(e) => onClickLevelLink(e, levelUrl)}
                          to={`/level/${level.slug}`}
                    >
                        {
                            level.completed_percent >= 100 ?
                                <img src={levelImg} alt=""/>
                                :
                                <div>
                                    <div className="progress-bar" data-percent={level.completed_percent}
                                         data-duration="1000" data-color="#6f6170,#bf696e">
                                        <img src={levelImg} alt=""/>
                                    </div>
                                </div>

                        }
                        <br/>{level.name}
                    </Link>
                </li>
            )
        });

        const sectionsList = function (level) {
            return map(level.sections, (section, key) => {
                const complete = section.completed_percent == 100 ? true : false;
                const sectionUrl = generateAppRelativeUrl(level.slug, section.slug);
                const onClickSectionLink = function (e, sectionUrl) {
                    e.preventDefault();
                    if ((key - 1) >= 0) {
                        if (level.sections[key - 1].completed_percent < '100') {
                            addFlashMessage({
                                type: "error",
                                text: "Section Locked!"
                            });
                            return;
                        }
                    } else {
                        if (level.id === 2) {
                            if (appStatus.levels[0].completed_percent < '100') {
                                addFlashMessage({
                                    type: "error",
                                    text: "Section Locked!"
                                });
                                return;
                            }
                        }
                        if (level.id === 3) {
                            if (appStatus.levels[1].completed_percent < '100') {
                                addFlashMessage({
                                    type: "error",
                                    text: "Section Locked!"
                                });
                                return;
                            }
                        }
                    }
                    setCurrentLevel(level);
                    setCurrentSection(section);
                    setCompletedStatus({});
                    getBusinessOptionFromUrl(generateAppRelativeUrl(level.id, section.id));
                    history.push(sectionUrl);
                };
                return (
                    <li key={section.id}><a href={sectionUrl} onClick={(e) => onClickSectionLink(e, sectionUrl)}>
                        {section.name}</a>
                    </li>
                )
            });
        }

        //generate level list from levels
        const hamLevelList = map(levels, (level, key) => {
            //generate level Image from level id
            const levelUrl = generateAppRelativeUrl(level.slug);
            const levelImg = (level.completed_percent >= 100) ? process.env.REACT_APP_API_BASE_IMAGE_URL + '/images/levels/' + level.badge_icon :
                process.env.REACT_APP_API_BASE_IMAGE_URL + '/images/levels/' + level.icon;
            const onClickLevelLink = function (e, levelUrl) {
                e.preventDefault();
                setCurrentLevel(level);
                setCurrentSection({});
                setCurrentBusinessOption({});
                setCompletedStatus({});
                history.push(levelUrl);
            };
            return (
                <li key={level.slug} className={classnames("dropdown", {"active open": currentLevel.id === level.id})}>
                    <Link onClick={(e) => onClickLevelLink(e, levelUrl)}
                          to={`/level/${level.slug}`}
                          className="dropdown-toggle" data-toggle="dropdown" role="button" aria-haspopup="true"
                          aria-expanded="false"
                    >
                        {level.name}
                        <span className="caret"></span>
                    </Link>
                    <ul className="dropdown-menu">
                        {sectionsList(level)}
                    </ul>
                </li>
            )
        });


        return (
            <div>
                <nav className="navbar navbar-inverse navbar-fixed-top">
                    <div className="container">
                        <div className="navbar-header">
                            <button type="button" className="navbar-toggle collapsed" data-toggle="collapse"
                                    data-target="#navbar" aria-expanded="false" aria-controls="navbar">
                                <span className="sr-only">Toggle navigation</span>
                                <span className="icon-bar"></span>
                                <span className="icon-bar"></span>
                                <span className="icon-bar"></span>
                            </button>
                            <Link to="/"
                                  onClick={(e) => onClickLevelLink(e, '/')}
                                  className="navbar-brand">
                                <img src={`${process.env.PUBLIC_URL}/assets/images/mobile-icons/mob-logo.png`} alt=""/>
                            </Link>
                        </div>
                        <div id="navbar" className="navbar-collapse collapse" aria-expanded="false"
                             style={{height: '1px'}}>
                            <UserInfoLinks/>
                            <ul className="nav navbar-nav">
                                {hamLevelList}
                            </ul>
                        </div>
                    </div>
                </nav>
                <ul className="nav nav-tabs">
                    {levelsList}
                </ul>
            </div>
        )
    }
}

MobileLevelLinks.propTypes = {
    appStatus: PropTypes.object.isRequired,
    setCurrentLevel: PropTypes.func.isRequired,
    setCurrentSection: PropTypes.func.isRequired,
    setCurrentBusinessOption: PropTypes.func.isRequired,
    setCompletedStatus: PropTypes.func.isRequired,
    getBusinessOptionFromUrl: PropTypes.func.isRequired,
    addFlashMessage: PropTypes.func.isRequired
};

export default withRouter(MobileLevelLinks);