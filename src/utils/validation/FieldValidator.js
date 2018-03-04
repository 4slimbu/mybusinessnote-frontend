import Validator from "validator";
import isEmpty from "lodash/isEmpty";
import {map} from "lodash";
import {toCapitalizedWords} from "../helper/stringHelperFunctions";

export function validateFields(inputs, rules) {
    let errors = {};
    map(inputs, (input, inputKey) => {
        if (rules[inputKey]) {
            let ruleTypes = rules[inputKey].split('|');
            map(ruleTypes, (ruleType, key) => {
                if (!errors[inputKey] && validate(ruleType, inputKey, input, inputs)) {
                    errors[inputKey] = validate(ruleType, inputKey, input, inputs);
                }
            })
        }

    });

    return {
        errors,
        isValid: isEmpty(errors)
    }
}

export function validate(rule, fieldName, field, inputs) {
    if (typeof field === 'undefined') {
        field = '';
    }
    let extractedRule = rule.split(':')[0];
    switch (extractedRule) {
        case 'required':
            if (!field) {
                return toCapitalizedWords(fieldName) + ' is required';
            }
            break;
        case 'min':
            let minAllowedLength = rule.split(':')[1];
            if (field.length < minAllowedLength) {
                return toCapitalizedWords(fieldName) + ' should have length of min ' + minAllowedLength + ' chars';
            }
            break;
        case 'email':
            if (!Validator.isEmail(field)) {
                return toCapitalizedWords(fieldName) + ' is invalid';
            }
            break;
        case 'lowercase':
            if (! /[a-z]/.test(field)) {
                return toCapitalizedWords(fieldName) + ' should have at least one Lowercase';
            }
            break;
        case 'uppercase':
            if (! /[A-Z]/.test(field)) {
                return toCapitalizedWords(fieldName) + ' should have at least one Uppercase';
            }
            break;
        case 'num':
            if (! /[0-9]/.test(field)) {
                return toCapitalizedWords(fieldName) + ' should have at least one Number';
            }
            break;
        case 'specialChar':
            if (! /[!@#\$%\^\&*\)\(+=._-]/.test(field)) {
                return toCapitalizedWords(fieldName) + ' should have at least one Special char';
            }
            break;
        case 'match':
            let matchField = rule.split(':')[1];
            if (field !== inputs[matchField]) {
                return toCapitalizedWords(matchField) + ' and ' + toCapitalizedWords(fieldName) + ' should match';
            }
            break;
        case 'max':
            let maxAllowedLength = rule.split(':')[1];
            if (field.length > maxAllowedLength) {
                return toCapitalizedWords(fieldName) + ' should have length of max ' + maxAllowedLength + ' chars';
            }
            break;
        default:
    }
}