import React from "react";
import {Redirect, Route, Switch} from "react-router-dom";
import PageNotFound from "./components/error-page/PageNotFound";
import LoginPage from "./components/login/LoginPage";
import NewEventPage from "./components/events/NewEventPage";
import requireAuth from "./utils/requireAuth";
import HomePage from "./components/home/HomePage";
import LevelPage from "./components/level/LevelPage";
import SectionPage from "./components/section/SectionPage";
import BusinessOptionPage from "./components/business-option/BusinessOptionPage";
import LevelCompletePage from "./components/level/LevelCompletePage";

export default (childProps) => {
    const { isAuthenticated } = childProps;
    return (
        <Switch>
            <Route exact path="/" render={() => { return <Redirect to="/level/1" /> }}/>
            <Route path='/level/:level' exact component={LevelPage} props={childProps} />
            <Route path='/level/:level/complete' exact component={LevelCompletePage} props={childProps} />
            <Route path='/level/:level/section/:section' exact component={SectionPage} props={childProps} />
            <Route path='/level/:level/section/:section/business-options/:businessOption' exact component={BusinessOptionPage} props={childProps} />
            <Route path="/login" component={LoginPage}/>
            <Route path="/new-event" component={requireAuth(NewEventPage)} />
            <Route component={PageNotFound}/>
        </Switch>
    )
}
