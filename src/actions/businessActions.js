import * as axios from "axios";

export function saveBusinessFormRequest(data, url) {
    return dispatch => {
        //create business using axios
        return axios({
            method: "POST",
            url: process.env.REACT_APP_API_BASE_URL + url,
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
            url: process.env.REACT_APP_API_BASE_URL + '/business-option',
            data: data,
            crossDomain: true,
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
        });
    }
}