import Validator from "validator";
import isEmpty from "lodash/isEmpty";

export function validateCreateUser(data) {
    let errors = {};


    if ((typeof data.first_name === 'string') && Validator.isEmpty(data.first_name)) {
        errors.first_name = "First Name field is required";
    }

    if ((typeof data.last_name === 'string') && Validator.isEmpty(data.last_name)) {
        errors.last_name = "Last Name field is required";
    }

    if ((typeof data.email === 'string') && Validator.isEmpty(data.email)) {
        errors.email = "Email field is required";
    }

    if ((typeof data.email === 'string') && !Validator.isEmail(data.email)) {
        errors.email = "Email is invalid";
    }

    if ((typeof data.phone_number === 'string') && ! (/^\(?(\d{2})\)?[- ]?(\d{4})[- ]?(\d{4})$/.test(data.phone_number)) ) {
        errors.phone_number = "Phone Number field is invalid";
    }

    if ((typeof data.phone_number === 'string') && Validator.isEmpty(data.phone_number)) {
        errors.phone_number = "Phone Number field is required";
    }

    if ((typeof data.password === 'string') && ! (/^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{8,20}$/.test(data.password)) ) {
        errors.password = "Password is invalid";
    }

    if ((typeof data.password === 'string') && Validator.isEmpty(data.password)) {
        errors.password = "Password field is required";
    }

    if ((typeof data.confirm_password === 'string') && Validator.isEmpty(data.confirm_password)) {
        errors.confirm_password = "Confirm Password field is required";
    }

    if ((typeof data.password === 'string' && typeof data.confirm_password === 'string') && !Validator.equals(data.password, data.confirm_password)) {
        errors.confirm_password = "Password and Confirm Password must match";
    }

    if (typeof data.captcha_response === 'undefined' || ((typeof data.captcha_response === 'string') && Validator.isEmpty(data.captcha_response))) {
        errors.captcha_response = "Please verify that you are human";
    }

    return {
        errors,
        isValid: isEmpty(errors)
    }
}

export function validateUpdateUser(data) {
    let errors = {};

    if ((typeof data.first_name === 'string') && Validator.isEmpty(data.first_name)) {
        errors.first_name = "First Name field is required";
    }

    if ((typeof data.last_name === 'string') && Validator.isEmpty(data.last_name)) {
        errors.last_name = "Last Name field is required";
    }

    if ((typeof data.phone_number === 'string') && ! (/^\(?(\d{2})\)?[- ]?(\d{4})[- ]?(\d{4})$/.test(data.phone_number)) ) {
        errors.phone_number = "Phone Number field is invalid";
    }

    if ((typeof data.phone_number === 'string') && Validator.isEmpty(data.phone_number)) {
        errors.phone_number = "Phone Number field is required";
    }

    if ((typeof data.password === 'string') && data.password !== '' &&  ! (/^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{8,20}$/.test(data.password)) ) {
        errors.password = "Password is invalid";
    }

    if ((typeof data.password === 'string') && data.password !== '' && Validator.isEmpty(data.password)) {
        errors.password = "Password field is required";
    }

    if ((typeof data.password === 'string') && data.password !== '' &&
        (typeof data.confirm_password === 'string') && Validator.isEmpty(data.confirm_password)) {
        errors.confirm_password = "Confirm Password field is required";
    }

    if ((typeof data.password === 'string') && data.password !== '' &&
        (typeof data.confirm_password === 'string') && !Validator.equals(data.password, data.confirm_password)) {
        errors.confirm_password = "Password and Confirm Password must match";
    }


    return {
        errors,
        isValid: isEmpty(errors)
    }
}

export function validateEmail(email) {
    let errors = {};

    if (!Validator.isEmail(email)) {
        errors.email = "Email is invalid";
    }

    if (Validator.isEmpty(email)) {
        errors.email = "Email field is required";
    }

    return {
        errors,
        isValid: isEmpty(errors)
    }
}

export function validateUpdatePassword(data) {
    let errors = {};

    if ((typeof data.forgot_password_token === 'string') && Validator.isEmpty(data.forgot_password_token)) {
        errors.forgot_password_token = "Reset Code field is required";
    }

    if ((typeof data.password === 'string') && ! (/^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{8,20}$/.test(data.password)) ) {
        errors.password = "Password must be more than 8 chars and include at least one number and one special character";
    }

    if ((typeof data.password === 'string') && Validator.isEmpty(data.password)) {
        errors.password = "Password field is required";
    }

    if ((typeof data.confirm_password === 'string') && Validator.isEmpty(data.confirm_password)) {
        errors.confirm_password = "Confirm Password field is required";
    }

    if ((typeof data.password === 'string' && typeof data.confirm_password === 'string') && !Validator.equals(data.password, data.confirm_password)) {
        errors.confirm_password = "Password and Confirm Password must match";
    }

    return {
        errors,
        isValid: isEmpty(errors)
    }
}