import React, {Component} from "react";
import PropTypes from "prop-types";

class LevelTwoIntro extends Component {
    render() {
        const {name, completed_percent, total_sections, total_completed_sections } = this.props.level;
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
                    <h1>Getting started</h1>
                    <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been
                        the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley
                        of type and scrambled it to make a type specimen book.</p>
                    <p>It has survived not only five centuries, but also the leap into electronic typesetting, remaining
                        essentially unchanged.</p>
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