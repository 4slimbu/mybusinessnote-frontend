import React from "react";
import {Redirect, Route, Switch} from "react-router-dom";
import PageNotFound from "./components/error-page/PageNotFound";
import LoginPage from "./components/login/LoginPage";
import NewEventPage from "./components/events/NewEventPage";
import requireAuth from "./utils/requireAuth";
import LevelPage from "./components/level/LevelPage";
import SectionPage from "./components/section/SectionPage";
import BusinessOptionPage from "./components/business-option/BusinessOptionPage";
import LevelCompletePage from "./components/level/LevelCompletePage";

export default () => {
    return (
        <Switch>
            <Route exact path="/" render={() => { return <Redirect to="/level/getting-started" /> }}/>
            <Route path="/login" component={LoginPage}/>
            <Route path="/new-event" component={requireAuth(NewEventPage)} />
            <Route path="/:url/not-found" component={PageNotFound}/>
            <Route path='/level/:level' exact component={LevelPage} />
            <Route path='/level/:level/complete' exact component={LevelCompletePage} />
            <Route path='/level/:level/section/:section' exact component={SectionPage} />
            <Route path='/level/:level/section/:section/business-option/:businessOption' exact component={BusinessOptionPage} />
            <Route component={PageNotFound}/>
        </Switch>
    )
}
