import setAuthorizationToken from "../utils/axios/setAuthorizationToken";
import jwt_decode from "jwt-decode";
import {
    setBusiness,
    setBusinessCategories,
    setBusinessOption,
    setBusinessOptions,
    syncBusinessStatus,
    setLevel,
    setLevels,
    setSection,
    setSections, setEvents
} from "./appStatusAction";
import {addFlashMessage} from "./flashMessageAction";
import {logout, setAuth} from "./authActions";
import {getCodeMessage} from "../utils/helper/helperFunctions";
import {MESSAGES} from "../constants/messages";
import {addLoadingMessage, deleteLoadingMessage} from "./loadingMessageAction";


export function makeRequest(apiCallFunction, data = {}, options={isSilent: false, message: 'Loading...'}) {
    return dispatch => {
        if (! options.isSilent) dispatch(addLoadingMessage(options.message));
        return new Promise((resolve, reject) => {

            apiCallFunction(data).then(
                (response) => {
                    if (! options.isSilent) dispatch(deleteLoadingMessage());
                    if (response && response.data) {
                        handleSuccessResponseData(dispatch, response.data);
                        resolve(response.data);
                    }
                },
                (error) => {
                    if (! options.isSilent) dispatch(deleteLoadingMessage());
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

    if (responseData.levels) dispatch(setLevels(responseData.levels));

    if (responseData.sections) dispatch(setSections(responseData.sections));

    if (responseData.businessOptions) dispatch(setBusinessOptions(responseData.businessOptions));

    if (responseData.level) dispatch(setLevel(responseData.level));

    if (responseData.section) dispatch(setSection(responseData.section));

    if (responseData.businessOption) dispatch(setBusinessOption(responseData.businessOption));

    if (responseData.businessStatus) dispatch(syncBusinessStatus(responseData.businessStatus));

    if (responseData.business) dispatch(setBusiness(responseData.business));

    if (responseData.businessCategories) dispatch(setBusinessCategories(responseData.businessCategories));

    if (responseData.events) dispatch(setEvents(responseData.events));

    if (responseData.successCode && responseData.successCode !== 'FETCHED') {
        dispatch(addFlashMessage({type: "success", text: getCodeMessage(responseData.successCode)}))
    }
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
