import React, {Component} from 'react';
import {withRouter} from "react-router-dom";
import {connect} from "react-redux";
import PropTypes from "prop-types";
import {generateAppRelativeUrl, getByKey, isItemLoaded} from "../../../../utils/helper/helperFunctions";
import request from "../../../../services/request";
import {MESSAGES} from "../../../../constants/messages";
import {makeRequest} from "../../../../actions/requestAction";

class SocialMediaField extends Component {
    constructor(props) {
        super(props);
        this.state = {
            metaKey: 'social_media',
            value: '',
            isChanged: false,
            errors: {},
        }
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

    handleSubmit(e) {
        e.preventDefault();

        this.props.makeRequest(request.BusinessOption.save, {
            id: this.props.appStatus.currentBusinessOption.id,
            input: {
                business_option_id: this.props.appStatus.currentBusinessOption.id,
                business_meta: {
                    [this.state.metaKey]: this.state.value
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
        });

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
        const {appStatus} = this.props;
        const currentBusinessOption = appStatus.currentBusinessOption;

        return (
            <div>
                <ul className="apps-social-media">
                    <li>
                        <a className="social-media-icon" href="#">
                            <img src={currentBusinessOption.icon} alt=""/>
                        </a>
                        <form onSubmit={(e) => this.handleSubmit(e)}>
                            <input placeholder="https://example.com/page" type="text"
                                   onChange={(e) => this.onChange(e)} value={this.state.value}/>
                            {this.state.errors.social_media &&
                            <div><span className="form-error-message-2">{this.state.errors.social_media}</span></div>}

                            {
                                this.state.isChanged && <button className="btn btn-default btn-lg btn-alert">Done</button>
                            }
                        </form>
                    </li>
                </ul>
            </div>
        )

    }
}

SocialMediaField.propTypes = {
    makeRequest: PropTypes.func.isRequired,
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
    )(SocialMediaField))