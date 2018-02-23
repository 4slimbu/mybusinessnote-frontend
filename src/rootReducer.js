import {combineReducers} from "redux";
import flashMessageReducer from "./services/reducers/flashMessageReducer";
import authReducer from "./services/reducers/authReducer";
import appStatusReducer from "./services/reducers/appStatusReducer";

export default combineReducers({
    authReducer,
    appStatusReducer,
    flashMessageReducer
});