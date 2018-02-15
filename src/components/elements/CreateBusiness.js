import React, {Component} from 'react';
import PropTypes from "prop-types";
import {connect} from "react-redux";
import {addFlashMessage} from "../../actions/flashMessageAction";
import {getAppStatus, getBusinessOption, getBusinessOptionFromUrl, trackClick} from "../../actions/appStatusAction";
import jwt_decode from "jwt-decode";
import setAuthorizationToken from "../../utils/setAuthorizationToken";
import TextFieldGroup from "../common/TextFieldGroup";
import {saveBusinessFormRequest} from "../../actions/businessActions";
import {withRouter} from "react-router-dom";
import {validateCreateBusiness} from "../../utils/validation/BusinessValidation";
import {getAppUrlFromApiUrl, mbjLog} from "../navigation/helperFunctions";

class CreateBusiness extends Component {
    constructor(props) {
        super(props);
        this.state = {
            type: "update_business",
            business_id: null,
            business_name: "",
            website: "",
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
            business_name: this.props.appStatus.business_name,
            website: this.props.appStatus.website,
        });
    }

    componentWillReceiveProps() {
        this.setState({
            business_option_id: this.props.appStatus.currentBusinessOption.id,
            business_id: this.props.appStatus.business_id,
            business_name: this.props.appStatus.business_name,
            website: this.props.appStatus.website,
        });
    }

    onChange(e) {
        this.setState({
            [e.target.name]: e.target.value
        });
    }

    isFormValid(data = null) {
        let input = (data) ? data : this.state;
        const { errors, isValid } = validateCreateBusiness(input);

        mbjLog('is form valid', errors);

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

            this.props.saveBusinessFormRequest(this.state, '/level/1/section/3/business-option/4').then(
                (response) => {
                    this.setState({isLoading: false});
                    const token = response.data.token;

                    if (token) {
                        localStorage.setItem("jwtToken", token);
                        setAuthorizationToken(token);
                        this.props.setCurrentUser(jwt_decode(token).user);
                    }
                    this.props.getAppStatus();
                    this.props.addFlashMessage({
                        type: "success",
                        text: "Saved successfully!"
                    });
                    const {appStatus, history, getBusinessOption} = this.props;
                    getBusinessOption(
                        '/level/1/section/3/business-option/4/next?business_category_id=' + appStatus.business_category_id,
                        true);
                    history.push(getAppUrlFromApiUrl(appStatus.currentBusinessOption.links.next));
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
        const affiliateLinkLabel = (appStatus.currentBusinessOption.affiliate_links[0]) ? appStatus.currentBusinessOption.affiliate_links[0].label : 'Find me a web address';
        const affiliateLink = (appStatus.currentBusinessOption.affiliate_links[0]) ? appStatus.currentBusinessOption.affiliate_links[0].link : '#';

        return (
            <form className="apps-form" onSubmit={this.onSubmit}>
                <TextFieldGroup
                    error={errors.business_name}
                    label="Your Business Name *"
                    placeholder="eg. John's Bakery LTD PTD"
                    onChange={this.onChange}
                    value={(this.state.business_name) ? this.state.business_name : appStatus.business_name}
                    type="text"
                    field="business_name"
                />

                <TextFieldGroup
                    error={errors.website}
                    label="Your Business Website *"
                    placeholder="eg. http://johnsbakery.com.au"
                    onChange={this.onChange}
                    value={(this.state.website) ? this.state.website : appStatus.website}
                    type="text"
                    field="website"
                />

                <span className="find-web-span">Don’t have a web address?</span>
                <a onClick={(e) => this.onClickAffiliateLink(e, appStatus.currentBusinessOption.id, affiliateLinkId, affiliateLink)}
                    href={ affiliateLink } target="new" className="btn btn-lg btn-default clearfix btn-level-5">{ affiliateLinkLabel }</a>

                <div className="btn-wrap">
                    <button disabled={ this.state.isLoading } className="btn btn-default btn-md">Continue</button>
                </div>
            </form>
        );
    }
}

CreateBusiness.propTypes = {
    appStatus: PropTypes.object.isRequired,
    auth: PropTypes.object.isRequired,
    saveBusinessFormRequest: PropTypes.func.isRequired,
    addFlashMessage: PropTypes.func.isRequired,
    getBusinessOptionFromUrl: PropTypes.func.isRequired,
    getBusinessOption: PropTypes.func.isRequired,
    getAppStatus: PropTypes.func.isRequired,
    trackClick: PropTypes.func.isRequired
};


function mapStateToProps(state) {
    return {
        appStatus: state.appStatusReducer,
        auth: state.authReducer
    }
}

export default withRouter(connect(mapStateToProps, {
    saveBusinessFormRequest,
    addFlashMessage,
    getBusinessOption,
    getBusinessOptionFromUrl,
    getAppStatus,
    trackClick
})(CreateBusiness));