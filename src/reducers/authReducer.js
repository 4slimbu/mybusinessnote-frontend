import {SET_CURRENT_USER} from "../constants/action-types";
import {isEmpty} from "lodash";

const initialState = {
    isAuthenticated: false,
    user: {}
};

export default (state = initialState, action = {}) => {
    const isVerified = action.user ? action.user.verified : 0;
    switch(action.type) {
        case SET_CURRENT_USER :
            return {
                isAuthenticated: !isEmpty(action.user),
                isVerified: isVerified,
                user: action.user
            };
        default: return state;
    }
}