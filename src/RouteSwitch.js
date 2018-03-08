import React from "react";
import {Route, Switch} from "react-router-dom";
import PageNotFound from "./components/error-page/PageNotFound";
import LevelPage from "./components/level/LevelContainer";
import SectionPage from "./components/section/SectionPage";
import LevelCompletePage from "./components/level/pages/LevelCompletePage";
import HomeContainer from "./components/home/HomeContainer";
import LoginContainer from "./components/login/LoginContainer";
import ForgotPasswordContainer from "./components/forgot-password/ForgotPasswordContainer";
import requireAuth from "./utils/requireAuth";

const RouteSwitch = () => {
    return (
        <Switch>
            <Route exact path="/" component={HomeContainer}/>
            <Route path='/login/oauth/:driver/callback' exact component={LoginContainer}/>
            <Route path='/login/forgot-password' component={ForgotPasswordContainer}/>
            <Route path="/login" component={LoginContainer}/>
            <Route path='/level/:level' exact component={LevelPage}/>
            <Route path='/level/:level/complete' exact component={LevelCompletePage}/>
            <Route path='/level/:level/section/:section' exact component={requireAuth(SectionPage)}/>
            <Route path='/level/:level/section/:section/bo/:businessOption' exact component={SectionPage}/>
            <Route component={PageNotFound}/>
        </Switch>
    )
};

export default RouteSwitch;
