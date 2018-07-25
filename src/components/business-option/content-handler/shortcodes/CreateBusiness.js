import React, {Component} from 'react';
import PropTypes from "prop-types";
import {connect} from "react-redux";
import TextFieldGroup from "../../../common/TextFieldGroup";
import {withRouter} from "react-router-dom";
import request from "../../../../services/request";
import {makeRequest} from "../../../../actions/requestAction";
import {validateFields} from "../../../../utils/validation/FieldValidator";
import {ROUTES} from "../../../../constants/routes";
import {MESSAGES} from "../../../../constants/messages";
import {getAllFields, getChangedFields, getRulesForChangedFields} from "../../../../utils/helper/helperFunctions";
import {isEmpty} from "lodash";

class CreateBusiness extends Component {
    constructor(props) {
        super(props);

        // All required rules
        this.rules = {
            business_name: 'required',
            website: 'required|website',
        };

        // Initial State
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
            errorCode: '',
            errors: {},
            isChanged: false,
        };

        // Binding Methods
        this.onChange = this.onChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
        this.isFormValid = this.isFormValid.bind(this);
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
        let currentFieldName, currentFieldValue;
        currentFieldName = e.target.name;
        currentFieldValue = e.target.value;

        // Update the states with new field value
        this.setState({
            [currentFieldName]: {
                ...this.state[currentFieldName],
                value: currentFieldValue,
                isChanged: true
            },
            isChanged: true
        }, function () {
            const changedField = {[currentFieldName]: currentFieldValue};
            const allFields = getAllFields(this.state);
            const rules = getRulesForChangedFields(this.rules, changedField);
            const {errors, isValid} = validateFields(allFields, rules);

            if (!isValid) {
                this.setState({
                    errors: {
                        ...this.state.errors,
                        ...errors
                    }
                });
            } else {
                const errors = {...this.state.errors};
                if (errors[currentFieldName]) {
                    delete errors[currentFieldName];
                }
                this.setState({
                    errors: errors
                });
            }

        });
    }

    /**
     * Validates Form fields
     *
     * @param dataObject - is an object containing field key:value pair
     * @param rules
     * @returns bool
     */
    isFormValid(dataObject, rules) {
        const {errors, isValid} = validateFields(dataObject, rules);

        this.setState({
            errors: isValid ? {} : errors
        });

        return isValid;
    }

    onSubmit(e) {
        e.preventDefault();
        const {appStatus, makeRequest, history} = this.props;

        if (
            !isEmpty(this.state.website.oldValue) &&
            !isEmpty(this.state.business_name.oldValue) &&
            !this.state.isChanged
        ) {
            history.push(ROUTES.REGISTER_ABN);
            return;
        }

        const allFields = getAllFields(this.state);
        const changedFields = getChangedFields(this.state);
        const rulesForChangedFields = getRulesForChangedFields(this.rules, changedFields);
        let isValid = false;

        if (
            isEmpty(this.state.website.oldValue) &&
            isEmpty(this.state.business_name.oldValue) &&
            !this.state.isChanged
        ) {
            isValid = this.isFormValid(allFields, this.rules);
        } else {
            isValid = this.isFormValid(changedFields, rulesForChangedFields);
        }

        if (isValid) {
            makeRequest(request.Business.save, {
                business_option_id: appStatus.currentBusinessOption.id,
                ...changedFields
            }, {message: MESSAGES.SAVING}).then(
                (responseData) => {
                    history.push(ROUTES.REGISTER_ABN);
                },
                (errorData) => {
                    this.resetFields();
                    this.setState({
                        errorCode: errorData.errorCode ? errorData.errorCode : '',
                        errors: errorData.errors ? errorData.errors : {}
                    });
                }
            );
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

                <TextFieldGroup fieldObject={this.state.website} onChange={this.onChange} error={errors.website}/>

                <span className="find-web-span">Don’t have a web address?</span>
                <a onClick={(e) => this.onClickAffiliateLink(e, appStatus.currentBusinessOption.id, affiliateLinkId, affiliateLink)}
                   href={affiliateLink} target="new"
                   className="btn btn-lg btn-default clearfix btn-level-5">{affiliateLinkLabel}</a>
                <br/>
                <br/>

                <TextFieldGroup fieldObject={this.state.business_name} onChange={this.onChange}
                                error={errors.business_name}/>

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
    makeRequest: PropTypes.func.isRequired,
};


function mapStateToProps(state) {
    return {
        appStatus: state.appStatusReducer,
        auth: state.authReducer
    }
}

export default withRouter(connect(mapStateToProps, {
    makeRequest
})(CreateBusiness));