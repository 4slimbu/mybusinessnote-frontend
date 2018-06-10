import setAuthorizationToken from "../utils/axios/setAuthorizationToken";
import {SET_AUTH} from "../constants/actionTypes";
import {setBusinessStatus} from "./appStatusAction";
import {makeRequest} from "./requestAction";
import request from "../services/request";
import {addFlashMessage} from "./flashMessageAction";
import {getCodeMessage} from "../utils/helper/helperFunctions";
import {MESSAGES} from "../constants/messages";

export function setAuth(payload) {
    return {
        type: SET_AUTH,
        payload
    }
}

export function logout() {
    return dispatch => {
        dispatch(makeRequest(request.Auth.logout, {}, { isSilent: true }));

        localStorage.removeItem("jwtToken");
        setAuthorizationToken(false);
        dispatch(setAuth({}));
        dispatch(setBusinessStatus({}));
        dispatch(addFlashMessage({type: "success", text: getCodeMessage(MESSAGES.LOGOUT_SUCCESS)}));
    }
}