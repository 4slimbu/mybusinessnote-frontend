import {SET_LEVELS} from "./types";
import * as axios from "axios";

export function getLevels() {
    return dispatch => {
        //register user using axios
        return axios({
            method: "GET",
            url: "http://mbj.dev/api/levels",
            crossDomain: true,
            headers: {
                'Content-Type': 'application/json',
            },
        }).then(response => {
            dispatch(setLevels(response.data));
        });
    }
}

export function setLevels(levels) {
    return {
        type: SET_LEVELS,
        levels
    }
}