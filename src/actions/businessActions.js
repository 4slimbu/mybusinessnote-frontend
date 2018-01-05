import * as axios from "axios";
import {API_BASE_URL} from "../config";

export function createBusinessFormRequest(data) {
    return dispatch => {
        //create business using axios
        return axios({
            method: "POST",
            url: API_BASE_URL + '/businesses',
            data: data,
            crossDomain: true,
            headers: {
                'Content-Type': 'application/json',
            },
        });
    }
}