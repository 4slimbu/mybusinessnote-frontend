import setAuthorizationToken from "../utils/axios/setAuthorizationToken";
import jwt_decode from "jwt-decode";
import {getAppStatus, setBusinessOption, setBusinessStatus, setIsFetching, setLevels} from "./appStatusAction";
import {addFlashMessage} from "./flashMessageAction";
import {logout, setAuth} from "./authActions";
import {getCodeMessage} from "../utils/helper/helperFunctions";
import {MESSAGES} from "../constants/messages";

export function makeRequest(apiCallFunction, data = {}) {
    return dispatch => {
        dispatch(setIsFetching(true));
        return new Promise((resolve, reject) => {

            apiCallFunction(data).then(
                (response) => {
                    dispatch(setIsFetching(false));
                    if (response && response.data) {
                        handleSuccessResponseData(dispatch, response.data);
                        resolve(response.data);
                    }
                },
                (error) => {
                    dispatch(setIsFetching(false));
                    if (error && error.response && error.response.data) {
                        handleErrorResponseData(dispatch, error.response.data);
                        reject(error.response.data)
                    }
                }
            );

        });
    }
}

export function handleSuccessResponseData(dispatch, responseData) {
    const token = responseData.token;
    if (token) {
        localStorage.setItem("jwtToken", token);
        setAuthorizationToken(token);
        dispatch(setAuth(jwt_decode(token)));
    }

    if (responseData.levels) {
        dispatch(setLevels(responseData.levels));
    }

    if (responseData.businessStatus) {
        dispatch(setBusinessStatus(responseData.businessStatus));
    }

    if (responseData.businessOption) {
        dispatch(setBusinessOption(responseData.businessOption));
    }

    if (responseData.successCode && responseData.successCode !== 'RECEIVED') {
        dispatch(addFlashMessage({type: "success", text: getCodeMessage(responseData.successCode)}))
    }
    dispatch(getAppStatus());
}

export function handleErrorResponseData(dispatch, errorData) {
    if (errorData.errorCode) {
        if (
            getCodeMessage(errorData.errorCode) === MESSAGES.ERR_TOKEN_EXPIRED ||
            getCodeMessage(errorData.errorCode) === MESSAGES.ERR_TOKEN_INVALID ||
            getCodeMessage(errorData.errorCode) === MESSAGES.ERR_TOKEN_USER_NOT_FOUND
        ) {
            dispatch(logout());
        }

        dispatch(addFlashMessage({type: "error", text: getCodeMessage(errorData.errorCode)}));
    }
}
