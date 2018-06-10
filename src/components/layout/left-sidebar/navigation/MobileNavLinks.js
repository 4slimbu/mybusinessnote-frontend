import React, {Component} from "react";
import {map} from "lodash";
import * as classnames from "classnames";
import {Link, withRouter} from "react-router-dom";
import PropTypes from "prop-types";
import {
    generateAppRelativeUrl, getCurrentLevelSections, getStatus, isItemLoaded, isLevelLocked,
    isSectionLocked
} from "../../../../utils/helper/helperFunctions";
import UserInfoLinks from "../../right-sidebar/current-user-box/UserInfoLinks";

class MobileLevelLinks extends Component {
    render() {
        const {auth, appStatus, onClickLevelLink, onClickSectionLink} = this.props;

        const {levels, sections, currentLevel, currentSection, businessStatus} = appStatus;

        const {levelStatuses, sectionStatuses, businessOptionStatuses} = businessStatus;

        //generate level list from levels
        const levelsList = map(levels, (level, key) => {
            //generate level Image from level id
            const levelStatus = getStatus(levelStatuses, level.id);
            const levelImg = (levelStatus.completed_percent >= 100) ? level.badge_icon : level.icon;
            const levelUrl = generateAppRelativeUrl(level.slug);

            return (
                <li key={level.slug} className={classnames("", {"active": currentLevel.id === level.id})}>
                    <Link data-toggle="tab" onClick={(e) => onClickLevelLink(e, level)}
                          to={levelUrl}
                    >
                        {
                            levelStatus.completed_percent >= 100 ?
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
            const currentLevelSections = getCurrentLevelSections(sections, level.id);

            return map(currentLevelSections, (section, key) => {
                const sectionUrl = generateAppRelativeUrl(level.slug, section.slug);
                const isLocked = isLevelLocked(appStatus, level);
                const isSectionLocked = !auth.isVerified && section.id !== 1 && section.id !== 2;
                const lockedClass = isLocked || isSectionLocked ? 'locked' : '';
                return (
                    <li key={section.id} className={classnames(lockedClass)}>
                        <a href={sectionUrl} onClick={(e) => onClickSectionLink(e, level, section, isLocked)}>
                            {section.name}
                        </a>
                    </li>
                )
            });
        };

        //generate level list from levels
        const hamLevelList = map(levels, (level, key) => {
            //generate level Image from level id
            const levelUrl = generateAppRelativeUrl(level.slug);

            return (
                <li key={level.slug} className={classnames("dropdown", {"active open": currentLevel.id === level.id})}>
                    <Link onClick={(e) => onClickLevelLink(e, level)}
                          to={levelUrl}
                          className="dropdown-toggle" data-toggle="dropdown" role="button" aria-haspopup="true"
                          aria-expanded="false"
                    >
                        {level.name}
                        <span className="caret"></span>
                    </Link>
                    {
                        !currentLevel.is_down &&
                        <ul className="dropdown-menu">
                            {sectionsList(level)}
                        </ul>
                    }
                </li>
            )
        });


        return (
            <div>
                <nav className="navbar navbar-inverse navbar-fixed-top mobile-navbar">
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
                                  className="navbar-brand">
                                <img src={`${process.env.PUBLIC_URL}/assets/images/mobile-icons/mob-logo.png`} alt=""/>
                            </Link>
                        </div>
                        <div id="navbar" className="navbar-collapse collapse" aria-expanded="false"
                             style={{height: '1px'}}>
                            <UserInfoLinks/>
                            {
                                isItemLoaded(hamLevelList) &&
                                <ul className="nav navbar-nav">
                                    {hamLevelList}
                                </ul>
                            }
                        </div>
                    </div>
                </nav>
                {
                    isItemLoaded(levels) &&
                    <ul className="nav nav-tabs">
                        {levelsList}
                    </ul>
                }
            </div>
        )
    }
}

MobileLevelLinks.propTypes = {
    auth: PropTypes.object.isRequired,
    appStatus: PropTypes.object.isRequired,
    setCurrent: PropTypes.func.isRequired,
    addFlashMessage: PropTypes.func.isRequired,
    onClickLevelLink: PropTypes.func.isRequired,
    onClickSectionLink: PropTypes.func.isRequired,
};

export default withRouter(MobileLevelLinks);