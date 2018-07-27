import React, {Component} from 'react';
import {withRouter} from "react-router-dom";
import {connect} from "react-redux";
import PropTypes from "prop-types";
import {generateAppRelativeUrl, getByKey, isItemLoaded} from "../../../../utils/helper/helperFunctions";
import {makeRequest} from "../../../../actions/requestAction";
import request from "../../../../services/request";
import {MESSAGES} from "../../../../constants/messages";

class YesAndLinkField extends Component {

    constructor(props) {
        super(props);
        this.state = {
            metaKey: 'text_input',
            value: '',
            affiliateLink: {},
            isChanged: false
        };
    }

    componentDidMount() {
        const {appStatus} = this.props;
        const {currentBusinessOption} = appStatus;
        const {businessMetas, affiliateLinks} = currentBusinessOption;

        const valueObject = getByKey(businessMetas, 'key', this.state.metaKey);
        this.setState({
            ...this.state,
            value: isItemLoaded(valueObject) ? valueObject.value : '',
            affiliateLink: isItemLoaded(affiliateLinks) ? affiliateLinks[0] : {}
        });
    }

    handleSubmit(e, value) {
        e.preventDefault();

        this.props.makeRequest(request.BusinessOption.save, {
            id: this.props.appStatus.currentBusinessOption.id,
            input:{
                business_option_id: this.props.appStatus.currentBusinessOption.id,
                business_meta: {
                    [this.state.metaKey]: value
                }
            }
        }, {message: MESSAGES.SAVING}).then((response) => {
            let {appStatus, history} = this.props;
            let {currentLevel, currentSection, currentBusinessOption} = appStatus;
            let backUrl = generateAppRelativeUrl(currentLevel.slug, currentSection.slug);
            if (currentBusinessOption.parent_id) {
                backUrl = generateAppRelativeUrl(currentLevel.slug, currentSection.slug, currentBusinessOption.parent_id);
            }
            history.push(backUrl);
        });
    }

    onClickAffiliateLink(e, boId, affId, link) {
        e.preventDefault();

        this.props.makeRequest(request.Track.click, {
            boId: boId,
            affId: affId
        }, {isSilent: true});

        setTimeout(function () {
            window.open(link, '_blank');
        }, 1000);
    }

    onChange(e) {
        e.preventDefault();
        this.setState({
            ...this.state,
            value: e.target.value,
            isChanged: true
        })
    }

    render() {
        const {attributes} = this.props;
        const {currentBusinessOption} = this.props.appStatus;
        const affiliateLinkId = (currentBusinessOption.affiliateLinks[0]) ? currentBusinessOption.affiliateLinks[0].id : '';
        const affiliateLinkLabel = attributes.link_label ? attributes.link_label : 'Set Up Now';
        const affiliateLink = (currentBusinessOption.affiliateLinks[0]) ? currentBusinessOption.affiliateLinks[0].link : '#';
        return (
            <div>
                <ul className="alert-btns">
                    <li><a
                        className={this.state.value === 'yes' ? 'active' : ''}
                        href="" onClick={(e) => this.handleSubmit(e, 'yes')}>{ attributes.confirm_label ? attributes.confirm_label : "Yes"}</a></li>
                    <li>
                        <a onClick={(e) => this.onClickAffiliateLink(e, currentBusinessOption.id, affiliateLinkId, affiliateLink)}
                           href={affiliateLink} target="new" className="upload-button">{affiliateLinkLabel}</a>
                    </li>
                </ul>

            </div>

        )

    }
}

YesAndLinkField.propTypes = {
    setCurrentBusinessOption: PropTypes.func.isRequired,
    onClickNext: PropTypes.func.isRequired,
    getAppStatus: PropTypes.func.isRequired,
};

function mapStateToProps(state) {
    return {
        appStatus: state.appStatusReducer,
        auth: state.authReducer
    }
}

export default withRouter(
    connect(
        mapStateToProps,
        {
            makeRequest,
        }
    )(YesAndLinkField))