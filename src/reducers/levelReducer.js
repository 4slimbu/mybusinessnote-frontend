import {SET_LEVELS} from "../actions/types";

const initialState = {
    levels: {}
};

export default (state = initialState, action = {}) => {
    switch(action.type) {
        case SET_LEVELS :
            return {
                levels: action.levels
            };
        default: return state;
    }
}