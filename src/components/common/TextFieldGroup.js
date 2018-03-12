import React from "react";
import PropTypes from "prop-types";
import * as classnames from "classnames";

const TextFieldGroup = ({fieldObject, error, onChange, onBlur}) => {
    return (
        <div className="form-group">
            <label>{fieldObject.label}</label>
            <input
                onChange={onChange}
                onBlur={onBlur}
                value={fieldObject.isChanged ? fieldObject.value : fieldObject.oldValue}
                type={fieldObject.type}
                name={fieldObject.name}
                placeholder={fieldObject.placeholder}
                className={classnames("form-control", {"form-error": error})}
            />
            {error && <span className="form-error-message">{error}</span>}
        </div>
    )
};

TextFieldGroup.propTypes = {
    fieldObject: PropTypes.object.isRequired,
    error: PropTypes.string,
    onChange: PropTypes.func.isRequired,
    onBlur: PropTypes.func
};

export default TextFieldGroup;