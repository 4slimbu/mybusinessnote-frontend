import {GET_FIRST_BUSINESS_OPTION_USING_LEVEL} from "../actions/types";
import {DEFAULT_BUSINESS_OPTION} from "../data/default";

export default (state = DEFAULT_BUSINESS_OPTION, action = {}) => {
    switch(action.type) {
        case `${GET_FIRST_BUSINESS_OPTION_USING_LEVEL}_FULFILLED` :
            return {
                ...state,
                ...action.payload,
                currentBusinessOption: action.payload
            };
        default: return state;
    }
}