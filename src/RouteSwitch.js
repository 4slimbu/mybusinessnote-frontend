import React from "react";
import {Route, Switch} from "react-router-dom";
import PageNotFound from "./components/error-page/PageNotFound";
import LevelPage from "./components/level/LevelContainer";
import SectionPage from "./components/section/SectionPage";
import LevelCompletePage from "./components/level/pages/LevelCompletePage";
import HomeContainer from "./components/home/HomeContainer";
import LoginContainer from "./components/login/LoginContainer";
import ForgotPasswordContainer from "./components/forgot-password/ForgotPasswordContainer";
import {ROUTES} from "./constants/routes";

const RouteSwitch = () => {
    return (
        <Switch>
            {/*<Route exact path="/" render={() => { return <Redirect to="/level/getting-started" /> }}/>*/}
            <Route exact path="/" component={HomeContainer} />
            <Route path='/login/oauth/:driver/callback' exact component={LoginContainer} />
            <Route path={ROUTES.FORGOT_PASSWORD} component={ForgotPasswordContainer}/>
            <Route path="/login" component={LoginContainer}/>
            <Route path="/:url/not-found" component={PageNotFound}/>
            <Route path='/level/:level' exact component={LevelPage} />
            <Route path='/level/:level/complete' exact component={LevelCompletePage} />
            <Route path='/level/:level/section/:section' exact component={SectionPage} />
            <Route path='/level/:level/section/:section/bo/:businessOption' exact component={SectionPage} />
            <Route component={PageNotFound}/>
        </Switch>
    )
};

export default RouteSwitch;
