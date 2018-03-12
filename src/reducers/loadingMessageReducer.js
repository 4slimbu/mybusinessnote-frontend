import {ADD_LOADING_MESSAGE, DELETE_LOADING_MESSAGE} from "../constants/actionTypes";

export default (state = [], action = {}) => {
    switch (action.type) {

        case ADD_LOADING_MESSAGE:
            return {
                isLoading: true,
                loadingMessage: action.loadingMessage
            };

        case DELETE_LOADING_MESSAGE:
            return {
                isLoading: false,
                loadingMessage: null
            };

        default:
            return state;
    }
}