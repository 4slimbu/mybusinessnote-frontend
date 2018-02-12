import React, {Component} from 'react';
import {withRouter} from "react-router-dom";
import {connect} from "react-redux";
import PropTypes from "prop-types";
import {
    getAppStatus,
    getBusinessCategories, getBusinessOptionFromUrl, setBusinessCategoryId, setCompletedStatus,
    setCurrentBusinessOption,
    setCurrentTipCategory,
    setSellGoods, setShowCompletedPage, trackClick
} from "../../actions/appStatusAction";
import { saveBusinessOptionFormRequest} from "../../actions/businessActions";
import {addFlashMessage} from "../../actions/flashMessageAction";
import {saveBusinessOption} from "../navigation/helperFunctions";
import OptionStatusButtonGroup from "../common/OptionStatusButtonGroup";

class SocialMediaRegistration extends Component {
    constructor(props) {
        super(props);
        this.state = {
            facebook: null,
            twitter: null,
            linkedin: null,
            instagram: null,
            isChanged: false,
            isFacebookClicked: false,
            isTwitterClicked: false,
            isLinkedinClicked: false,
            isInstagramClicked: false,
            isShowCompleted: false,
            isLast: true
        }
    }

    componentWillReceiveProps() {
        const { appStatus } = this.props;
        const currentBusinessOption = appStatus.currentBusinessOption;
        const currentBusinessMeta = currentBusinessOption.business_meta;
        const twitter = (currentBusinessMeta.twitter) ? currentBusinessMeta.twitter : null;
        const facebook = (currentBusinessMeta.facebook) ? currentBusinessMeta.facebook : null;
        const linkedin = (currentBusinessMeta.linkedin) ? currentBusinessMeta.linkedin : null;
        const instagram = (currentBusinessMeta.instagram) ? currentBusinessMeta.instagram : null;
        this.setState({
            twitter: twitter,
            facebook: facebook,
            linkedin: linkedin,
            instagram: instagram
        })

    }

    onClickNext(e) {
        e.preventDefault();
        this.props.getAppStatus();
        const appStatus = this.props.appStatus;
        this.props.getBusinessOptionFromUrl(appStatus.currentBusinessOption.links.next);
    }

    onClickSocialIcon(e, icon) {
        e.preventDefault();

        switch(icon) {
            case 'twitter':
                this.setState({isTwitterClicked: true});
                break;
            case 'facebook':
                this.setState({isFacebookClicked: true});
                break;
            case 'linkedin':
                this.setState({isLinkedinClicked: true});
                break;
            case 'instagram':
                this.setState({isInstagramClicked: true});
                break;
            default:
        }
    }

    onChangeInput(e, media) {
        e.preventDefault();
        this.setState({isChanged: true, [media]: e.target.value});
    }

    onClickFinished(e) {
        e.preventDefault();

        const data = {};
        if (this.state.twitter) {
            data['twitter'] = this.state.twitter
        }

        if (this.state.facebook) {
            data['facebook'] = this.state.facebook
        }

        if (this.state.linkedin) {
            data['linkedin'] = this.state.linkedin
        }

        if (this.state.instagram) {
            data['instagram'] = this.state.instagram
        }

        saveBusinessOption(this, {
            business_option_id: this.props.appStatus.currentBusinessOption.id,
            business_meta: data
        });
    }

    onClickDone(e) {
        e.preventDefault();

        this.setState({
            isFacebookClicked: false,
            isTwitterClicked: false,
            isLinkedinClicked: false,
            isInstagramClicked: false
        })
    }

