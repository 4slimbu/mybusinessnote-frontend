import Validator from "validator";
import isEmpty from "lodash/isEmpty";
import {map} from "lodash";
import {MESSAGES} from "../../constants/messages";

export function validateFields(inputs, rules) {
    let errors = {};
    map(inputs, (input, inputKey) => {
        if (rules[inputKey]) {
            let ruleTypes = rules[inputKey].split('|');
            map(ruleTypes, (ruleType, key) => {
                return errors[inputKey] = input + ' ' + ruleType
            })
        }

    });
    console.log(errors);

    if (!Validator.isEmail(inputs.email)) {
        errors.email = MESSAGES.ERR_EMAIL_INVALID;
    }

    if (Validator.isEmpty(inputs.email)) {
        errors.email = MESSAGES.ERR_EMAIL_REQUIRED;
    }

    if (Validator.isEmpty(inputs.password)) {
        errors.password = MESSAGES.ERR_PASSWORD_REQUIRED;
    }

    return {
        errors,
        isValid: isEmpty(errors)
    }
}