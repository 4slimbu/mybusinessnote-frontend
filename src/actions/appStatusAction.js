import {
    GET_APP_STATUS, GET_BUSINESS_CATEGORIES, GET_BUSINESS_OPTION, SET_APP_STATUS, SET_APP_STATUS_REDUCER, SET_BUSINESS,
    SET_BUSINESS_CATEGORIES,
    SET_BUSINESS_CATEGORY_ID,
    SET_BUSINESS_META, SET_BUSINESS_OPTION, SET_BUSINESS_OPTIONS, SET_BUSINESS_STATUS, SET_COMPLETED_STATUS,
    SET_CURRENT,
    SET_CURRENT_BUSINESS_OPTION,
    SET_CURRENT_LEVEL, SET_CURRENT_SECTION, SET_CURRENT_TIP_CATEGORY, SET_IS_FETCHING, SET_LEVEL, SET_LEVELS,
    SET_SECTION, SET_SECTIONS,
    SET_SELL_GOODS,
    SET_SHOW_COMPLETED_PAGE,
    SET_TOOLTIP_CONTENT, TRACK_AFFILIATE_LINK_CLICK
} from "../constants/actionTypes";
import * as axios from "axios";
import {getApiUrlFromAppUrl} from "../utils/helper/helperFunctions";

export function setAppStatusReducer(state) {
    return {
        type: SET_APP_STATUS_REDUCER,
        state
    }
}

export function getAppStatus() {
    return {
        type: GET_APP_STATUS,
        payload: new Promise((resolve, reject) => {
            axios({
                method: "GET",
                url: process.env.REACT_APP_API_BASE_URL + "/user/business-status",
                crossDomain: true,
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                },
            }).then(response => {
                resolve(response.data)
            });
        })
    }
}

export function getBusinessOption(location, apiLocation = false) {
    //set url to provided location
    let url = process.env.REACT_APP_API_BASE_URL + location;
    //if provided url isn't api-location then use it to get api location and set it to url
    if (!apiLocation) {
        let apiUrl = getApiUrlFromAppUrl(location);
        url = process.env.REACT_APP_API_BASE_URL + apiUrl;
    }

    return {
        type: GET_BUSINESS_OPTION,
        payload: new Promise((resolve, reject) => {
            axios({
                method: "GET",
                url: url,
                crossDomain: true,
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                },
            }).then(response => {
                resolve(response.data)
            });
        })
    }
}

export function getBusinessOptionFromAppUrl(query = '') {
    return {
        type: GET_BUSINESS_OPTION,
        payload: new Promise((resolve, reject) => {
            axios({
                method: "GET",
                url: process.env.REACT_APP_API_BASE_URL + '/business-option?' + query,
                crossDomain: true,
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                },
            }).then(response => {
                resolve(response.data)
            });
        })
    }
}

export function getBusinessOptionFromUrl(url, query = '') {
    return {
        type: GET_BUSINESS_OPTION,
        payload: new Promise((resolve, reject) => {
            axios({
                method: "GET",
                url: process.env.REACT_APP_API_BASE_URL + url + query,
                crossDomain: true,
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
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

export function setBusinessStatus(businessStatus) {
    return {
        type: SET_BUSINESS_STATUS,
        businessStatus
    }
}

export function setLevels(levels) {
    return {
        type: SET_LEVELS,
        levels
    }
}

export function setSections(sections) {
    return {
        type: SET_SECTIONS,
        sections
    }
}

export function setBusinessOptions(businessOptions) {
    return {
        type: SET_BUSINESS_OPTIONS,
        businessOptions
    }
}

export function setLevel(level) {
    return {
        type: SET_LEVEL,
        level
    }
}

export function setSection(section) {
    return {
        type: SET_SECTION,
        section
    }
}

export function setBusinessOption(businessOption) {
    return {
        type: SET_BUSINESS_OPTION,
        businessOption
    }
}

export function setBusiness(business) {
    return {
        type: SET_BUSINESS,
        business
    }
}

export function setBusinessCategories(businessCategories) {
    return {
        type: SET_BUSINESS_CATEGORIES,
        businessCategories
    }
}

export function setCurrent(level = {}, section = {}, businessOption = {}) {
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

export function setCurrentBusinessOption(currentBusinessOption) {
    return {
        type: SET_CURRENT_BUSINESS_OPTION,
        currentBusinessOption
    }
}

export function getBusinessCategories() {
    return {
        type: GET_BUSINESS_CATEGORIES,
        payload: new Promise((resolve, reject) => {
            axios({
                method: "GET",
                url: process.env.REACT_APP_API_BASE_URL + "/business-categories",
                crossDomain: true,
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
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

export function setBusinessMeta(metaData) {
    return {
        type: SET_BUSINESS_META,
        metaData
    }
}

export function setToolTipContent(toolTip) {
    return {
        type: SET_TOOLTIP_CONTENT,
        toolTip
    }
}

export function setShowCompletedPage(showCompletedPage) {
    return {
        type: SET_SHOW_COMPLETED_PAGE,
        showCompletedPage
    }
}

export function setCompletedStatus(completedStatus) {
    return {
        type: SET_COMPLETED_STATUS,
        completedStatus
    }
}

export function trackClick(boId, affId) {
    return {
        type: TRACK_AFFILIATE_LINK_CLICK,
        payload: new Promise((resolve, reject) => {
            axios({
                method: "GET",
                url: process.env.REACT_APP_API_BASE_URL + '/click?bo_id=' + boId + '&aff_id=' + affId,
                crossDomain: true,
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                },
            }).then(response => {
                resolve(response.data)
            });
        })
    }
}