    render() {
        const { appStatus } = this.props;
        const currentBusinessOption = appStatus.currentBusinessOption;
        const currentBusinessMeta = currentBusinessOption.business_meta;
        const twitter = (this.state.isChanged) ? this.state.twitter : currentBusinessMeta.twitter;
        const facebook = (this.state.isChanged) ? this.state.facebook : currentBusinessMeta.facebook;
        const linkedin = (this.state.isChanged) ? this.state.linkedin : currentBusinessMeta.linkedin;
        const instagram = (this.state.isChanged) ? this.state.instagram : currentBusinessMeta.instagram;
        const twitter_icon = (currentBusinessMeta.twitter || this.state.twitter) ? 'twitter_grey.png' : 'twitter.png';
        const facebook_icon = (currentBusinessMeta.facebook || this.state.facebook) ? 'facebook_grey.png' : 'facebook.png';
        const linkedin_icon = (currentBusinessMeta.linkedin || this.state.linkedin) ? 'linkedin_grey.png' : 'linkedin.png';
        const instagram_icon = (currentBusinessMeta.instagram || this.state.instagram) ? 'instagram_grey.png' : 'instagram.png';

        return (
            <div>
                {
                    !(this.state.isFacebookClicked || this.state.isTwitterClicked || this.state.isLinkedinClicked || this.state.isInstagramClicked)

                    &&
                    <div>

                        <ul className="apps-social-media">
                            <li><a href="" onClick={(e) => this.onClickSocialIcon(e, 'twitter')}><img src={`${process.env.PUBLIC_URL}/assets/images/social/${twitter_icon}`} alt="" /></a></li>
                            <li><a href="" onClick={(e) => this.onClickSocialIcon(e, 'facebook')}><img src={`${process.env.PUBLIC_URL}/assets/images/social/${facebook_icon}`} alt="" /></a></li>
                            <li><a href="" onClick={(e) => this.onClickSocialIcon(e, 'linkedin')}><img src={`${process.env.PUBLIC_URL}/assets/images/social/${linkedin_icon}`} alt="" /></a></li>
                            <li><a href="" onClick={(e) => this.onClickSocialIcon(e, 'instagram')}><img src={`${process.env.PUBLIC_URL}/assets/images/social/${instagram_icon}`} alt="" /></a></li>
                        </ul>
                        {
                            (this.state.facebook || this.state.twitter || this.state.linkedin || this.state.instagram)
                            &&
                            <a href="#" onClick={(e) => this.onClickFinished(e)} className="btn btn-default btn-lg btn-alert">Finished</a>
                        }
                    </div>
                }
                {
                    this.state.isTwitterClicked &&
                    <ul className="apps-social-media">
                        <li>
                            <a className="social-media-icon" href="" onClick={(e) => this.onClickSocialIcon(e, 'twitter')}><img src={`${process.env.PUBLIC_URL}/assets/images/social/${twitter_icon}`} alt="" /></a>
                            <form onSubmit={(e)=> this.onClickDone(e)}>
                                <input type="text" onChange={(e) => this.onChangeInput(e, 'twitter')} value={twitter}/>
                                <button className="btn btn-default btn-lg btn-alert">Done</button>
                            </form>
                        </li>
                    </ul>
                }

                {
                    this.state.isFacebookClicked &&
                    <ul className="apps-social-media">
                        <li>
                            <a className="social-media-icon" href="" onClick={(e) => this.onClickSocialIcon(e, 'facebook')}><img src={`${process.env.PUBLIC_URL}/assets/images/social/${facebook_icon}`} alt="" /></a>
                            <form onSubmit={(e)=> this.onClickDone(e)}>
                                <input type="text" onChange={(e) => this.onChangeInput(e, 'facebook')} value={facebook}/>
                                <button className="btn btn-default btn-lg btn-alert">Done</button>
                            </form>
                        </li>
                    </ul>
                }

                {
                    this.state.isLinkedinClicked &&
                    <ul className="apps-social-media">
                        <li>
                            <a className="social-media-icon" href="" onClick={(e) => this.onClickSocialIcon(e, 'linkedin')}><img src={`${process.env.PUBLIC_URL}/assets/images/social/${linkedin_icon}`} alt="" /></a>
                            <form onSubmit={(e)=> this.onClickDone(e)}>
                                <input type="text" onChange={(e) => this.onChangeInput(e, 'linkedin')} value={linkedin}/>
                                <button className="btn btn-default btn-lg btn-alert">Done</button>
                            </form>
                        </li>
                    </ul>
                }

                {
                    this.state.isInstagramClicked &&
                    <ul className="apps-social-media">
                        <li>
                            <a className="social-media-icon" href="" onClick={(e) => this.onClickSocialIcon(e, 'instagram')}><img src={`${process.env.PUBLIC_URL}/assets/images/social/${instagram_icon}`} alt="" /></a>
                            <form onSubmit={(e)=> this.onClickDone(e)}>
                                <input type="text" onChange={(e) => this.onChangeInput(e, 'instagram')} value={instagram}/>
                                <button className="btn btn-default btn-lg btn-alert">Done</button>
                            </form>

                        </li>
                    </ul>
                }

                <OptionStatusButtonGroup
                    current={this}
                    status={currentBusinessOption.business_business_option_status}
                />
            </div>
        )

    }
}

SocialMediaRegistration.propTypes = {
    getBusinessCategories: PropTypes.func.isRequired,
    setBusinessCategoryId: PropTypes.func.isRequired,
    setSellGoods: PropTypes.func.isRequired,
    setShowCompletedPage: PropTypes.func.isRequired,
    setCurrentTipCategory: PropTypes.func.isRequired,
    setCurrentBusinessOption: PropTypes.func.isRequired,
    onClickNext: PropTypes.func.isRequired,
    getBusinessOptionFromUrl: PropTypes.func.isRequired,
    saveBusinessOptionFormRequest: PropTypes.func.isRequired,
    getAppStatus: PropTypes.func.isRequired,
    setCompletedStatus: PropTypes.func.isRequired,
    addFlashMessage: PropTypes.func.isRequired,
    trackClick: PropTypes.func.isRequired
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
            getBusinessCategories,
            setBusinessCategoryId,
            setSellGoods,
            setCurrentTipCategory,
            setCurrentBusinessOption,
            setCompletedStatus,
            getBusinessOptionFromUrl,
            saveBusinessOptionFormRequest,
            getAppStatus,
            setShowCompletedPage,
            addFlashMessage,
            trackClick
        }
    )(SocialMediaRegistration))