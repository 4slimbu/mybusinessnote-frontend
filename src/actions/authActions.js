import * as axios from "axios";
import setAuthorizationToken from "../utils/setAuthorizationToken";
import jwt_decode from "jwt-decode";
import {SET_CURRENT_USER} from "./types";
import {setAppStatus} from "./appStatusAction";
import {DEFAULT_APP_STATUS} from "../data/default";

export function userLoginFormRequest(userData) {
    return dispatch => {
        //register user using axios
        return axios({
            method: "POST",
            url: "http://mbj.dev/api/user/login",
            data: userData,
            crossDomain: true,
            headers: {
                'Content-Type': 'application/json',
            },
        }).then(res => {
            const token = res.data.token;
            localStorage.setItem("jwtToken", token);
            setAuthorizationToken(token);
            dispatch(setCurrentUser(jwt_decode(token).user));
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
    }
}