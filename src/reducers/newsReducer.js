import {DEFAULT_NEWS_LIST} from "../data/default";
import {SET_NEWS} from "../constants/actionTypes";

export default (state = DEFAULT_NEWS_LIST, action = {}) => {
    switch (action.type) {
        case `${SET_NEWS}` :
            return {
                ...state,
                [action.newsData.tag]: action.newsData.news
            };
        default:
            return state;
    }
}