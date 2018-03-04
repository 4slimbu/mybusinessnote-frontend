import setAuthorizationToken from "../utils/axios/setAuthorizationToken";
import jwt_decode from "jwt-decode";
import {getAppStatus, setIsFetching} from "./appStatusAction";
import {addFlashMessage} from "./flashMessageAction";
import {setCurrentUser} from "./authActions";
import {getCodeMessage} from "../utils/helper/helperFunctions";
import {MESSAGES} from "../constants/messages";

export function makeRequest(apiCallFunction, data) {
    return dispatch => {
        dispatch(setIsFetching(true));
        return new Promise((resolve, reject) => {

            apiCallFunction(data).then(
                (response) => {
                    dispatch(setIsFetching(false));
                    handleSuccessResponseData(dispatch, response.data);
                    resolve(response.data);
                },
                (error) => {
                    dispatch(setIsFetching(false));
                    handleErrorResponseData(dispatch, error.response.data);
                    reject(error.response.data)
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
        dispatch(setCurrentUser(jwt_decode(token).user));
        dispatch(addFlashMessage({type: "success", text: MESSAGES.LOGIN_SUCCESS}));
    }
    if (responseData.successCode) {
        dispatch(addFlashMessage({type: "success", text: getCodeMessage(responseData.successCode)}))
    }
    dispatch(getAppStatus());
}

export function handleErrorResponseData(dispatch, errorData) {
    dispatch(addFlashMessage({
        type: "error",
        text: getCodeMessage(errorData.errorCode)
    }));
}
