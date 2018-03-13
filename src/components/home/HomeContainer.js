import React, {Component} from "react";
import {withRouter} from "react-router-dom";
import {connect} from "react-redux";
import {
    generateAppRelativeUrl, getAllUrlParams, getById, getFirstDoableBusinessOption,
    getLast, isItemLoaded
} from "../../utils/helper/helperFunctions";
import WelcomePage from "./pages/WelcomePage";
import GuestPage from "./pages/GuestPage";
import EmailVerificationPage from "./pages/EmailVerificationPage";
import {ROUTES} from "../../constants/routes";
import {setCurrent} from "../../actions/appStatusAction";
import request from "../../services/request";
import {makeRequest} from "../../actions/requestAction";

class HomeContainer extends Component {
    constructor(props) {
        super(props);
        this.state = {
            showVerifyLink: false,
            email_verification_token: ''
        };

        this.onClickStart = this.onClickStart.bind(this);
        this.onClickContinueJourney = this.onClickContinueJourney.bind(this);
        this.onVerifyAccount = this.onVerifyAccount.bind(this);
        this.onSendVerificationEmail = this.onSendVerificationEmail.bind(this);
    }

    componentDidMount() {
        // get verification token from url if exist
        if (getAllUrlParams(this.props.location.search).email_verification_token) {
            this.setState({
                showVerifyLink: true,
                email_verification_token: getAllUrlParams(this.props.location.search).email_verification_token
            })
        }
        // reset current level, section and business option
        this.props.setCurrent();
    }

    onClickStart(e) {
        e.preventDefault();
        const {history} = this.props;
        history.push(ROUTES.LEVEL_ONE);
    };

    onClickContinueJourney(e) {
        e.preventDefault();
        const {levels, sections, businessOptions} = this.props.appStatus;
        const firstDoableBusinessOption = getFirstDoableBusinessOption(businessOptions);

        if (isItemLoaded(firstDoableBusinessOption)) {
            const currentLevel = getById(levels, firstDoableBusinessOption.level_id);
            const currentSection = getById(sections, firstDoableBusinessOption.section_id);

            this.props.history.push(generateAppRelativeUrl(currentLevel.slug, currentSection.slug, firstDoableBusinessOption.id));
        } else {
            this.props.history.push(ROUTES.LEVEL_ONE);
        }

    }

    onVerifyAccount(e) {
        e.preventDefault();

        this.props.makeRequest(request.Auth.verifyEmail, {
            email_verification_token: this.state.email_verification_token
        }).then(
            (response) => {
                this.props.history.push(ROUTES.HOME);
            }
        );
    }

    onSendVerificationEmail(e) {
        e.preventDefault();
        this.props.makeRequest(request.Auth.sendVerificationEmail);
    };

    render() {
        const {auth, appStatus} = this.props;

        const welcomePageProps = {
            onClickStart: this.onClickStart,
            onClickContinueJourney: this.onClickContinueJourney
        };

        const guestPageProps = {
            onClickStart: this.onClickStart
        };

        const emailVerificationPageProps = {
            showVerifyLink: this.state.showVerifyLink,
            onVerifyAccount: this.onVerifyAccount,
            onSendVerificationEmail: this.onSendVerificationEmail,
        };

        return (
            auth.isAuthenticated ?
                (
                    (auth.isVerified) ?
                        <WelcomePage {...welcomePageProps}/> :
                        <EmailVerificationPage {...emailVerificationPageProps}/>
                )
                : <GuestPage {...guestPageProps}/>
        );
    }
}

function mapStateToProps(state) {
    return {
        auth: state.authReducer,
        appStatus: state.appStatusReducer
    }
}


export default withRouter(connect(mapStateToProps, {
    setCurrent,
    makeRequest,
})(HomeContainer));