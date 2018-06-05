import React, {Component} from 'react';
import PropTypes from "prop-types";
import {connect} from "react-redux";
import {addFlashMessage} from "../../../actions/flashMessageAction";
import TextFieldGroup from "../../common/TextFieldGroup";
import {withRouter} from "react-router-dom";
import request from "../../../services/request";
import {makeRequest} from "../../../actions/requestAction";
import {validateFields} from "../../../utils/validation/FieldValidator";
import {ROUTES} from "../../../constants/routes";
import {getAllFields, getChangedFields, getRulesForChangedFields} from "../../../utils/helper/helperFunctions";
import {MESSAGES} from "../../../constants/messages";
import {isEmpty} from "lodash";

class RegisterBusiness extends Component {
    constructor(props) {
        super(props);

        // All required rules
        this.rules = {
            abn: 'required|numeric',
        };

        // Initial State
        this.state = {
            abn: {
                isChanged: false,
                label: "Enter your Australian Business Number (ABN) *",
                name: "abn",
                placeholder: "eg. 3522 2525 2524",
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
            abn: {
                ...this.state.abn,
                oldValue: business.abn,
            },
        });
    }

    resetFields() {
        this.setState({
            abn: {
                ...this.state.abn,
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
            !isEmpty(this.state.abn.oldValue) &&
            !this.state.isChanged
        ) {
            history.push(ROUTES.LEVEL_TWO);
            return;
        }

        const allFields = getAllFields(this.state);
        const changedFields = getChangedFields(this.state);
        const rulesForChangedFields = getRulesForChangedFields(this.rules, changedFields);
        let isValid = false;

        if (
            isEmpty(this.state.abn.oldValue) &&
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
                    history.push(ROUTES.LEVEL_TWO);
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
                <TextFieldGroup fieldObject={this.state.abn} onChange={this.onChange}
                                error={errors.abn}/>

                <span className="find-web-span">Don’t have a ABN?</span>
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

RegisterBusiness.propTypes = {
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
})(RegisterBusiness));