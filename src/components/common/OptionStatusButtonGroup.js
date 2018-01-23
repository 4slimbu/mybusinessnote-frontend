import React from "react";
import PropTypes from "prop-types";
import {saveBusinessOption} from "../navigation/helperFunctions";

const OptionStatusButtonGroup = ({ status, current }) => {
    const onClickUpdateStatus = function(e, status) {
        e.preventDefault();

        saveBusinessOption(current, {
            business_option_id: current.props.appStatus.currentBusinessOption.id,
            business_option_status: status
        });
    };
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
    currentBusinessOption: PropTypes.object.isRequired
};

export default OptionStatusButtonGroup;