import {GET_APP_STATUS, SET_CURRENT_LEVEL} from "../actions/types";

const initialState = {
    business_id: null,
    user_id: null,
    business_category_id: null,
    business_name: null,
    levels: [{slug: "" }],
    defaultLevel: {},
    previousLevel: {},
    currentLevel: {},
    nextLevel: {},
    previousSection: {},
    currentSection: {},
    nextSection: {},
    previousBusinessOption: {},
    currentBusinessOption: {},
    nextBusinessOption: {}
};

export default (state = initialState, action = {}) => {
    switch(action.type) {
        case `${GET_APP_STATUS}_FULFILLED` :
            return {
                ...state,
                ...action.payload,
                currentLevel: action.payload.levels[0]
            };
        case `${SET_CURRENT_LEVEL}` :
            return {
                ...state,
                currentLevel: action.currentLevel
            };
        default: return state;
    }
}