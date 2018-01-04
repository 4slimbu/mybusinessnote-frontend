import React from "react";
import PropTypes from "prop-types";
import * as classnames from "classnames";

const TextFieldGroup = ({ field, value, placeholder, label, error, type, onChange, checkIfUserExists }) => {
    return (
        <div className="form-group">
            <label>{label}</label>
            <input
                onChange={onChange}
                onBlur={checkIfUserExists}
                value={value}
                type={type}
                name={field}
                placeholder={placeholder}
                className={classnames("form-control", {"form-error": error})}
            />
            { error && <span className="form-error-message">{error}</span> }
        </div>
    )
};

TextFieldGroup.propTypes = {
    field: PropTypes.string.isRequired,
    value: PropTypes.string.isRequired,
    placeholder: PropTypes.string,
    label: PropTypes.string.isRequired,
    error: PropTypes.array,
    type: PropTypes.string.isRequired,
    onChange: PropTypes.func.isRequired,
    checkIfUserExists: PropTypes.func
};

export default TextFieldGroup;