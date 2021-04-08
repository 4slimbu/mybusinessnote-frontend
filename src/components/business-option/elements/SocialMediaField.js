import React, {Component} from 'react';
import {withRouter} from "react-router-dom";
import {connect} from "react-redux";
import PropTypes from "prop-types";
import {
    setBusinessCategoryId, setCurrentTipCategory, setSellGoods,
    setToolTipContent
} from "../../../actions/appStatusAction";
import {addFlashMessage} from "../../../actions/flashMessageAction";
import {
    generateAppRelativeUrl, getByKey, isItemLoaded,
    saveBusinessOption
} from "../../../utils/helper/helperFunctions";
import OptionStatusButtonGroup from "../../common/OptionStatusButtonGroup";
import {map} from "lodash";
import {Panel, PanelGroup} from "react-bootstrap";
import request from "../../../services/request";
import {MESSAGES} from "../../../constants/messages";
import {makeRequest} from "../../../actions/requestAction";

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
            input:{
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
                <div className="content-wrap"
                     dangerouslySetInnerHTML={{__html: currentBusinessOption.content}}/>
                <ul className="apps-social-media">
                    <li>
                        <a className="social-media-icon" href=""
                           onClick={(e) => this.onClickSocialIcon(e, 'twitter')}><img
                            src={ currentBusinessOption.icon } alt=""/></a>
                        <form onSubmit={(e) => this.handleSubmit(e)}>
                            <input placeholder="https://example.com/page" type="text"
                                   onChange={(e) => this.onChange(e)} value={this.state.value}/>
                            {this.state.errors.twitter &&
                            <div><span className="form-error-message-2">{this.state.errors.twitter}</span></div>}

                            <button
                                className="btn btn-default btn-lg btn-alert">{(this.state.isChanged) ? 'Done' : 'Cancel'}</button>
                        </form>
                    </li>
                </ul>
            </div>
        )

    }
}

SocialMediaField.propTypes = {
    getBusinessCategories: PropTypes.func.isRequired,
    setBusinessCategoryId: PropTypes.func.isRequired,
    setSellGoods: PropTypes.func.isRequired,
    setShowCompletedPage: PropTypes.func.isRequired,
    setCurrentTipCategory: PropTypes.func.isRequired,
    setCurrentBusinessOption: PropTypes.func.isRequired,
    onClickNext: PropTypes.func.isRequired,
    getBusinessOptionFromUrl: PropTypes.func.isRequired,
    getAppStatus: PropTypes.func.isRequired,
    setCompletedStatus: PropTypes.func.isRequired,
    addFlashMessage: PropTypes.func.isRequired,
    trackClick: PropTypes.func.isRequired,
    setToolTipContent: PropTypes.func.isRequired,
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
            setBusinessCategoryId,
            setSellGoods,
            setCurrentTipCategory,
            addFlashMessage,
            setToolTipContent
        }
    )(SocialMediaField))