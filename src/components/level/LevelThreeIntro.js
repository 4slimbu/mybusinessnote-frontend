import React, {Component} from "react";
import PropTypes from "prop-types";
import {map} from "lodash";
import {Link, withRouter} from "react-router-dom";

class LevelThreeIntro extends Component {
    handleSelect(e) {
        e.preventDefault();
    }
    render() {
        const {level, setCurrentLevel, setCurrentSection, setCurrentBusinessOption, history} = this.props;
        const {name, completed_percent, total_sections, total_completed_sections } = this.props.level;

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
                setCurrentLevel(level);
                setCurrentSection(section);
                setCurrentBusinessOption({});
                history.push(sectionUrl);
            };
            return (
                <li key={section.id} style={{ maxWidth: "150px" }} className={active}>
                    <Link to={sectionUrl} onClick={(e) => onClickSectionLink(e, sectionUrl)} >
                        <div className="white-icon" >
                            <img src={section.white_icon} alt=""/>
                        </div>
                        <div className="red-icon" >
                            <img src={section.red_icon} alt=""/>
                        </div>
                        <span> {section.name}</span>
                    </Link>
                    <a className="apps-question" href="#" onClick={(e) => this.handleToolTip(e, section.id)}>
                        <i className="fa fa-lightbulb-o" aria-hidden="true"></i>
                    </a>
                </li>
            )
        });

        return (
            <section className="mid-sec bg-red mCustomScrollbar" data-mcs-theme="dark">
                <div className="content-wrapper step-one">
                    <h5 className="obvious-h5">{ name }</h5>
                    <span className="progress-label">{ completed_percent }% complete</span> <span
                    className="pull-right progress-label">{ total_completed_sections }/{ total_sections }</span>
                    <div className="progress">
                        <div className="progress-bar" role="progressbar" aria-valuenow="60" aria-valuemin="0"
                             aria-valuemax="100" style={{width: completed_percent + "%"}}>
                        </div>
                    </div>
                    <h1>Which area of your business would you like to work on first?</h1>
                    <p>Choose where to start. You must answer or skip each area to continue.Don't worry these options will always be available to you.</p>
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
    level: PropTypes.object.isRequired,
    setCurrentLevel: PropTypes.func.isRequired,
    setCurrentSection: PropTypes.func.isRequired,
    setCurrentBusinessOption: PropTypes.func.isRequired
};

export default withRouter(LevelThreeIntro);