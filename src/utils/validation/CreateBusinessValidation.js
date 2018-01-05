import Validator from "validator";
import isEmpty from "lodash/isEmpty";

export function validateCreateBusiness(data) {
    let errors = {};

    if (Validator.isEmpty(data.business_name)) {
        errors.business_name = ["Business Name field is required"];
    }

    if (! (/(ftp|http|https):\/\/(\w+:{0,1}\w*@)?(\S+)(:[0-9]+)?(\/|\/([\w#!:.?+=&%@!\-\/]))?/.test(data.website)) ) {
        errors.website = ["Website field is invalid"];
    }

    if (Validator.isEmpty(data.website)) {
        errors.website = ["Website field is required"];
    }


    return {
        errors,
        isValid: isEmpty(errors)
    }
}
