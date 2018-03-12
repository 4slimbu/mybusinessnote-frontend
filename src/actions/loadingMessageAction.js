import {ADD_LOADING_MESSAGE, DELETE_LOADING_MESSAGE} from "../constants/actionTypes";

export function addLoadingMessage(loadingMessage = null) {
    return {
        type: ADD_LOADING_MESSAGE,
        loadingMessage
    }
}

export function deleteLoadingMessage() {
    return {
        type: DELETE_LOADING_MESSAGE
    }
}