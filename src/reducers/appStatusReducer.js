import {
    GET_APP_STATUS, GET_BUSINESS_CATEGORIES, GET_BUSINESS_OPTION, SET_APP_STATUS, SET_BUSINESS_CATEGORY_ID,
    SET_COMPLETED_STATUS, SET_CURRENT,
    SET_CURRENT_BUSINESS_CATEGORY_ID,
    SET_CURRENT_BUSINESS_OPTION,
    SET_CURRENT_LEVEL, SET_CURRENT_SECTION, SET_CURRENT_TIP_CATEGORY, SET_SELL_GOODS, SET_SHOW_COMPLETED_PAGE,
    SET_TOOLTIP_CONTENT
} from "../constants/action-types";
import {DEFAULT_APP_STATUS} from "../data/default";

export default (state = DEFAULT_APP_STATUS, action = {}) => {
    switch(action.type) {
        case `${GET_APP_STATUS}_PENDING` :
            return {
                ...state,
                isFetching: true,
            };
        case `${GET_APP_STATUS}_FULFILLED` :
            return {
                ...state,
                ...action.payload,
                isFetching: false,
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
        case `${GET_BUSINESS_OPTION}_PENDING` :
            return {
                ...state,
                isFetching: true
            };
        case `${GET_BUSINESS_OPTION}_FULFILLED` :
            if (action.payload.level && action.payload.section && action.payload.levels) {
                return {
                    ...state,
                    isFetching: false,
                    currentBusinessOption: action.payload,
                    currentLevel: action.payload.level,
                    currentSection: action.payload.section,
                    levels: action.payload.levels
                };
            } else {
                return {
                    ...state,
                    isFetching: false,
                    currentBusinessOption: action.payload
                };
            }

        case `${SET_CURRENT_BUSINESS_OPTION}` :
            if (action.currentBusinessOption.level && action.currentBusinessOption.section && action.currentBusinessOption.levels) {
                return {
                    ...state,
                    isFetching: false,
                    currentBusinessOption: action.currentBusinessOption,
                    currentLevel: action.currentBusinessOption.level,
                    currentSection: action.currentBusinessOption.section,
                    levels: action.currentBusinessOption.levels
                };
            } else {
                return {
                    ...state,
                    isFetching: false,
                    currentBusinessOption: action.currentBusinessOption
                };
            }
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
        case `${SET_TOOLTIP_CONTENT}` :
            return {
                ...state,
                toolTip: action.toolTip
            };
        case `${SET_SHOW_COMPLETED_PAGE}` :
            return {
                ...state,
                showCompletedPage: action.showCompletedPage
            };
        case `${SET_COMPLETED_STATUS}` :
            return {
                ...state,
                completed_status: action.completedStatus
            };
        default: return state;
    }
}