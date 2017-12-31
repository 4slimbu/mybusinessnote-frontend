import React from "react";
import PropTypes from "prop-types";
import * as classnames from "classnames";

const TextFieldGroup = ({ field, value, label, error, type, onChange, checkIfUserExists }) => {
    return (
        <div className={classnames("form-group", { "has-error" : error})}>
            <label className="control-label">{label}</label>
            <input
                onChange={onChange}
                onBlur={checkIfUserExists}
                value={value}
                type={type}
                name={field}
                className="form-control"
            />
            { error && <span className="help-block">{error}</span> }
        </div>
    )
};

TextFieldGroup.propTypes = {
    field: PropTypes.string.isRequired,
    value: PropTypes.string.isRequired,
    label: PropTypes.string.isRequired,
    error: PropTypes.array,
    type: PropTypes.string.isRequired,
    onChange: PropTypes.func.isRequired,
    checkIfUserExists: PropTypes.func
};

export default TextFieldGroup;