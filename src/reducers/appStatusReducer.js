import {GET_APP_STATUS, SET_CURRENT_LEVEL} from "../actions/types";
import {DEFAULT_APP_STATUS} from "../data/default";

export default (state = DEFAULT_APP_STATUS, action = {}) => {
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