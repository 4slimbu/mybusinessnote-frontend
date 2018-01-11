import * as axios from "axios";
import {API_BASE_URL} from "../config";

export function userSignUpFormRequest(userData) {
    return dispatch => {
        //register user using axios
        return axios({
            method: "POST",
            url: API_BASE_URL + '/entry-business-option',
            data: userData,
            crossDomain: true,
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
        });
    }
}

export function userUpdateRequest(userData, url) {
    return dispatch => {
        //register user using axios
        return axios({
            method: "PUT",
            url: API_BASE_URL + url,
            data: userData,
            crossDomain: true,
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
        });
    }
}

export function doesUserExists(identifier) {
    return dispatch => {
        return axios({
            method:"POST",
            url: API_BASE_URL + "/user/check-if-exists",
            data: {"email" : identifier},
            crossDomain: true,
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            }
        });
    }
}