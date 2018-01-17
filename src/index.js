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
import {logger} from "redux-logger";
import promise from "redux-promise-middleware";
import {DEFAULT_APP_STATUS} from "./data/default";
import {setAppStatus} from "./actions/appStatusAction";
// import registerObserver from "react-perf-devtool";

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

if (localStorage.getItem("jwtToken")) {
    const decodedToken = jwt_decode(localStorage.getItem("jwtToken"));
    if (decodedToken.exp > (new Date().getTime() / 1000)) {
        setAuthorizationToken(localStorage.getItem("jwtToken"));
        store.dispatch(setCurrentUser(jwt_decode(localStorage.getItem("jwtToken")).user));

    } else {
        localStorage.removeItem("jwtToken");
        setAuthorizationToken(false);
        store.dispatch(setCurrentUser({}));
        store.dispatch(setAppStatus(DEFAULT_APP_STATUS));
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

