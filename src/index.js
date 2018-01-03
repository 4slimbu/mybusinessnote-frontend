import React from "react";
import ReactDOM from "react-dom";
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

const store = createStore(
    rootReducer,
    compose(
        applyMiddleware(thunk, logger, promise()),
        window.devToolsExtension ? window.devToolsExtension() : f => f
    )
);

if (localStorage.getItem("jwtToken")) {
    setAuthorizationToken(localStorage.getItem("jwtToken"));
    store.dispatch(setCurrentUser(jwt_decode(localStorage.getItem("jwtToken"))));
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

