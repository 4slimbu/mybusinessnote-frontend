import {
    SET_APP_SETTINGS,
    SET_BUSINESS,
    SET_BUSINESS_CATEGORIES,
    SET_BUSINESS_CATEGORY_ID,
    SET_BUSINESS_OPTION,
    SET_BUSINESS_OPTIONS,
    SET_BUSINESS_STATUS,
    SET_CURRENT,
    SET_CURRENT_TIP_CATEGORY, SET_EVENTS,
    SET_LEVELS,
    SET_SECTIONS,
    SET_SELL_GOODS,
    SET_TOOLTIP_CONTENT,
    SYNC_BUSINESS_STATUS
} from "../constants/actionTypes";
import {DEFAULT_APP_STATUS} from "../data/default";
import {findIndex, merge} from "lodash";
import {isItemLoaded} from "../utils/helper/helperFunctions";

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
        case SET_BUSINESS_OPTIONS:
            return {
                ...state,
                businessOptions: action.businessOptions
            };
        case SET_BUSINESS_STATUS:
            return {
                ...state,
                businessStatus: {
                    levelStatuses: [],
                    sectionStatuses: [],
                    businessOptionStatuses: []
                }
            };
        case SYNC_BUSINESS_STATUS:
            const levelStatuses = action.businessStatus.levelStatuses;
            const sectionStatuses = action.businessStatus.sectionStatuses;
            const businessOptionStatuses = action.businessStatus.businessOptionStatuses;

            // Merge Level Statuses
            if (isItemLoaded(levelStatuses) && levelStatuses.length > 0) {
                for (let i = 0; i < levelStatuses.length; i++) {
                    const levelIndex = findIndex(state.businessStatus.levelStatuses, {id: levelStatuses[i].id});

                    if (levelIndex >= 0) {
                        state = {
                            ...state,
                            businessStatus: {
                                ...state.businessStatus,
                                levelStatuses: [
                                    ...state.businessStatus.levelStatuses.slice(0, levelIndex),
                                    merge(state.businessStatus.levelStatuses[levelIndex], levelStatuses[i]),
                                    ...state.businessStatus.levelStatuses.slice(levelIndex + 1)
                                ],

                            }
                        };
                    } else {
                        state = {
                            ...state,
                            businessStatus: {
                                ...state.businessStatus,
                                levelStatuses: [
                                    ...state.businessStatus.levelStatuses,
                                    levelStatuses[i]
                                ],

                            }
                        };
                    }
                }
            }

            // Merge Section statuses
            if (isItemLoaded(sectionStatuses) && sectionStatuses.length > 0) {
                for (let i = 0; i < sectionStatuses.length; i++) {
                    const sectionIndex = findIndex(state.businessStatus.sectionStatuses, {id: sectionStatuses[i].id});

                    if (sectionIndex >= 0) {
                        state = {
                            ...state,
                            businessStatus: {
                                ...state.businessStatus,
                                sectionStatuses: [
                                    ...state.businessStatus.sectionStatuses.slice(0, sectionIndex),
                                    merge(state.businessStatus.sectionStatuses[sectionIndex], sectionStatuses[i]),
                                    ...state.businessStatus.sectionStatuses.slice(sectionIndex + 1)
                                ],

                            }
                        };
                    } else {
                        state = {
                            ...state,
                            businessStatus: {
                                ...state.businessStatus,
                                sectionStatuses: [
                                    ...state.businessStatus.sectionStatuses,
                                    sectionStatuses[i]
                                ],

                            }
                        };
                    }
                }
            }

            // Merge Business Option statuses
            if (isItemLoaded(businessOptionStatuses) && businessOptionStatuses.length > 0) {
                for (let i = 0; i < businessOptionStatuses.length; i++) {
                    const businessOptionIndex = findIndex(state.businessStatus.businessOptionStatuses, {id: businessOptionStatuses[i].id});

                    if (businessOptionIndex >= 0) {
                        state = {
                            ...state,
                            businessStatus: {
                                ...state.businessStatus,
                                businessOptionStatuses: [
                                    ...state.businessStatus.businessOptionStatuses.slice(0, businessOptionIndex),
                                    merge(state.businessStatus.businessOptionStatuses[businessOptionIndex], businessOptionStatuses[i]),
                                    ...state.businessStatus.businessOptionStatuses.slice(businessOptionIndex + 1)
                                ],

                            }
                        };
                    } else {
                        state = {
                            ...state,
                            businessStatus: {
                                ...state.businessStatus,
                                businessOptionStatuses: [
                                    ...state.businessStatus.businessOptionStatuses,
                                    businessOptionStatuses[i]
                                ],

                            }
                        };
                    }
                }
            }

            return state;


        case SET_CURRENT :
            const currentLevel = (action.current.level && state.currentLevel && state.currentLevel.id === action.current.level.id) ?
                merge(state.currentLevel, action.current.level.id)
                : action.current.level;
            const currentSection = (action.current.section && state.currentSection && state.currentSection.id === action.current.section.id) ?
                merge(state.currentSection, action.current.section)
                : action.current.section;
            const currentBusinessOption = (action.current.businessOption && state.currentBusinessOption && state.currentBusinessOption.id === action.current.businessOption.id) ?
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
            const index = findIndex(state.businessOptions, {id: action.businessOption.id});
            if (index >= 0) {
                return {
                    ...state,
                    currentBusinessOption: action.businessOption,
                    businessOptions: [
                        ...state.businessOptions.slice(0, index),
                        action.businessOption,
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
                business: {
                    ...state.business,
                    sell_goods: action.sell_goods
                }
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
        case SET_EVENTS :
            return {
                ...state,
                events: action.events
            };
        case SET_APP_SETTINGS :
            return {
                ...state,
                appSettings: action.settings
            };
        default:
            return state;
    }
}