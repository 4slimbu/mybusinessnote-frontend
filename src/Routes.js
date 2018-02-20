import React from "react";
import {Route, Switch} from "react-router-dom";
import PageNotFound from "./components/error-page/PageNotFound";
import LoginPage from "./components/login/LoginPage";
import LevelPage from "./components/level/LevelPage";
import SectionPage from "./components/section/SectionPage";
import LevelCompletePage from "./components/level/LevelCompletePage";
import HomePage from "./components/home/HomePage";

export default () => {
    return (
        <Switch>
            {/*<Route exact path="/" render={() => { return <Redirect to="/level/getting-started" /> }}/>*/}
            <Route exact path="/" component={HomePage} />
            <Route path='/login/oauth/:driver/callback' exact component={LoginPage} />
            <Route path="/login" component={LoginPage}/>
            <Route path="/:url/not-found" component={PageNotFound}/>
            <Route path='/level/:level' exact component={LevelPage} />
            <Route path='/level/:level/complete' exact component={LevelCompletePage} />
            <Route path='/level/:level/section/:section' exact component={SectionPage} />
            <Route path='/level/:level/section/:section/bo/:businessOption' exact component={SectionPage} />
            <Route component={PageNotFound}/>
        </Switch>
    )
}
