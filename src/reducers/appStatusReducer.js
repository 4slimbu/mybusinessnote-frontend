import {
    GET_APP_STATUS, GET_BUSINESS_CATEGORIES, GET_BUSINESS_OPTION, SET_APP_STATUS, SET_BUSINESS_CATEGORY_ID, SET_CURRENT,
    SET_CURRENT_BUSINESS_CATEGORY_ID,
    SET_CURRENT_BUSINESS_OPTION,
    SET_CURRENT_LEVEL, SET_CURRENT_SECTION, SET_CURRENT_TIP_CATEGORY, SET_SELL_GOODS
} from "../actions/types";
import {DEFAULT_APP_STATUS} from "../data/default";

export default (state = DEFAULT_APP_STATUS, action = {}) => {
    switch(action.type) {
        case `${GET_APP_STATUS}_FULFILLED` :
            return {
                ...state,
                ...action.payload,
                currentLevel: action.payload.levels[0]
            };
        case `${SET_APP_STATUS}` :
            return {
                ...state,
                ...action.appStatus
            };
        case `${SET_CURRENT}` :
            return {
                ...state,
                currentLevel: action.current.level,
                currentSection: action.current.section,
                currentBusinessOption: action.current.businessOption
            };
        case `${SET_CURRENT_LEVEL}` :
            return {
                ...state,
                currentLevel: action.currentLevel
            };
        case `${SET_CURRENT_SECTION}` :
            return {
                ...state,
                currentSection: action.currentSection
            };
        case `${GET_BUSINESS_OPTION}_FULFILLED` :
            return {
                ...state,
                currentBusinessOption: action.payload
            };
        case `${SET_CURRENT_BUSINESS_OPTION}` :
            return {
                ...state,
                currentBusinessOption: action.businessOption
            };
        case `${GET_BUSINESS_CATEGORIES}_FULFILLED` :
            return {
                ...state,
                businessCategories: action.payload
            };
        case `${SET_BUSINESS_CATEGORY_ID}` :
            return {
                ...state,
                business_category_id: action.business_category_id
            };
        case `${SET_SELL_GOODS}` :
            return {
                ...state,
                sell_goods: action.sell_goods
            };
        case `${SET_CURRENT_TIP_CATEGORY}` :
            return {
                ...state,
                currentTipCategoryId: action.currentTipCategoryId
            };
        default: return state;
    }
}