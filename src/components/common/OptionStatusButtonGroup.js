import React from "react";
import PropTypes from "prop-types";

const OptionStatusButtonGroup = ({status, onClickUpdateStatus}) => {
    return (
        <ul className="alert-f-links">
            <li><a
                className={status == 'skipped' ? 'active' : ''}
                href="" onClick={(e) => onClickUpdateStatus(e, 'skipped')}>Not now</a></li>
            <li><a
                className={status == 'irrelevant' ? 'active' : ''}
                href="" onClick={(e) => onClickUpdateStatus(e, 'irrelevant')}>Doesn't apply to me</a></li>
        </ul>
    )
};

OptionStatusButtonGroup.propTypes = {
    status: PropTypes.string.isRequired,
    onClickUpdateStatus: PropTypes.func.isRequired
};

export default OptionStatusButtonGroup;