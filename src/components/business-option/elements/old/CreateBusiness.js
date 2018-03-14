import React, {Component} from 'react';
import PropTypes from "prop-types";
import {connect} from "react-redux";
import {addFlashMessage} from "../../../../actions/flashMessageAction";
import TextFieldGroup from "../../../common/TextFieldGroup";
import {withRouter} from "react-router-dom";
import request from "../../../../services/request";
import {makeRequest} from "../../../../actions/requestAction";
import {validateFields} from "../../../../utils/validation/FieldValidator";
import {ROUTES} from "../../../../constants/routes";

class CreateBusiness extends Component {
    constructor(props) {
        super(props);
        this.state = {
            business_name: {
                isChanged: false,
                label: "Business Name",
                name: "business_name",
                placeholder: "Your Business Name",
                value: "",
                oldValue: "",
                type: "text"
            },
            website: {
                isChanged: false,
                label: "Website",
                name: "website",
                placeholder: "https://yourwebsite.com",
                value: "",
                oldValue: "",
                type: "text"
            },
            errors: {},
            isChanged: false,
        };
        this.onChange = this.onChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
    }

    componentDidMount() {
        const {appStatus} = this.props;
        const {business} = appStatus;

        this.setState({
            ...this.state,
            business_name: {
                ...this.state.business_name,
                oldValue: business.business_name,
            },
            website: {
                ...this.state.website,
                oldValue: business.website,
            },
        });
    }

    resetFields() {
        this.setState({
            business_name: {
                ...this.state.business_name,
                isChanged: false,
                value: ''
            },
            website: {
                ...this.state.website,
                isChanged: false,
                value: ''
            },
            errors: {},
            isChanged: false,
        })
    }

    onChange(e) {

        this.setState({
            [e.target.name]: {
                ...this.state[e.target.name],
                value: e.target.value,
                isChanged: true
            },
            isChanged: true
        }, function () {
            const dataObject = {};
            if (this.state.business_name.isChanged) {
                dataObject.business_name = this.state.business_name.value
            }
            if (this.state.website.isChanged) {
                dataObject.website = this.state.website.value
            }

            this.isFormValid(dataObject);
        });


    }

    isFormValid(dataObject) {
        const rules = {
            business_name: 'required',
            website: 'required|website',
        };
        const {errors, isValid} = validateFields(dataObject, rules);

        this.setState({
            errors: isValid ? {} : errors
        });

        return isValid;
    }

    onSubmit(e) {
        e.preventDefault();
        const {appStatus, makeRequest, history} = this.props;

        if (appStatus.business.id && !this.state.isChanged) {
            history.push(ROUTES.REGISTER_ABN);
        }

        // new data
        if (! appStatus.business.id) {
            const newData = {
                business_name: this.state.business_name.value,
                website: this.state.website.value,
                business_option_id: appStatus.currentBusinessOption.id,
            };
            if (this.isFormValid(newData)) {
                makeRequest(request.business.save, newData).then(
                    (responseData) => {
                        history.push(ROUTES.REGISTER_ABN);
                    },
                    (errorData) => {
                        this.resetFields();
                        this.setState({
                            errors: errorData.errors ? errorData.errors : {}
                        });
                    }
                );
            }
        }

        //changed data
        if (appStatus.business.id && this.state.isChanged) {
            const changedData = {
                business_option_id: appStatus.currentBusinessOption.id,
            };
            if (this.state.business_name.isChanged) {
                changedData.business_name = this.state.business_name.value
            }
            if (this.state.website.isChanged) {
                changedData.website = this.state.website.value
            }
            if (this.isFormValid(changedData)) {
                if (this.isFormValid(changedData)) {
                    makeRequest(request.Business.save, changedData).then(
                        (responseData) => {
                            history.push(ROUTES.REGISTER_ABN);
                        },
                        (errorData) => {
                            this.resetFields();
                            this.setState({
                                errors: errorData.errors ? errorData.errors : {}
                            });
                        }
                    );
                }
            }
        }
    }

    onClickAffiliateLink(e, boId, affId, link) {
        e.preventDefault();

        this.props.makeRequest(request.Track.click, {boId: boId, affId: affId});

        setTimeout(function () {
            window.open(link, '_blank');
        }, 500);
    }


    render() {
        const {appStatus} = this.props;
        const errors = this.state.errors;
        const affiliateLinkId = (appStatus.currentBusinessOption.affiliateLinks[0]) ? appStatus.currentBusinessOption.affiliateLinks[0].id : '';
        const affiliateLinkLabel = (appStatus.currentBusinessOption.affiliateLinks[0]) ? appStatus.currentBusinessOption.affiliateLinks[0].label : 'Find me a web address';
        const affiliateLink = (appStatus.currentBusinessOption.affiliateLinks[0]) ? appStatus.currentBusinessOption.affiliateLinks[0].link : '#';

        return (
            <form className="apps-form" onSubmit={this.onSubmit}>
                <TextFieldGroup fieldObject={this.state.business_name} onChange={this.onChange}
                                error={errors.business_name}/>
                <TextFieldGroup fieldObject={this.state.website} onChange={this.onChange} error={errors.website}/>

                <span className="find-web-span">Don’t have a web address?</span>
                <a onClick={(e) => this.onClickAffiliateLink(e, appStatus.currentBusinessOption.id, affiliateLinkId, affiliateLink)}
                   href={affiliateLink} target="new"
                   className="btn btn-lg btn-default clearfix btn-level-5">{affiliateLinkLabel}</a>

                <div className="btn-wrap">
                    <button className="btn btn-default btn-md">Continue</button>
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
    makeRequest,
    addFlashMessage,
})(CreateBusiness));