import {combineReducers} from "redux";
import flashMessageReducer from "./reducers/flashMessageReducer";
import authReducer from "./reducers/authReducer";
import levelReducer from "./reducers/levelReducer";

export default combineReducers({
    authReducer,
    levelReducer,
    flashMessageReducer
});