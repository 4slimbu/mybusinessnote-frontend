import {combineReducers} from "redux";
import flashMessageReducer from "./reducers/flashMessageReducer";
import authReducer from "./reducers/authReducer";
import appStatusReducer from "./reducers/appStatusReducer";
import newsReducer from "./reducers/newsReducer";

export default combineReducers({
    authReducer,
    appStatusReducer,
    flashMessageReducer,
    newsReducer,
});