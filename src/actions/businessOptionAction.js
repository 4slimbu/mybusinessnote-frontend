import {GET_APP_STATUS} from "./types";
import * as axios from "axios";
import {API_BASE_URL} from "../config";

export function getFirstBusinessOptionUsingLevel(currentLevel) {
    const levelId = currentLevel.id;
    const sectionId = currentLevel.sections[0].id;
    return {
        type: GET_APP_STATUS,
        payload: new Promise((resolve, reject) => {
            axios({
                method: "GET",
                url: API_BASE_URL + "/levels/" + levelId + "/sections/" + sectionId + "/business-options/first",
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