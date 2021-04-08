//Form Validation Error Codes
export const MESSAGES = {
    // Loading Message
    LOADING_USER_CHECK: "Checking if user already exist...",
    UPDATING: "Updating...",
    SAVING: "Saving...",
    REFRESHING: "Refreshing...",
    REGISTERING: "Creating your account...",
    LOGGING: "Logging...",
    VERIFYING: "Verifying...",
    SENDING_EMAIL: "Sending email...",

    // Success Message
    LOGIN_SUCCESS: "Logged in successfully",
    LOGOUT_SUCCESS: "Logged out successfully",
    SAVED: "Saved",
    UPDATED: "Updated",
    VERIFIED: "User verified successfully",
    FORGOT_EMAIL_SENT: "Forgot password email sent",
    PASSWORD_UPDATED: "Password updated successfully",
    USER_REGISTERED: "Registered successfully",
    VERIFICATION_EMAIL_SENT: "Verification email sent",

    // Error Messages
    ERR_VALIDATION_FAILED: "Validation Failed",
    ERR_ABN_INVALID: "ABN is invalid",
    ERR_ABN_REQUIRED: "ABN is required",
    ERR_BUSINESS_NAME_REQUIRED: "Business name is required",
    ERR_EMAIL_ALREADY_EXIST: "User with given email is already registered",
    ERR_EMAIL_INVALID: "Invalid Email",
    ERR_EMAIL_REQUIRED: "Email is required",
    ERR_FIRST_NAME_REQUIRED: "First Name is required",
    ERR_LAST_NAME_REQUIRED: "Last Name is required",
    ERR_PASSWORD_CONFIRM_NOT_MATCHING: "Password and Confirm Password must match",
    ERR_PASSWORD_INVALID: "Password is invalid",
    ERR_PASSWORD_REQUIRED: "Password is required",
    ERR_PHONE_NUMBER_REQUIRED: "Phone Number is required",
    ERR_PHONE_NUMBER_INVALID: "Phone Number is invalid",
    ERR_URL_INVALID: "Url is invalid",
    ERR_URL_REQUIRED: "Url is required",

    //Login Error Codes
    ERR_INVALID_CREDENTIALS: "Invalid Credentials",
    ERR_TOKEN_EXPIRED: "User has been logged out due to inactivity",
    ERR_TOKEN_INVALID: "Token invalid",
    ERR_TOKEN_NOT_PROVIDED: "Token not provided",
    ERR_TOKEN_USER_NOT_FOUND: "User not found",

    //Page Error Codes
    ERR_INVALID_REQUEST: "Invalid Request",
    ERR_DATABASE: "Database error",
    ERR_MODEL_NOT_FOUND: "Couldn't find the user",
    ERR_METHOD_NOT_ALLOWED: "Request method not allowed",
    ERR_NOT_FOUND: "Couldn't find the page",
    ERR_RESTRICTED: "You don't have enough permission to view this page",
    ERR_MULTIPLE_BUSINESS: "You can't have multiple business",

    //Unknown Error Codes
    ERR_UNKNOWN: "Something went wrong",
    ERR_LOGOUT: "Failed to logout",
    ERR_LOCKED: "Locked",
};