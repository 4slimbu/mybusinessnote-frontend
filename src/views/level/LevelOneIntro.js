import React, {Component} from "react";
import PropTypes from "prop-types";
import {Link, withRouter} from "react-router-dom";
import ProgressBar from "../common/ProgressBar";

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
            <div>
                <h5 className="obvious-h5">{ name }</h5>
                <ProgressBar
                    completed_percent={completed_percent}
                    total_completed_sections={total_completed_sections}
                    total_sections={total_sections}
                />
                <div className="content-wrap" dangerouslySetInnerHTML={{__html: content}} />
                <div className="btn-wrap">
                    <button onClick={(e) => onClickStart(e, sectionUrl)} className="btn btn-default btn-md">Continue</button>
                </div>
            </div>
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