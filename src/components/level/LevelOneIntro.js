import React, {Component} from "react";
import PropTypes from "prop-types";
import {Link, withRouter} from "react-router-dom";

class LevelOneIntro extends Component {
    componentDidMount() {
        this.displayToolTip();
    }

    displayToolTip() {
        const toolTip = {};
        toolTip.rawHtmlContent = this.props.level.tooltip;
        this.props.setToolTipContent(toolTip);
    }
    render() {
        const { level, setCurrentLevel, setCurrentSection, setCurrentBusinessOption, history } = this.props;
        const { name, completed_percent, total_sections, total_completed_sections, content } = this.props.level;
        const onClickStart = function (e, sectionUrl) {
            e.preventDefault();
            setCurrentLevel(level);
            setCurrentSection(level.sections[0]);
            setCurrentBusinessOption({});
            history.push(sectionUrl);
        };
        const sectionUrl = '/level/' + level.slug + '/section/' + level.sections[0].slug;
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
                    <div dangerouslySetInnerHTML={{__html: content}} />
                    <div className="btn-wrap">
                        <button onClick={(e) => onClickStart(e, sectionUrl)} className="btn btn-default btn-md">Continue</button>
                    </div>

                </div>
            </section>
        );
    }
}

LevelOneIntro.propTypes = {
    level: PropTypes.object.isRequired,
    setCurrentLevel: PropTypes.func.isRequired,
    setCurrentSection: PropTypes.func.isRequired,
    setCurrentBusinessOption: PropTypes.func.isRequired
};

export default withRouter(LevelOneIntro);