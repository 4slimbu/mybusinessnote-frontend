import Validator from "validator";
import isEmpty from "lodash/isEmpty";

export function validateInput(data) {
    let errors = {};

    if (Validator.isEmpty(data.first_name)) {
        errors.first_name = ["First Name field is required"];
    }

    if (Validator.isEmpty(data.last_name)) {
        errors.last_name = ["Last Name field is required"];
    }

    if (Validator.isEmpty(data.email)) {
        errors.email = ["Email field is required"];
    }

    if (!Validator.isEmail(data.email)) {
        errors.email = ["Email is invalid"];
    }

    if (! (/^\(?(\d{2})\)?[- ]?(\d{4})[- ]?(\d{4})$/.test(data.phone_number)) ) {
        errors.phone_number = ["Phone Number field is invalid"];
    }

    if (Validator.isEmpty(data.phone_number)) {
        errors.phone_number = ["Phone Number field is required"];
    }

    if (! (/^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{8,20}$/.test(data.password)) ) {
        errors.password = ["Password is invalid"];
    }

    if (Validator.isEmpty(data.password)) {
        errors.password = ["Password field is required"];
    }

    if (Validator.isEmpty(data.confirm_password)) {
        errors.confirm_password = ["Confirm Password field is required"];
    }

    if (!Validator.equals(data.password, data.confirm_password)) {
        errors.confirm_password = ["Password and Confirm Password must match"];
    }

    // if (Validator.isEmpty(data.timezone)) {
    //     errors.timezone = ["Timezone field is required"];
    // }

    return {
        errors,
        isValid: isEmpty(errors)
    }
}

export function validateEmail(email) {
    let errors = {};

    if (Validator.isEmpty(email)) {
        errors.email = ["Email field is required"];
    }

    if (!Validator.isEmail(email)) {
        errors.email = ["Email is invalid"];
    }

    return {
        errors,
        isValid: isEmpty(errors)
    }
}