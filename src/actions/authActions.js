import setAuthorizationToken from "../utils/axios/setAuthorizationToken";
import {SET_AUTH, SET_CURRENT_USER} from "../constants/actionTypes";
import {setBusinessStatus} from "./appStatusAction";
import {makeRequest} from "./requestAction";
import request from "../services/request";

export function setAuth(payload) {
    return {
        type: SET_AUTH,
        payload
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
        dispatch(makeRequest(request.Auth.logout)).then(
            (response) => {
                localStorage.removeItem("jwtToken");
                setAuthorizationToken(false);
                dispatch(setAuth({}));
                dispatch(setBusinessStatus({}));
            },
            (error) => {
            }
        );
    }
}