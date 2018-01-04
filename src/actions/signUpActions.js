import * as axios from "axios";

export function userSignUpFormRequest(userData) {
    return dispatch => {
        //register user using axios
        return axios({
            method: "POST",
            url: "http://mbj.dev/api/user/register",
            data: userData,
            crossDomain: true,
            headers: {
                'Content-Type': 'application/json',
            },
        });
    }
}

export function doesUserExists(identifier) {
    return dispatch => {
        return axios({
            method:"POST",
            url: "http://mbj.dev/api/user/check-if-exists",
            data: {"email" : identifier},
            crossDomain: true,
            headers: {
                'Content-Type': 'application/json'
            }
        });
    }
}