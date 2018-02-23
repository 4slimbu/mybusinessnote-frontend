import React, {Component} from "react";
import PropTypes from "prop-types";
import ProgressBar from "../common/ProgressBar";

class LevelHead extends Component {
    render() {
        const {currentLevel} = this.props;
        const {name, completed_percent, total_completed_sections, total_sections } = currentLevel;
        return (
            <div>
                <h5 className="obvious-h5">{name}</h5>
                <ProgressBar
                    completed_percent={completed_percent}
                    total_completed_sections={total_completed_sections}
                    total_sections={total_sections}
                />
            </div>
        )
    }
}

LevelHead.propTypes = {
    currentLevel: PropTypes.object.isRequired
};

export default LevelHead;