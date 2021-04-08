import React, {Component} from 'react';
import {withRouter} from "react-router-dom";
import {connect} from "react-redux";
import PropTypes from "prop-types";
import {
    setBusinessCategoryId, setBusinessMeta, setCurrentTipCategory,
    setSellGoods
} from "../../../actions/appStatusAction";
import {addFlashMessage} from "../../../actions/flashMessageAction";
import {makeRequest} from "../../../actions/requestAction";
import request from "../../../services/request";
import {generateAppRelativeUrl, getByKey, isItemLoaded} from "../../../utils/helper/helperFunctions";
import {MESSAGES} from "../../../constants/messages";

class SingleImageField extends Component {

    constructor(props) {
        super(props);
        this.state = {
            metaKey: 'image',
            file: '',
            image: '',
            affiliateLink: {},
            isPreview: false
        };

        this.handleSubmit = this.handleSubmit.bind(this);
        this.onClickRemove = this.onClickRemove.bind(this);
        this.onClickNext = this.onClickNext.bind(this);
        this.onClickAffiliateLink = this.onClickAffiliateLink.bind(this);
    }

    componentDidMount() {
        const {appStatus} = this.props;
        const {currentBusinessOption} = appStatus;
        const {businessMetas, affiliateLinks} = currentBusinessOption;

        const imageObject = getByKey(businessMetas, 'key', 'image');
        this.setState({
            ...this.state,
            image: isItemLoaded(imageObject) ? imageObject.value : '',
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
                    [this.state.metaKey]: this.state.image
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

    handleImageChange(e) {
        e.preventDefault();

        let reader = new FileReader();
        let file = e.target.files[0];

        reader.onloadend = () => {
            this.setState({
                file: file,
                image: reader.result,
                isPreview: true
            });
        };

        reader.readAsDataURL(file)
    }

    onClickRemove(e) {
        e.preventDefault();
        this.setState({
            ...this.state,
            image: '',
            isPreview: false
        });
    }

    onClickNext(e) {
        e.preventDefault();
        this.props.getAppStatus();
        const appStatus = this.props.appStatus;
        this.props.getBusinessOptionFromUrl(appStatus.currentBusinessOption.links.next);
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

    render() {
        const {appStatus} = this.props;
        const {image, affiliateLink} = this.state;
        const currentBusinessOption = appStatus.currentBusinessOption;

        return (
            <div>
                <div className="content-wrap"
                     dangerouslySetInnerHTML={{__html: currentBusinessOption.content}}/>
                <form onSubmit={(e) => this.handleSubmit(e)}>
                    {
                        (isItemLoaded(image)) ?
                            <div>
                                <span className="remove-wrapper">
                                    <a className="remove" href="#" onClick={(e) => this.onClickRemove(e)}>
                                        <i className="fa fa-remove" aria-hidden="true"></i>
                                    </a>
                                    <img className="alert-frm-img" src={image}/>
                                </span>
                                {
                                    this.state.isPreview ?
                                        <button className="btn btn-default btn-lg btn-done">Done</button>
                                        :
                                        <button onClick={(e) => this.onClickRemove(e)}
                                                className="btn btn-default btn-lg btn-done">Change</button>
                                }
                            </div>
                            :
                            <ul className="alert-btns">
                                <li>
                                    <div className="upload-btn-wrapper">
                                        <button className="upload-button">Upload</button>
                                        <input type="file" name="image" onChange={(e) => this.handleImageChange(e)}/>
                                    </div>
                                </li>
                                <li>
                                    <a onClick={(e) => this.onClickAffiliateLink(e, appStatus.currentBusinessOption.id, affiliateLink.id, affiliateLink.link)}
                                       href={affiliateLink.link} target="new"
                                       className="upload-button">{affiliateLink.label}</a>
                                </li>
                            </ul>
                    }

                </form>
            </div>

        )

    }
}

SingleImageField.propTypes = {
    setCompletedStatus: PropTypes.func.isRequired,
    onClickNext: PropTypes.func.isRequired,
    getBusinessOptionFromUrl: PropTypes.func.isRequired,
    setBusinessMeta: PropTypes.func.isRequired,
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
            makeRequest,
            setBusinessCategoryId,
            setSellGoods,
            setCurrentTipCategory,
            addFlashMessage,
            setBusinessMeta,
        }
    )(SingleImageField))