import React, {Component} from "react";
import PropTypes from "prop-types";
import {map} from "lodash";
import {Link} from "react-router-dom";

class LevelTwoIntro extends Component {
    handleSelect(e) {
        e.preventDefault();
    }
    render() {
        const {level} = this.props;
        const {name, completed_percent, total_sections, total_completed_sections } = this.props.level;

        const sections = map(level.sections, (item, key) => {
            const active = 'active';
            const sectionLink = '/level/' + level.slug + '/section/' + item.slug;
            return (
                <li key={item.id} style={{ maxWidth: "150px" }} className={active}>
                    <Link to={sectionLink}>
                        <div className="white-icon" >
                            <img src={item.white_icon} alt=""/>
                        </div>
                        <div className="red-icon" >
                            <img src={item.red_icon} alt=""/>
                        </div>
                        <span> {item.name}</span>
                    </Link>
                    <a className="apps-question" href="#" onClick={(e) => this.handleToolTip(e, item.id)}>
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
                    <p>Choose where to start. You must answer or skip each area to continue to Level 3 .Don't worry these options will always be available to you.</p>
                    <div>
                        <ul className="apps-icons clearfix level2-apps-icons">{ sections }</ul>
                    </div>
                    <div className="btn-wrap">
                        <a href="level1_step_2.html" className="btn btn-default btn-md">Start</a>
                    </div>
                </div>
            </section>
        );
    }
}

LevelTwoIntro.propTypes = {
    level: PropTypes.object.isRequired
};

export default LevelTwoIntro;