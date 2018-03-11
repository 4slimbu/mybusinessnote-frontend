import React from "react";
import PropTypes from "prop-types";

const ProgressBar = ({ completedPercent, relativeSectionCount }) => {
    return (
        <div className="hidden-xs">
            <span className="progress-label">{ completedPercent }% complete</span> <span
            className="pull-right progress-label">{ relativeSectionCount }</span>
            <div className="progress">
                <div className="progress-bar" role="progressbar" aria-valuenow="60" aria-valuemin="0"
                     aria-valuemax="100" style={{width: completedPercent + "%"}}>
                </div>
            </div>
        </div>
    )
};

ProgressBar.propTypes = {
    completedPercent:  PropTypes.number.isRequired,
    relativeSectionCount: PropTypes.number.isRequired,
};

export default ProgressBar;