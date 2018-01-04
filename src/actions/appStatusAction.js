import {
    GET_APP_STATUS, GET_BUSINESS_CATEGORIES, GET_BUSINESS_OPTION, SET_APP_STATUS, SET_BUSINESS_CATEGORY_ID, SET_CURRENT,
    SET_CURRENT_BUSINESS_CATEGORY_ID,
    SET_CURRENT_LEVEL, SET_CURRENT_SECTION, SET_CURRENT_TIP_CATEGORY, SET_SELL_GOODS
} from "./types";
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

export function getBusinessOption(levelId, sectionId, currentBusinessOptionId) {
    const identifier = (currentBusinessOptionId) ? currentBusinessOptionId : 'first';
    const url = API_BASE_URL + "/levels/" + levelId + "/sections/" + sectionId + "/business-options/" + identifier;
    return {
        type: GET_BUSINESS_OPTION,
        payload: new Promise((resolve, reject) => {
            axios({
                method: "GET",
                url: url,
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

export function getBusinessOptionFromUrl(url) {
    return {
        type: GET_BUSINESS_OPTION,
        payload: new Promise((resolve, reject) => {
            axios({
                method: "GET",
                url: API_BASE_URL + url,
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

export function setCurrent(level, section, businessOption) {

    return {
        type: SET_CURRENT,
        current: {
            level: level,
            section: section,
            businessOption: businessOption
        }
    }
}

export function setCurrentLevel(currentLevel) {
    return {
        type: SET_CURRENT_LEVEL,
        currentLevel
    }
}

export function setCurrentSection(currentSection) {
    return {
        type: SET_CURRENT_SECTION,
        currentSection
    }
}

export function getBusinessCategories() {
    return {
        type: GET_BUSINESS_CATEGORIES,
        payload: new Promise((resolve, reject) => {
            axios({
                method: "GET",
                url: API_BASE_URL + "/business-categories",
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


export function setBusinessCategoryId(id) {
    return {
        type: SET_BUSINESS_CATEGORY_ID,
        business_category_id: id
    }
}

export function setSellGoods(bool) {
    return {
        type: SET_SELL_GOODS,
        sell_goods: bool
    }
}

export function setCurrentTipCategory(id) {
    return {
        type: SET_CURRENT_TIP_CATEGORY,
        currentTipCategoryId: id
    }
}