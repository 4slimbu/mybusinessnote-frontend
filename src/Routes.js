import React from "react";
import {Route, Switch} from "react-router-dom";
import PageNotFound from "./views/error-page/PageNotFound";
import LoginPage from "./views/login/LoginPage";
import LevelPage from "./views/level/LevelPage";
import SectionPage from "./views/section/SectionPage";
import LevelCompletePage from "./views/level/LevelCompletePage";
import HomePageContainer from "./views/home/HomePageContainer";

export default () => {
    return (
        <Switch>
            {/*<Route exact path="/" render={() => { return <Redirect to="/level/getting-started" /> }}/>*/}
            <Route exact path="/" component={HomePageContainer} />
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
