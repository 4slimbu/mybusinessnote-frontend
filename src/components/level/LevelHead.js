import React, {Component} from "react";
import PropTypes from "prop-types";

class LevelHead extends Component {
    render() {
        const {currentLevel} = this.props;
        return (
            <div>
                <h5 className="obvious-h5">{currentLevel.name}</h5>
                <span className="progress-label">{currentLevel.completed_percent}% complete</span> <span
                className="pull-right progress-label">{currentLevel.total_completed_sections}/ {currentLevel.total_sections}</span>
                <div className="progress">
                    <div className="progress-bar" role="progressbar" aria-valuenow="60" aria-valuemin="0"
                         aria-valuemax="100" style={{width: currentLevel.completed_percent + "%"}}>
                    </div>
                </div>
            </div>
        )
    }
}

LevelHead.propTypes = {
    currentLevel: PropTypes.object.isRequired
};

export default LevelHead;