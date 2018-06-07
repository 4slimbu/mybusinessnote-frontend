import React from "react";
import {Route, Switch} from "react-router-dom";
import PageNotFound from "./components/error-page/PageNotFound";
import LevelContainer from "./components/level/LevelContainer";
import SectionContainer from "./components/section/SectionContainer";
import HomeContainer from "./components/home/HomeContainer";
import LoginContainer from "./components/login/LoginContainer";
import ForgotPasswordContainer from "./components/forgot-password/ForgotPasswordContainer";
import BusinessOptionContainer from "./components/business-option/BusinessOptionContainer";
import LevelCompletePage from "./components/level/pages/LevelCompletePage";
import SectionCompletePage from "./components/section/pages/SectionCompletePage";

const RouteSwitch = () => {
    return (
        <Switch>
            <Route exact path="/" component={HomeContainer}/>
            <Route path='/login/oauth/:driver/callback' exact component={LoginContainer}/>
            <Route path='/login/forgot-password' component={ForgotPasswordContainer}/>
            <Route path="/login" component={LoginContainer}/>
            <Route path='/level/:level/completed' exact component={LevelCompletePage}/>
            <Route path='/level/:level' exact component={LevelContainer}/>
            <Route path='/level/:level/section/:section/completed' exact component={SectionCompletePage}/>
            <Route path='/level/:level/section/:section' exact component={SectionContainer}/>
            <Route path='/level/:level/section/:section/bo/:businessOption' exact component={BusinessOptionContainer}/>
            <Route path='/level/:level/section/:section/bo/:businessOption/bo/:businessOption' exact component={BusinessOptionContainer}/>
            <Route path='/level/:level/section/:section/bo/:businessOption/bo/:businessOption/bo/:businessOption' exact component={BusinessOptionContainer}/>
            <Route component={PageNotFound}/>
        </Switch>
    )
};

export default RouteSwitch;
