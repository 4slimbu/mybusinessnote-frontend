import React, {Component} from "react";
import PropTypes from "prop-types";
import {map} from "lodash";
import {Link, withRouter} from "react-router-dom";
import * as classnames from "classnames";
import ProgressBar from "../common/ProgressBar";

class LevelThreeIntro extends Component {
    componentDidMount() {
        this.displayToolTip();
    }


    handleSelect(e) {
        e.preventDefault();
    }

    handleToolTip(e, id) {
        e.preventDefault();
        this.displayToolTip(id);
    }

    displayToolTip(id) {
        const { currentLevel } = this.props.appStatus;
        const tipList = map(currentLevel.sections, (item, key) => {
            const title = (item.id === id) ? <strong>{ item.name }</strong> : item.name ;
            return  (
                <div className="panel panel-default" key={`tip-list-${key}` }>
                    <div className="panel-heading " role="tab" id={`tip-heading-${key}`}>
                        <a href={`#tip-collapse-${key}`} className={ classnames("panel-title", { "collapsed" : item.id === id})} role="button" data-toggle="collapse"
                           data-parent="#accordion" aria-expanded="true" aria-controls={`tip-collapse-${key}`}>
                            <h4>
                                <span className="accordion-titles">{ title }</span>
                                <span className="acc-img"></span>
                            </h4>
                        </a>
                    </div>
                    <div id={`tip-collapse-${key}`} className={ classnames("panel-collapse collapse", { "in" : item.id === id})} role="tabpanel"
                         aria-labelledby={`heading${key}`}>
                        <div className="panel-body">
                            <div className="content-wrap" dangerouslySetInnerHTML={{__html: item.tooltip}} />
                        </div>
                    </div>
                </div>
            )
        });
        const toolTip = {};
        toolTip.rawHtmlContent = this.props.level.tooltip;
        toolTip.accordion = tipList;
        this.props.setToolTipContent(toolTip);
    }

    render() {
        const {level, addFlashMessage, appStatus, setCurrentLevel, setCurrentSection, setCurrentBusinessOption, history} = this.props;
        const {name, completed_percent, total_sections, total_completed_sections, content } = this.props.level;

        const onClickContinue = function (e, sectionUrl) {
            e.preventDefault();
            setCurrentLevel(level);
            setCurrentSection(level.sections[0]);
            setCurrentBusinessOption({});
            history.push('/level/' + level.slug + '/section/' + level.sections[0].slug);
        };

        const sections = map(level.sections, (section, key) => {
            const active = 'active';
            const sectionUrl = '/level/' + level.slug + '/section/' + section.slug;
            const onClickSectionLink = function (e) {
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
                    if (level.id == 2) {
                        if (appStatus.levels[0].completed_percent < '100') {
                            addFlashMessage({
                                type: "error",
                                text: "Section Locked!"
                            });
                            return;
                        }
                    }
                    if (level.id == 3) {
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
                setCurrentBusinessOption({});
                history.push(sectionUrl);
            };
            return (
                <li key={section.id} className={active}>
                    <Link to={sectionUrl} onClick={(e) => onClickSectionLink(e, sectionUrl)} >
                        <div className="white-icon" >
                            <img src={process.env.REACT_APP_API_BASE_IMAGE_URL + '/images/sections/' + section.icon} alt=""/>
                        </div>
                        <span> {section.name}</span>
                    </Link>
                    <a className="apps-question" href="#"
                       onMouseEnter={(e) => this.handleToolTip(e, section.id)}
                       onClick={(e) => this.handleToolTip(e, section.id)}>
                        <i className="fa fa-lightbulb-o" aria-hidden="true"></i>
                    </a>
                </li>
            )
        });

        return (
            <section className="mid-sec bg-red mCustomScrollbar" data-mcs-theme="dark">
                <div className="content-wrapper step-one">
                    <h5 className="obvious-h5">{ name }</h5>
                    <ProgressBar
                        completed_percent={completed_percent}
                        total_completed_sections={total_completed_sections}
                        total_sections={total_sections}
                    />
                    <div className="content-wrap" dangerouslySetInnerHTML={{__html: content}} />
                    <div>
                        <ul className="apps-icons clearfix level2-apps-icons">{ sections }</ul>
                    </div>
                    <div className="btn-wrap">
                        <a href="#" onClick={(e) => onClickContinue(e)}  className="btn btn-default btn-md">Continue</a>
                    </div>
                </div>
            </section>
        );
    }
}

LevelThreeIntro.propTypes = {
    appStatus: PropTypes.object.isRequired,
    addFlashMessage: PropTypes.object.isRequired,
    level: PropTypes.object.isRequired,
    setCurrentLevel: PropTypes.func.isRequired,
    setCurrentSection: PropTypes.func.isRequired,
    setCurrentBusinessOption: PropTypes.func.isRequired
};

export default withRouter(LevelThreeIntro);