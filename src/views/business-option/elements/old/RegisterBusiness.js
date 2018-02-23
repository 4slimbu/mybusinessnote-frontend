import React, {Component} from 'react';
import PropTypes from "prop-types";
import {connect} from "react-redux";
import {addFlashMessage} from "../../../../services/actions/flashMessageAction";
import {
    getAppStatus, getBusinessOption, getBusinessOptionFromUrl, setCompletedStatus, setCurrentBusinessOption,
    setCurrentLevel,
    setCurrentSection,
    setShowCompletedPage, trackClick
} from "../../../../services/actions/appStatusAction";
import jwt_decode from "jwt-decode";
import setAuthorizationToken from "../../../../utils/axios/setAuthorizationToken";
import TextFieldGroup from "../../../common/TextFieldGroup";
import {saveBusinessFormRequest} from "../../../../services/actions/businessActions";
import {withRouter} from "react-router-dom";
import {validateRegisterBusiness} from "../../../../utils/validation/BusinessValidation";

class RegisterBusiness extends Component {
    constructor(props) {
        super(props);
        this.state = {
            type: "update_business",
            business_id: null,
            abn: "sdfds",
            errors: {},
            isLoading: false
        };
        this.onChange = this.onChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
    }

    componentDidMount() {
        this.setState({
            business_option_id: this.props.appStatus.currentBusinessOption.id,
            business_id: this.props.appStatus.business_id,
            abn: this.props.appStatus.abn,
        });
    }

    componentWillReceiveProps() {
        this.setState({
            business_option_id: this.props.appStatus.currentBusinessOption.id,
            business_id: this.props.appStatus.business_id,
            abn: this.props.appStatus.abn,
        });
    }

    onChange(e) {
        this.setState({
            [e.target.name]: e.target.value
        });
    }

    isFormValid(data = null) {
        let input = (data) ? data : this.state;
        const { errors, isValid } = validateRegisterBusiness(input);

        if(! isValid) {
            this.setState({ errors });
        }

        return isValid;
    }

    onSubmit(e) {
        e.preventDefault();
        const appStatus = this.props.appStatus;
        if (this.isFormValid()) {
            this.setState({
                errors: {},
                isLoading: true,
            });

            if (!appStatus.user_id || !appStatus.business_id) {
                this.props.addFlashMessage({
                    type: "error",
                    text: "You need to create an account before creating business"
                });
                return;
            }

            this.props.saveBusinessFormRequest(this.state, '/level/1/section/4/business-option/5').then(
                (response) => {
                    this.setState({isLoading: false});
                    const token = response.data.token;
                    if (token) {
                        localStorage.setItem("jwtToken", token);
                        setAuthorizationToken(token);
                        this.props.setCurrentUser(jwt_decode(token).user);
                    }

                    const {setCurrentLevel, setCurrentSection, setCurrentBusinessOption, setCompletedStatus,
                        history, getBusinessOption} = this.props;
                    this.props.setCompletedStatus(response.data.completed_status);
                    if (response.data.completed_status.level) {
                        this.props.getAppStatus();
                        this.props.addFlashMessage({
                            type: "success",
                            text: "Saved successfully!"
                        });
                        getBusinessOption(
                            '/level/1/section/4/business-option/5',
                            true);
                        history.push('/level/getting-started');
                    } else {
                        setCurrentLevel(appStatus.levels[1]);
                        setCurrentSection({});
                        setCurrentBusinessOption({});
                        setCompletedStatus({});
                        history.push('/level/setting-the-foundations');
                    }
                },
                ( error ) => {
                    this.setState({errors: error.response.data.error, isLoading: false});
                    this.props.addFlashMessage({
                        type: "error",
                        text: "Failed!"
                    });
                }
            );
        }
    }

    onClickAffiliateLink(e, boId, affId, link) {
        e.preventDefault();

        this.props.trackClick(boId, affId);

        setTimeout(function () {
            window.open(link, '_blank');
        }, 1000);
    }


    render() {
        const { appStatus } = this.props;
        const errors = this.state.errors;
        const affiliateLinkId = (appStatus.currentBusinessOption.affiliate_links[0]) ? appStatus.currentBusinessOption.affiliate_links[0].id : '';
        const affiliateLinkLabel = (appStatus.currentBusinessOption.affiliate_links[0]) ? appStatus.currentBusinessOption.affiliate_links[0].label : 'Register for an ABN';
        const affiliateLink = (appStatus.currentBusinessOption.affiliate_links[0]) ? appStatus.currentBusinessOption.affiliate_links[0].link : '#';
        return (
            <form className="apps-form" onSubmit={this.onSubmit}>
                <TextFieldGroup
                    error={errors.abn}
                    label="Enter your Australian Business Number (ABN) *"
                    placeholder="eg. 3522 2525 2524"
                    onChange={this.onChange}
                    value={(this.state.abn) ? this.state.abn : appStatus.abn}
                    type="text"
                    field="abn"
                />

                <span className="find-web-span">Don’t have a ABN?</span>
                <a onClick={(e) => this.onClickAffiliateLink(e, appStatus.currentBusinessOption.id, affiliateLinkId, affiliateLink)}
                    href={ affiliateLink } target="new" className="btn btn-lg btn-default clearfix btn-level-5">{ affiliateLinkLabel }</a>

                <div className="btn-wrap">
                    <button disabled={ this.state.isLoading } className="btn btn-default btn-md">Done</button>
                </div>
            </form>
        );
    }
}

RegisterBusiness.propTypes = {
    appStatus: PropTypes.object.isRequired,
    auth: PropTypes.object.isRequired,
    saveBusinessFormRequest: PropTypes.func.isRequired,
    addFlashMessage: PropTypes.func.isRequired,
    getBusinessOptionFromUrl: PropTypes.func.isRequired,
    getAppStatus: PropTypes.func.isRequired,
    getBusinessOption: PropTypes.func.isRequired,
    setShowCompletedPage: PropTypes.func.isRequired,
    setCompletedStatus: PropTypes.func.isRequired,
    setCurrentLevel: PropTypes.func.isRequired,
    setCurrentSection: PropTypes.func.isRequired,
    setCurrentBusinessOption: PropTypes.func.isRequired,
    trackClick: PropTypes.func.isRequired
};


function mapStateToProps(state) {
    return {
        appStatus: state.appStatusReducer,
        auth: state.authReducer
    }
}

export default withRouter(connect(mapStateToProps, {
    getAppStatus,
    saveBusinessFormRequest,
    addFlashMessage,
    getBusinessOptionFromUrl,
    getBusinessOption,
    setCurrentLevel,
    setCurrentSection,
    setCurrentBusinessOption,
    setShowCompletedPage,
    setCompletedStatus,
    trackClick
})(RegisterBusiness));