import Validator from "validator";
import isEmpty from "lodash/isEmpty";
import {MESSAGES} from "../../constants/messages";

export function validateLogin(data) {
    let errors = {};

    if (!Validator.isEmail(data.email)) {
        errors.email = MESSAGES.ERR_EMAIL_INVALID;
    }

    if (Validator.isEmpty(data.email)) {
        errors.email = MESSAGES.ERR_EMAIL_REQUIRED;
    }

    if (Validator.isEmpty(data.password)) {
        errors.password = MESSAGES.ERR_PASSWORD_REQUIRED;
    }

    return {
        errors,
        isValid: isEmpty(errors)
    }
}