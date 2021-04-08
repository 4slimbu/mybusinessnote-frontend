import React from "react";
import PropTypes from "prop-types";

const MiniProgressBar = ({ completed_percent }) => {
    return (
        <div className="progress">
            <div className="progress-bar" role="progressbar" aria-valuenow="0" aria-valuemin="0"
                 aria-valuemax="100" style={{width: completed_percent + "%"}}>
            </div>
        </div>
    )
};

MiniProgressBar.propTypes = {
    completed_percent:  PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
};

export default MiniProgressBar;