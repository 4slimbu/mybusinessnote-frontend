import * as axios from "axios";
import {API_BASE_URL} from "../config";

export function saveBusinessFormRequest(data, url) {
    return dispatch => {
        //create business using axios
        return axios({
            method: "PUT",
            url: API_BASE_URL + url,
            data: data,
            crossDomain: true,
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
        });
    }
}

export function saveBusinessOptionFormRequest(data) {
    return dispatch => {
        //create business using axios
        return axios({
            method: "POST",
            url: API_BASE_URL + '/business-option',
            data: data,
            crossDomain: true,
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
        });
    }
}