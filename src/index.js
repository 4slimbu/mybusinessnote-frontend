import React from "react";
import ReactDOM from "react-dom";
import {BrowserRouter as Router} from "react-router-dom";
import {Provider} from "react-redux";
import {applyMiddleware, compose, createStore} from "redux";
import thunk from "redux-thunk";
import promise from "redux-promise-middleware";
import jwt_decode from "jwt-decode";
import "malihu-custom-scrollbar-plugin";
import "jquery-mousewheel";

import App from "./components/App";
import rootReducer from "./rootReducer";
import setAuthorizationToken from "./utils/axios/setAuthorizationToken";
import {setAuth} from "./actions/authActions";
import {getAllUrlParams} from "./utils/helper/helperFunctions";

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
            store.dispatch(setAuth(decodedToken));
        } else {
            localStorage.removeItem("jwtToken");
            setAuthorizationToken(false);
            store.dispatch(setAuth({}));
        }
    } catch (err) {
        localStorage.removeItem("jwtToken");
        setAuthorizationToken(false);
        store.dispatch(setAuth({}));
    }
}

ReactDOM.render(
    <Provider store={store}>
        <Router basename={`${process.env.PUBLIC_URL}`}>
            <App/>
        </Router>
    </Provider>
    ,
    document.getElementById("root")
);

