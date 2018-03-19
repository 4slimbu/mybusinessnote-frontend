import React, {Component} from 'react';
import {withRouter} from "react-router-dom";
import {connect} from "react-redux";
import PropTypes from "prop-types";
import {
    setBusinessCategoryId, setBusinessMeta, setCurrentTipCategory,
    setSellGoods
} from "../../../../actions/appStatusAction";
import {addFlashMessage} from "../../../../actions/flashMessageAction";
import OptionStatusButtonGroup from "../../../common/OptionStatusButtonGroup";
import {makeRequest} from "../../../../actions/requestAction";
import request from "../../../../services/request";
import {getByKey, isItemLoaded} from "../../../../utils/helper/helperFunctions";
import {MESSAGES} from "../../../../constants/messages";

class Logo extends Component {

    constructor(props) {
        super(props);
        this.state = {
            file: '',
            logo: '',
            affiliateLink: {},
            isPreview: false
        };

        this.handleSubmit = this.handleSubmit.bind(this);
        this.onClickRemove = this.onClickRemove.bind(this);
        this.onClickNext = this.onClickNext.bind(this);
        this.onClickAffiliateLink = this.onClickAffiliateLink.bind(this);
        this.onClickUpdateStatus = this.onClickUpdateStatus.bind(this);
    }

    componentDidMount() {
        const {appStatus} = this.props;
        const {currentBusinessOption} = appStatus;
        const {businessMetas, affiliateLinks} = currentBusinessOption;

        if (isItemLoaded(businessMetas)) {
            const logoObject = getByKey(businessMetas, 'key', 'logo');
            if (isItemLoaded(logoObject)) {
                this.setState({
                    ...this.state,
                    logo: logoObject.value,
                    affiliateLink: isItemLoaded(affiliateLinks) ? affiliateLinks[0] : {}
                });
            }

        }
    }

    handleSubmit(e) {
        e.preventDefault();

        this.props.makeRequest(request.BusinessOption.save, {
            id: this.props.appStatus.currentBusinessOption.id,
            input:{
                business_option_id: this.props.appStatus.currentBusinessOption.id,
                business_meta: {
                    logo: this.state.logo
                }
            }
        }, {message: MESSAGES.SAVING});
    }

    handleImageChange(e) {
        e.preventDefault();

        let reader = new FileReader();
        let file = e.target.files[0];

        reader.onloadend = () => {
            this.setState({
                file: file,
                logo: reader.result,
                isPreview: true
            });
        };

        reader.readAsDataURL(file)
    }

    onClickRemove(e) {
        e.preventDefault();
        this.setState({
            ...this.state,
            logo: '',
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

    onClickUpdateStatus(e, status) {
        e.preventDefault();

        this.props.makeRequest(request.BusinessOption.save, {
            id: this.props.appStatus.currentBusinessOption.id,
            input:{
                business_option_status: status
            }
        }, {message: MESSAGES.SAVING});
    };

    render() {
        const {appStatus} = this.props;
        const currentBusinessOption = appStatus.currentBusinessOption;
        const {logo, affiliateLink} = this.state;

        const optionStatusButtonGroupProps = {
            status: currentBusinessOption.status,
            onClickUpdateStatus: this.onClickUpdateStatus,
        };

        return (
            <div>
                <form onSubmit={(e) => this.handleSubmit(e)}>
                    {
                        (isItemLoaded(logo)) ?
                            <div>
                                <span className="remove-wrapper">
                                    <a className="remove" href="#" onClick={(e) => this.onClickRemove(e)}>
                                        <i className="fa fa-remove" aria-hidden="true"></i>
                                    </a>
                                    <img className="alert-frm-img" src={logo}/>
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
                                        <input type="file" name="logo" onChange={(e) => this.handleImageChange(e)}/>
                                    </div>
                                </li>
                                <li>
                                    <a onClick={(e) => this.onClickAffiliateLink(e, appStatus.currentBusinessOption.id, affiliateLink.id, affiliateLink.link)}
                                       href={affiliateLink.link} target="new"
                                       className="upload-button">{affiliateLink.label}</a>
                                </li>
                            </ul>
                    }

                    <OptionStatusButtonGroup {...optionStatusButtonGroupProps}/>
                </form>
            </div>

        )

    }
}

Logo.propTypes = {
    getBusinessCategories: PropTypes.func.isRequired,
    setBusinessCategoryId: PropTypes.func.isRequired,
    setSellGoods: PropTypes.func.isRequired,
    setCurrentTipCategory: PropTypes.func.isRequired,
    setCurrentBusinessOption: PropTypes.func.isRequired,
    setCompletedStatus: PropTypes.func.isRequired,
    onClickNext: PropTypes.func.isRequired,
    getBusinessOptionFromUrl: PropTypes.func.isRequired,
    getAppStatus: PropTypes.func.isRequired,
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
    )(Logo))