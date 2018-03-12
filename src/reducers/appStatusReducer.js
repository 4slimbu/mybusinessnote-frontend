import {
    SET_BUSINESS,
    SET_BUSINESS_CATEGORIES,
    SET_BUSINESS_CATEGORY_ID,
    SET_BUSINESS_OPTION,
    SET_BUSINESS_STATUS,
    SET_COMPLETED_STATUS,
    SET_CURRENT,
    SET_CURRENT_TIP_CATEGORY,
    SET_LEVELS,
    SET_SECTIONS,
    SET_SELL_GOODS,
    SET_SHOW_COMPLETED_PAGE,
    SET_TOOLTIP_CONTENT
} from "../constants/actionTypes";
import {DEFAULT_APP_STATUS} from "../data/default";
import {findIndex, merge} from "lodash";

export default (state = DEFAULT_APP_STATUS, action = {}) => {
    switch (action.type) {
        case SET_LEVELS:
            return {
                ...state,
                levels: action.levels
            };
        case SET_SECTIONS:
            return {
                ...state,
                sections: action.sections
            };
        case SET_BUSINESS_STATUS:
            return {
                ...state,
                businessStatus: action.businessStatus
            };
        case SET_CURRENT :
            const currentLevel = (action.current.level && state.currentLevel.id === action.current.level.id) ?
                merge(state.currentLevel, action.current.level.id)
                : action.current.level;
            const currentSection = (action.current.section && state.currentSection.id === action.current.section.id) ?
                merge(state.currentSection, action.current.section)
                : action.current.section;
            const currentBusinessOption = (action.current.businessOption && state.currentBusinessOption.id === action.current.businessOption.id) ?
                merge(state.currentBusinessOption, action.current.businessOption)
                : action.current.businessOption;

            return {
                ...state,
                currentLevel: currentLevel,
                currentSection: currentSection,
                currentBusinessOption: currentBusinessOption
            };
        case SET_BUSINESS :
            const business = (state.business.id === action.business.id) ?
                merge(state.business, action.business)
                : action.business;
            return {
                ...state,
                business: business
            };
        case SET_BUSINESS_CATEGORIES :
            return {
                ...state,
                businessCategories: action.businessCategories
            };
        case SET_BUSINESS_OPTION :
            const businessOption = (action.businessOption && state.currentBusinessOption && state.currentBusinessOption.id === action.businessOption.id) ?
                merge(state.currentBusinessOption, action.businessOption)
                : action.businessOption;
            const index = findIndex(state.businessOptions, {id: action.businessOption.id});
            if (index >= 0) {
                return {
                    ...state,
                    currentBusinessOption: businessOption,
                    businessOptions: [
                        ...state.businessOptions.slice(0, index),
                        merge(state.businessOptions[index], action.businessOption),
                        ...state.businessOptions.slice(index + 1)
                    ]

                };
            } else {
                return {
                    ...state,
                    currentBusinessOption: action.businessOption,
                    businessOptions: [
                        ...state.businessOptions,
                        action.businessOption
                    ]
                };
            }

        case SET_BUSINESS_CATEGORY_ID :
            return {
                ...state,
                business: {
                    ...state.business,
                    business_category_id: action.business_category_id
                }
            };
        case SET_SELL_GOODS :
            return {
                ...state,
                sell_goods: action.sell_goods
            };
        case SET_CURRENT_TIP_CATEGORY :
            return {
                ...state,
                currentTipCategoryId: action.currentTipCategoryId
            };
        case SET_TOOLTIP_CONTENT :
            return {
                ...state,
                toolTip: action.toolTip
            };
        case SET_SHOW_COMPLETED_PAGE :
            return {
                ...state,
                showCompletedPage: action.showCompletedPage
            };
        case SET_COMPLETED_STATUS :
            return {
                ...state,
                completed_status: action.completedStatus
            };
        default:
            return state;
    }
}