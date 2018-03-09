import {
    GET_APP_STATUS, GET_BUSINESS_CATEGORIES, GET_BUSINESS_OPTION, SET_APP_STATUS, SET_BUSINESS,
    SET_BUSINESS_CATEGORY_ID,
    SET_BUSINESS_OPTION,
    SET_BUSINESS_STATUS,
    SET_COMPLETED_STATUS, SET_CURRENT,
    SET_CURRENT_BUSINESS_OPTION,
    SET_CURRENT_LEVEL, SET_CURRENT_SECTION, SET_CURRENT_TIP_CATEGORY, SET_IS_FETCHING, SET_LEVELS, SET_SELL_GOODS,
    SET_SHOW_COMPLETED_PAGE,
    SET_TOOLTIP_CONTENT
} from "../constants/actionTypes";
import {DEFAULT_APP_STATUS} from "../data/default";

export default (state = DEFAULT_APP_STATUS, action = {}) => {
    switch(action.type) {
        case `${SET_LEVELS}`:
            return {
                ...state,
                levels: action.levels
            };
        case `${SET_BUSINESS_STATUS}`:
            return {
                ...state,
                businessStatus: action.businessStatus
            };
        case `${GET_APP_STATUS}_PENDING` :
            return {
                ...state,
            };
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
        case `${SET_IS_FETCHING}` :
            return {
                ...state,
                isFetching: action.bool
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
        case `${SET_BUSINESS}` :
            return {
                ...state,
                business: action.business
            };
            break;
        case `${GET_BUSINESS_OPTION}_PENDING` :
            return {
                ...state,
            };
        case `${SET_BUSINESS_OPTION}` :
            if (action.businessOption) {
                return {
                    ...state,
                    currentBusinessOption: action.businessOption,
                };
            } else {
                return {
                    ...state,
                    currentBusinessOption: action.payload
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