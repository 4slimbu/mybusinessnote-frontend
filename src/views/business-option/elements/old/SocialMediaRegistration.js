import React, {Component} from 'react';
import {withRouter} from "react-router-dom";
import {connect} from "react-redux";
import PropTypes from "prop-types";
import {
    getAppStatus,
    getBusinessCategories, getBusinessOptionFromUrl, setBusinessCategoryId, setCompletedStatus,
    setCurrentBusinessOption,
    setCurrentTipCategory,
    setSellGoods, setShowCompletedPage, setToolTipContent, trackClick
} from "../../../../services/actions/appStatusAction";
import {saveBusinessOptionFormRequest} from "../../../../services/actions/businessActions";
import {addFlashMessage} from "../../../../services/actions/flashMessageAction";
import {saveBusinessOption} from "../../../../utils/helper/helperFunctions";
import OptionStatusButtonGroup from "../../../common/OptionStatusButtonGroup";
import {isSocialMediaLinksValid} from "../../../../utils/validation/BusinessValidation";
import {map} from "lodash";
import {Panel, PanelGroup} from "react-bootstrap";

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
            isLast: true,
            errors: {},
        }
    }

    componentDidMount() {
        this.displayToolTip();
    }

    componentWillReceiveProps(nextProps) {
        const {appStatus} = this.props;
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
        });
        if (nextProps.appStatus.currentBusinessOption.id !== this.props.appStatus.currentBusinessOption.id) {
            this.displayToolTip();
        }

    }

    handleToolTip(e, id) {
        e.preventDefault();
        this.displayToolTip(id);
    }

    displayToolTip(id) {
        const currentObject = this;
        const tooltips = [
            {
                id: 1,
                name: "Twitter",
                tooltip: "<p>With at least 300 million users and a varied demographic, Twitter is a good platform for content marketing. The social media channel is a good way to engage with audiences using #hashtags, @mentions, short links, images, videos and conversations. Here are a handful of tips to use Twitter effectively: </p>" +
                "<ul>" +
                "<li><strong>Use the right hashtag:</strong> This can help your tweet get discovered by more active users, especially if it is related to a trending topic. Twitter analytics can identify which hashtags perform better.</li>" +
                "<li><strong>Tag relevant profiles:</strong> Mention industry personalities and thought leaders in your post or image to boost engagement.</li>" +
                "<li><strong>Tweet at optimal times:</strong> Know which time of the day is the best chance to deliver your posts to your target audience.</li>" +
                "</ul>"
            },
            {
                id: 2,
                name: "Facebook",
                tooltip: "<p>With 65 million pages and eight million business profiles, Facebook is a useful platform for small businesses worldwide. The social media channel has tools to help SMEs reach their audience more effectively. These tools include:</p>" +
                "<ul>" +
                "<li><strong>Ads Manager:</strong> This app helps schedule advertising campaigns, plan the budget and monitor each week how the ad account performs.</li>" +
                "<li><strong>Creative Studio:</strong> Create mock-ups of ads and get a preview of how they will enhance audience interaction with your marketing pages.</li>" +
                "<li><strong>Blueprint:</strong> Learn the modules about Facebook advertising tools and get certified using the Blueprint Certification program.</li>" +
                "<li><strong>Single Inbox:</strong> Manage all your messages across Facebook, Messenger and Instagram to be able to reply and reach your audiences.</li>" +
                "</ul>"
            },
            {
                id: 3,
                name: "Linkedin",
                tooltip: "<p>Over 400 million users have a Linkedin page, making it a good platform when starting your social media marketing strategy, especially with the recommendations function. Here are some tips:</p>" +
                "<ul>" +
                "<li><strong>Create a profile for lead generation:</strong> Make sure that your profile has your updated details and contact information and will lead people to go to your corporate website for more information.</li>" +
                "<li><strong>Post your best content:</strong> Highlight your business milestones and provides useful content that can help solve your audience’s problems.</li>" +
                "<li><strong>Advocate for your brand:</strong> Add a human angle to your posts to engage with your audiences. Fun, behind-the-scenes content can also promote connections with your audience and turn them into active followers.</li>" +
                "</ul>"
            },
            {
                id: 4,
                name: "Instagram",
                tooltip: "<p>With over seven million monthly active Instagram users on the platform in Australia, there is a real opportunity for you to engage customers with the right visual content strategy.</p>" +
                "<ul>" +
                "<li><strong>Set up a business account:</strong> Use a consistent photo and name that goes along with your branding strategy.</li>" +
                "<li><strong>Showcase fresh content:</strong> Simple images that tell a story is a powerful way to connect with your audience.</li>" +
                "<li><strong>Use Business Tools:</strong> This free tool gives you business insights and to identify which posts work best for audience engagement.</li>" +
                "<li><strong>Link your account with Facebook:</strong> Connecting these two can help boost your marketing efforts.</li>" +
                "<li><strong>Create interactive hashtags:</strong> When planned well, the use of correct hashtags related to your brand or new product can result in free advertising once your followers use them to tag their own photos.</li>" +
                "</ul>"
            }
        ];
        const tipList = map(tooltips, (item, key) => {
            const title = (item.id === id) ? <strong>{item.name}</strong> : item.name;
            return (
                <Panel key={item.id} eventKey={item.id}>
                    <Panel.Heading>
                        <Panel.Title toggle>
                            <h4>
                                <span className="accordion-titles">{title}</span>
                                <span className="acc-img"></span>
                            </h4>
                        </Panel.Title>
                    </Panel.Heading>
                    <Panel.Body collapsible>
                        <div className="content-wrap" dangerouslySetInnerHTML={{__html: item.tooltip}}/>
                    </Panel.Body>
                </Panel>
            )
        });

        let activeKey = id;
        const handleSelect = function (newKey) {
            currentObject.displayToolTip(newKey);
        };
        const toolTip = {};
        toolTip.rawHtmlContent = this.props.appStatus.currentBusinessOption.tooltip;
        toolTip.accordion = (
            <PanelGroup accordion id={`accordion-uncontrolled-social-links`} activeKey={activeKey}
                        onSelect={(newKey) => handleSelect(newKey)}>
                {tipList}
            </PanelGroup>
        );
        this.props.setToolTipContent(toolTip);
    }

    onClickNext(e) {
        e.preventDefault();
        this.props.getAppStatus();
        const appStatus = this.props.appStatus;
        this.props.getBusinessOptionFromUrl(appStatus.currentBusinessOption.links.next);
    }

    onClickSocialIcon(e, icon) {
        e.preventDefault();

        switch (icon) {
            case 'twitter':
                this.setState({isTwitterClicked: true});
                this.handleToolTip(e, 1);
                break;
            case 'facebook':
                this.setState({isFacebookClicked: true});
                this.handleToolTip(e, 2);
                break;
            case 'linkedin':
                this.setState({isLinkedinClicked: true});
                this.handleToolTip(e, 3);
                break;
            case 'instagram':
                this.setState({isInstagramClicked: true});
                this.handleToolTip(e, 4);
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

    isFormValid(socialName, url) {
        const {errors, isValid} = isSocialMediaLinksValid(socialName, url);

        if (!isValid) {
            this.setState({errors});
        }

        return isValid;
    }

    onClickDone(e, socialName) {
        e.preventDefault();

        if (!this.isFormValid(socialName, this.state[socialName])) {
            return;
        } else {
            this.setState({errors: {}});
        }

        this.handleToolTip(e, 0);
        this.setState({
            isFacebookClicked: false,
            isTwitterClicked: false,
            isLinkedinClicked: false,
            isInstagramClicked: false
        })
    }

    render() {
        const {appStatus} = this.props;
        const currentBusinessOption = appStatus.currentBusinessOption;
        const currentBusinessMeta = currentBusinessOption.business_meta;
        const twitter = (this.state.isChanged) ? this.state.twitter : currentBusinessMeta.twitter;
        const facebook = (this.state.isChanged) ? this.state.facebook : currentBusinessMeta.facebook;
        const linkedin = (this.state.isChanged) ? this.state.linkedin : currentBusinessMeta.linkedin;
        const instagram = (this.state.isChanged) ? this.state.instagram : currentBusinessMeta.instagram;
        const twitter_icon = (currentBusinessMeta.twitter || this.state.twitter) ? 'twitter.png' : 'twitter_grey.png';
        const facebook_icon = (currentBusinessMeta.facebook || this.state.facebook) ? 'facebook.png' : 'facebook_grey.png';
        const linkedin_icon = (currentBusinessMeta.linkedin || this.state.linkedin) ? 'linkedin.png' : 'linkedin_grey.png';
        const instagram_icon = (currentBusinessMeta.instagram || this.state.instagram) ? 'instagram.png' : 'instagram_grey.png';

        return (
            <div>
                {
                    !(this.state.isFacebookClicked || this.state.isTwitterClicked || this.state.isLinkedinClicked || this.state.isInstagramClicked)

                    &&
                    <div>

                        <ul className="apps-social-media">
                            <li><a href="" onClick={(e) => this.onClickSocialIcon(e, 'twitter')}><img
                                src={`${process.env.PUBLIC_URL}/assets/images/social/${twitter_icon}`} alt=""/></a></li>
                            <li><a href="" onClick={(e) => this.onClickSocialIcon(e, 'facebook')}><img
                                src={`${process.env.PUBLIC_URL}/assets/images/social/${facebook_icon}`} alt=""/></a>
                            </li>
                            <li><a href="" onClick={(e) => this.onClickSocialIcon(e, 'linkedin')}><img
                                src={`${process.env.PUBLIC_URL}/assets/images/social/${linkedin_icon}`} alt=""/></a>
                            </li>
                            <li><a href="" onClick={(e) => this.onClickSocialIcon(e, 'instagram')}><img
                                src={`${process.env.PUBLIC_URL}/assets/images/social/${instagram_icon}`} alt=""/></a>
                            </li>
                        </ul>
                        {
                            (this.state.facebook || this.state.twitter || this.state.linkedin || this.state.instagram)
                            &&
                            <a href="#" onClick={(e) => this.onClickFinished(e)}
                               className="btn btn-default btn-lg btn-alert">Finished</a>
                        }
                    </div>
                }
                {
                    this.state.isTwitterClicked &&
                    <ul className="apps-social-media">
                        <li>
                            <a className="social-media-icon" href=""
                               onClick={(e) => this.onClickSocialIcon(e, 'twitter')}><img
                                src={`${process.env.PUBLIC_URL}/assets/images/social/${twitter_icon}`} alt=""/></a>
                            <form onSubmit={(e) => this.onClickDone(e, 'twitter')}>
                                <input placeholder="https://twitter.com/page" type="text"
                                       onChange={(e) => this.onChangeInput(e, 'twitter')} value={twitter}/>
                                {this.state.errors.twitter &&
                                <div><span className="form-error-message">{this.state.errors.twitter}</span></div>}

                                <button
                                    className="btn btn-default btn-lg btn-alert">{(twitter) ? 'Done' : 'Cancel'}</button>
                            </form>
                        </li>
                    </ul>
                }

                {
                    this.state.isFacebookClicked &&
                    <ul className="apps-social-media">
                        <li>
                            <a className="social-media-icon" href=""
                               onClick={(e) => this.onClickSocialIcon(e, 'facebook')}><img
                                src={`${process.env.PUBLIC_URL}/assets/images/social/${facebook_icon}`} alt=""/></a>
                            <form onSubmit={(e) => this.onClickDone(e, 'facebook')}>
                                <input placeholder="https://facebook.com/page" type="text"
                                       onChange={(e) => this.onChangeInput(e, 'facebook')} value={facebook}/>
                                {this.state.errors.facebook &&
                                <div><span className="form-error-message">{this.state.errors.facebook}</span></div>}
                                <button
                                    className="btn btn-default btn-lg btn-alert">{(facebook) ? 'Done' : 'Cancel'}</button>
                            </form>
                        </li>
                    </ul>
                }

                {
                    this.state.isLinkedinClicked &&
                    <ul className="apps-social-media">
                        <li>
                            <a className="social-media-icon" href=""
                               onClick={(e) => this.onClickSocialIcon(e, 'linkedin')}><img
                                src={`${process.env.PUBLIC_URL}/assets/images/social/${linkedin_icon}`} alt=""/></a>
                            <form onSubmit={(e) => this.onClickDone(e, 'linkedin')}>
                                <input placeholder="https://linkedin.com/page" type="text"
                                       onChange={(e) => this.onChangeInput(e, 'linkedin')} value={linkedin}/>
                                {this.state.errors.linkedin &&
                                <div><span className="form-error-message">{this.state.errors.linkedin}</span></div>}
                                <button
                                    className="btn btn-default btn-lg btn-alert">{(linkedin) ? 'Done' : 'Cancel'}</button>
                            </form>
                        </li>
                    </ul>
                }

                {
                    this.state.isInstagramClicked &&
                    <ul className="apps-social-media">
                        <li>
                            <a className="social-media-icon" href=""
                               onClick={(e) => this.onClickSocialIcon(e, 'instagram')}><img
                                src={`${process.env.PUBLIC_URL}/assets/images/social/${instagram_icon}`} alt=""/></a>
                            <form onSubmit={(e) => this.onClickDone(e, 'instagram')}>
                                <input placeholder="https://instagram.com/page" type="text"
                                       onChange={(e) => this.onChangeInput(e, 'instagram')} value={instagram}/>
                                {this.state.errors.instagram &&
                                <div><span className="form-error-message">{this.state.errors.instagram}</span></div>}
                                <button
                                    className="btn btn-default btn-lg btn-alert">{(instagram) ? 'Done' : 'Cancel'}</button>
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
    trackClick: PropTypes.func.isRequired,
    setToolTipContent: PropTypes.func.isRequired
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
            trackClick,
            setToolTipContent
        }
    )(SocialMediaRegistration))