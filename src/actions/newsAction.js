import {SET_NEWS} from "../constants/actionTypes";

export function setNews(newsData) {
    return {
        type: SET_NEWS,
        newsData
    }
}