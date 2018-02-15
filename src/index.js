import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import {BrowserRouter as Router} from "react-router-dom";
import App from "./components/App";
import {Provider} from "react-redux";
import {applyMiddleware, compose, createStore} from "redux";
import thunk from "redux-thunk";
import rootReducer from "./rootReducer";
import setAuthorizationToken from "./utils/setAuthorizationToken";
import {setCurrentUser} from "./actions/authActions";
import jwt_decode from "jwt-decode";
import promise from "redux-promise-middleware";
import {DEFAULT_APP_STATUS} from "./data/default";
import {getAppStatus, setAppStatus} from "./actions/appStatusAction";
import {getAllUrlParams} from "./components/navigation/helperFunctions";

// monitor react component performance
// registerObserver();

const store = createStore(
    rootReducer,
    compose(
        // applyMiddleware(thunk, logger, promise()),
        applyMiddleware(thunk, promise()),
        window.devToolsExtension ? window.devToolsExtension() : f => f
    )
);

//set jwt token to local storage if it is present in url param
let token = getAllUrlParams(window.location.href).token;
if (token) {
    localStorage.setItem("jwtToken", token);
}

//check if jwtToken exist in local storage and is valid
if (localStorage.getItem("jwtToken")) {
    try {
        const decodedToken = jwt_decode(localStorage.getItem("jwtToken"));
        if (decodedToken.exp > (new Date().getTime() / 1000)) {
            setAuthorizationToken(localStorage.getItem("jwtToken"));
            store.dispatch(setCurrentUser(jwt_decode(localStorage.getItem("jwtToken")).user));
        } else {
            localStorage.removeItem("jwtToken");
            setAuthorizationToken(false);
            store.dispatch(setCurrentUser({}));
            store.dispatch(setAppStatus(DEFAULT_APP_STATUS));
            store.dispatch(getAppStatus());
        }
    } catch (err) {
        localStorage.removeItem("jwtToken");
        setAuthorizationToken(false);
        store.dispatch(setCurrentUser({}));
        store.dispatch(setAppStatus(DEFAULT_APP_STATUS));
        store.dispatch(getAppStatus());
    }
}

ReactDOM.render(
    <Provider store={store}>
        <Router basename={`${process.env.REACT_APP_PUBLIC_URL}`}>
            <App/>
        </Router>
    </Provider>
    ,
    document.getElementById("root")
);

