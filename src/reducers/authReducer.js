import {LOGIN, SET_AUTH, SET_CURRENT_USER} from "../constants/actionTypes";
import {isEmpty} from "lodash";

const initialState = {
    isAuthenticated: false,
    user: {}
};

export default (state = initialState, action = {}) => {
    const isVerified = action.user ? action.user.verified : 0;
    switch(action.type) {
        case `${LOGIN}_PENDING`:
            return {
                ...state,
                isFetching: true
            };
        case `${LOGIN}_FULFILLED`:
            return {
                ...state,
                isFetching: false
            };
        case `${LOGIN}_REJECTED`:
            return {
                ...state,
                isFetching: false
            };
        case SET_CURRENT_USER :
            return {
                isAuthenticated: !isEmpty(action.user),
                isVerified: isVerified,
                user: action.user
            };
        case SET_AUTH:
            return {
                isAuthenticated: !isEmpty(action.user),
                isVerified: action.user.verified,
                user: action.user
            };
        default: return state;
    }
}