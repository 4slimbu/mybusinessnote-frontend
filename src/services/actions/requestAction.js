import * as axios from "axios";
import setAuthorizationToken from "../../utils/axios/setAuthorizationToken";
import jwt_decode from "jwt-decode";
import {getAppStatus} from "./appStatusAction";
import {addFlashMessage} from "./flashMessageAction";
import {setCurrentUser} from "./authActions";
import {MESSAGES} from "../../constants/messages";
import {getEnv, getErrorCodeMessage} from "../../utils/helper/helperFunctions";

export function postRequest(url, userData) {
    if (getEnv('ENV') === 'mock-api') {
        //mock data
    } else {
        return dispatch => {
            //register user using axios
            return axios({
                method: "POST",
                url: url,
                data: userData,
                crossDomain: true,
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                },
            });
        }
    }
}

export function handleSuccessResponse(responseData) {
    return dispatch => {
        const token = responseData.token;
        if (token) {
            localStorage.setItem("jwtToken", token);
            setAuthorizationToken(token);
            dispatch(setCurrentUser(jwt_decode(token).user));
            dispatch(addFlashMessage({type: "success", text: MESSAGES.LOGIN_SUCCESS
            }))
        }
        dispatch(getAppStatus());
    }
}

export function handleErrorResponse(errorData) {
    return dispatch => {
        dispatch(addFlashMessage({
            type: "error",
            text: getErrorCodeMessage(errorData.errorCode)
        }));
    }

}
