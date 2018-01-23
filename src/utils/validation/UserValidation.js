import Validator from "validator";
import isEmpty from "lodash/isEmpty";

export function validateCreateUser(data) {
    let errors = {};

    console.log('validate create user: data', data);

    if ((typeof data.first_name === 'string') && Validator.isEmpty(data.first_name)) {
        console.log('validate create user: data.first_name', data.first_name);
        errors.first_name = "First Name field is required";
    }

    if ((typeof data.last_name === 'string') && Validator.isEmpty(data.last_name)) {
        console.log('validate create user: data.last_name', data.last_name);
        errors.last_name = "Last Name field is required";
    }

    if ((typeof data.email === 'string') && Validator.isEmpty(data.email)) {
        console.log('validate create user: data.email', data.email);
        errors.email = "Email field is required";
    }

    if ((typeof data.email === 'string') && !Validator.isEmail(data.email)) {
        console.log('validate create user: data.email', data.email);
        errors.email = "Email is invalid";
    }

    if ((typeof data.phone_number === 'string') && ! (/^\(?(\d{2})\)?[- ]?(\d{4})[- ]?(\d{4})$/.test(data.phone_number)) ) {
        console.log('validate create user: data.phone_number', data.phone_number);
        errors.phone_number = "Phone Number field is invalid";
    }

    if ((typeof data.phone_number === 'string') && Validator.isEmpty(data.phone_number)) {
        console.log('validate create user: data.phone_number', data.phone_number);
        errors.phone_number = "Phone Number field is required";
    }

    if ((typeof data.password === 'string') && ! (/^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{8,20}$/.test(data.password)) ) {
        console.log('validate create user: data.password', data.phone_number);
        errors.password = "Password is invalid";
    }

    if ((typeof data.password === 'string') && Validator.isEmpty(data.password)) {
        console.log('validate create user: data.password', data.password);
        errors.password = "Password field is required";
    }

    if ((typeof data.confirm_password === 'string') && Validator.isEmpty(data.confirm_password)) {
        console.log('validate create user: data.confirm_password', data.phone_number);
        errors.confirm_password = "Confirm Password field is required";
    }

    if ((typeof data.password === 'string' && typeof data.confirm_password === 'string') && !Validator.equals(data.password, data.confirm_password)) {
        console.log('validate create user: data.confirm_password', data.confirm_password);
        errors.confirm_password = "Password and Confirm Password must match";
    }

    // if (Validator.isEmpty(data.timezone)) {
    //     errors.timezone = "Timezone field is required"];
    // }

    console.log('errors', errors);

    return {
        errors,
        isValid: isEmpty(errors)
    }
}

export function validateUpdateUser(data) {
    let errors = {};
    console.log('validate update user: data', data);

    if ((typeof data.first_name === 'string') && Validator.isEmpty(data.first_name)) {
        console.log('validate update user: first_name', data.first_name);
        errors.first_name = "First Name field is required";
    }

    if ((typeof data.last_name === 'string') && Validator.isEmpty(data.last_name)) {
        console.log('validate update user: last_name', data.last_name);
        errors.last_name = "Last Name field is required";
    }

    if ((typeof data.phone_number === 'string') && ! (/^\(?(\d{2})\)?[- ]?(\d{4})[- ]?(\d{4})$/.test(data.phone_number)) ) {
        console.log('validate update user: phone_number', data.phone_number);
        errors.phone_number = "Phone Number field is invalid";
    }

    if ((typeof data.phone_number === 'string') && Validator.isEmpty(data.phone_number)) {
        console.log('validate update user: phone_number', data.phone_number);
        errors.phone_number = "Phone Number field is required";
    }

    if ((typeof data.password === 'string') && data.password !== '' &&  ! (/^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{8,20}$/.test(data.password)) ) {
        console.log('validate update user: password', data.password);
        errors.password = "Password is invalid";
    }

    if ((typeof data.password === 'string') && data.password !== '' && Validator.isEmpty(data.password)) {
        console.log('validate update user: password', data.password);
        errors.password = "Password field is required";
    }

    if ((typeof data.password === 'string') && data.password !== '' &&
        (typeof data.confirm_password === 'string') && Validator.isEmpty(data.confirm_password)) {
        console.log('validate update user: confirm_password', data.confirm_password);
        errors.confirm_password = "Confirm Password field is required";
    }

    if ((typeof data.password === 'string') && data.password !== '' &&
        (typeof data.confirm_password === 'string') && !Validator.equals(data.password, data.confirm_password)) {
        console.log('validate update user: confirm_password', data.confirm_password);
        errors.confirm_password = "Password and Confirm Password must match";
    }

    console.log('errors', errors);

    return {
        errors,
        isValid: isEmpty(errors)
    }
}

export function validateEmail(email) {
    let errors = {};

    if (Validator.isEmpty(email)) {
        errors.email = "Email field is required";
    }

    if (!Validator.isEmail(email)) {
        errors.email = "Email is invalid";
    }

    return {
        errors,
        isValid: isEmpty(errors)
    }
}