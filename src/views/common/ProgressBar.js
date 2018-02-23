import React from "react";
import PropTypes from "prop-types";
import {saveBusinessOption} from "../../utils/helper/helperFunctions";

const ProgressBar = ({ completed_percent, total_completed_sections, total_sections }) => {
    return (
        <div className="hidden-xs">
            <span className="progress-label">{ completed_percent }% complete</span> <span
            className="pull-right progress-label">{ total_completed_sections }/{ total_sections }</span>
            <div className="progress">
                <div className="progress-bar" role="progressbar" aria-valuenow="60" aria-valuemin="0"
                     aria-valuemax="100" style={{width: completed_percent + "%"}}>
                </div>
            </div>
        </div>
    )
};

ProgressBar.propTypes = {
    completed_percent:  PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    total_completed_sections: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    total_sections: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
};

export default ProgressBar;