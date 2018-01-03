import {GET_APP_STATUS, SET_APP_STATUS, SET_CURRENT_LEVEL} from "./types";
import * as axios from "axios";
import {API_BASE_URL} from "../config";

export function getAppStatus() {
    return {
        type: GET_APP_STATUS,
        payload: new Promise((resolve, reject) => {
            axios({
                method: "GET",
                url: API_BASE_URL + "/user/business-status",
                crossDomain: true,
                headers: {
                    'Content-Type': 'application/json',
                },
            }).then(response => {
                resolve(response.data)
            });
        })
    }
}

export function setAppStatus(appStatus) {
    return {
        type: SET_APP_STATUS,
        appStatus
    }
}

export function setCurrentLevel(currentLevel) {
    return {
        type: SET_CURRENT_LEVEL,
        currentLevel
    }
}