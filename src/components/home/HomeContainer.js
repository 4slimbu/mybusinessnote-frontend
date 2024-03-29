import React, {Component} from "react";
import {withRouter} from "react-router-dom";
import {connect} from "react-redux";
import {
    filterFirstInCollection,
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
import {MESSAGES} from "../../constants/messages";

class HomeContainer extends Component {
    constructor(props) {
        super(props);
        this.state = {
            showVerifyLink: false,
            email_verification_token: ''
        };

        this.onClickStart = this.onClickStart.bind(this);
        this.onClickContinueNote = this.onClickContinueNote.bind(this);
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

    onClickContinueNote(e) {
        e.preventDefault();
        const {levels, sections, businessStatus} = this.props.appStatus;
        const firstUnlockedBusinessOption = filterFirstInCollection(businessStatus.businessOptionStatuses, {status: "unlocked"});
        const firstSkippedBusinessOption = filterFirstInCollection(businessStatus.businessOptionStatuses, {status: "skipped"});

        let firstDoableBusinessOption;
        if (firstUnlockedBusinessOption ) {
            let firstUnlockedBusinessOptionLevel = getById(levels, firstUnlockedBusinessOption.level_id);

            if (firstUnlockedBusinessOptionLevel && firstUnlockedBusinessOptionLevel.is_active && ! firstUnlockedBusinessOptionLevel.is_down) {
                firstDoableBusinessOption = firstUnlockedBusinessOption;
            } else if (firstSkippedBusinessOption) {
                let firstSkippedBusinessOptionLevel = getById(levels, firstSkippedBusinessOption.level_id);

                if (firstSkippedBusinessOptionLevel && firstSkippedBusinessOptionLevel.is_active && ! firstSkippedBusinessOptionLevel.is_down) {
                    firstDoableBusinessOption = firstSkippedBusinessOption;
                }
            }
        } else if (firstSkippedBusinessOption) {
            let firstSkippedBusinessOptionLevel = getById(levels, firstSkippedBusinessOption.level_id);

            if (firstSkippedBusinessOptionLevel.is_active && ! firstSkippedBusinessOptionLevel.is_down) {
                firstDoableBusinessOption = firstSkippedBusinessOption;
            }
        }

        if (isItemLoaded(firstDoableBusinessOption)) {
            const currentLevel = getById(levels, firstDoableBusinessOption.level_id);
            const currentSection = getById(sections, firstDoableBusinessOption.section_id);

            if ( currentLevel && currentSection && currentLevel.is_active && !currentLevel.is_down) {
                this.props.history.push(generateAppRelativeUrl(currentLevel.slug, currentSection.slug, firstDoableBusinessOption.id));
            } else {
                this.props.history.push(ROUTES.LEVEL_ONE);
            }
        } else {
            this.props.history.push(ROUTES.LEVEL_ONE);
        }

    }

    onVerifyAccount(e) {
        e.preventDefault();

        this.props.makeRequest(request.Auth.verifyEmail, {
            email_verification_token: this.state.email_verification_token
        }, {message: MESSAGES.VERIFYING}).then(
            (response) => {
                this.props.history.push(ROUTES.ADD_BUSINESS_DETAILS);
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
            onClickContinueNote: this.onClickContinueNote
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