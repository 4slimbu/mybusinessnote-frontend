import * as axios from "axios";
import setAuthorizationToken from "../utils/axios/setAuthorizationToken";
import {SET_CURRENT_USER} from "../constants/actionTypes";
import {getAppStatus, setAppStatus} from "./appStatusAction";
import {addFlashMessage} from "./flashMessageAction";
import {DEFAULT_APP_STATUS} from "../data/default";

export function sendForgotPasswordEmail(userData) {
    return dispatch => {
        return axios({
            method: "POST",
            url: process.env.REACT_APP_API_BASE_URL + "/user/send-forgot-password-email",
            data: userData,
            crossDomain: true,
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
        });
    }
}

export function updateUserPassword(userData) {
    return dispatch => {
        return axios({
            method: "POST",
            url: process.env.REACT_APP_API_BASE_URL + "/user/update-password",
            data: userData,
            crossDomain: true,
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
        });
    }
}

export function sendVerificationEmail() {
    return dispatch => {
        return axios({
            method: "GET",
            url: process.env.REACT_APP_API_BASE_URL + "/user/send-verification-email",
            crossDomain: true,
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
        });
    }
}

export function verifyEmail(userData) {
    return dispatch => {
        return axios({
            method: "POST",
            url: process.env.REACT_APP_API_BASE_URL + "/user/verify-email",
            data: userData,
            crossDomain: true,
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
        });
    }
}

export function loginSocialUser(url) {
    return dispatch => {
        //register user using axios
        return axios({
            method: "GET",
            url: process.env.REACT_APP_API_BASE_URL + url,
            crossDomain: true,
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
        });
    }
}

export function setCurrentUser(user) {
    return {
        type: SET_CURRENT_USER,
        user
    }
}

export function logout() {
    return dispatch => {
        localStorage.removeItem("jwtToken");
        setAuthorizationToken(false);
        dispatch(setCurrentUser({}));
        dispatch(setAppStatus(DEFAULT_APP_STATUS));
        dispatch(getAppStatus());
        dispatch(addFlashMessage({
            type: "success",
            text: "You have logged out successfully!"
        }));
    }
}