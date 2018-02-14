import Validator from "validator";
import isEmpty from "lodash/isEmpty";

export function validateCreateBusiness(data) {
    let errors = {};

    if (data.business_name === '' || data.business_name === null || Validator.isEmpty(data.business_name)) {
        errors.business_name = ["Business Name field is required"];
    }

    if ((data.business_name !== '' || data.business_name !== null) && ! (/(ftp|http|https):\/\/(\w+:{0,1}\w*@)?(\S+)(:[0-9]+)?(\/|\/([\w#!:.?+=&%@!\-\/]))?/.test(data.website)) ) {
        errors.website = ["Website field is invalid"];
    }

    if (data.website === '' || data.website === null || Validator.isEmpty(data.website)) {
        errors.website = ["Website field is required"];
    }


    return {
        errors,
        isValid: isEmpty(errors)
    }
}


export function validateRegisterBusiness(data) {
    let errors = {};

    if (! (/^\(?(\d{4})\)?[- ]?(\d{4})[- ]?(\d{4})$/.test(data.abn)) ) {
        errors.abn = ["ABN field is invalid"];
    }

    if (data.abn === '' || data.abn === null || Validator.isEmpty(data.abn)) {
        errors.abn = ["ABN field is required"];
    }

    return {
        errors,
        isValid: isEmpty(errors)
    }
}
