import {SET_AUTH} from "../constants/actionTypes";
import {isEmpty} from "lodash";

const initialState = {
    isAuthenticated: false,
    user: {}
};

export default (state = initialState, action = {}) => {
    const user = action.payload && action.payload.user ? action.payload.user : {};
    const scope = action.payload && action.payload.scope ? action.payload.scope : {};
    const isVerified = user.verified ? user.verified : 0;
    switch (action.type) {
        case SET_AUTH:
            return {
                isAuthenticated: !isEmpty(user),
                isVerified: !!isVerified,
                user: user,
                scope: scope
            };
        default:
            return state;
    }
}