import React, {Component} from 'react';
import {withRouter} from "react-router-dom";
import {connect} from "react-redux";
import PropTypes from "prop-types";
import {
    getAppStatus,
    getBusinessCategories, getBusinessOptionFromUrl, setBusinessCategoryId, setBusinessMeta, setCurrentBusinessOption,
    setCurrentTipCategory,
    setSellGoods
} from "../../actions/appStatusAction";
import { saveBusinessOptionFormRequest} from "../../actions/businessActions";
import {addFlashMessage} from "../../actions/flashMessageAction";
import {API_BASE_IMAGE_URL, API_BASE_URL} from "../../config";
import {saveBusinessOption} from "../navigation/helperFunctions";

class Logo extends Component {

    constructor(props) {
        super(props);
        this.state = {
            file: '',
            imagePreviewUrl: '',
            isPreview: true
        };
    }

    _handleSubmit(e) {
        e.preventDefault();
        console.log('handle uploading-', this.state.file);

        saveBusinessOption(this, {
            business_option_id: this.props.appStatus.currentBusinessOption.id,
            business_meta: {
                logo: this.state.imagePreviewUrl
            }
        });
    }

    _handleImageChange(e) {
        e.preventDefault();

        let reader = new FileReader();
        let file = e.target.files[0];

        reader.onloadend = () => {
            this.setState({
                file: file,
                imagePreviewUrl: reader.result,
                isPreview: true
            });
        };

        reader.readAsDataURL(file)
    }

    onClickRemove(e) {
        e.preventDefault();
        this.setState({
            imagePreviewUrl: '',
            isPreview: false
        });
    }

    onClickNext(e) {
        e.preventDefault();
        this.props.getAppStatus();
        const appStatus = this.props.appStatus;
        this.props.getBusinessOptionFromUrl(appStatus.currentBusinessOption.links.next);
    }

    onClickUpdateStatus(e, status) {
        e.preventDefault();

        saveBusinessOption(this, {
            business_option_id: this.props.appStatus.currentBusinessOption.id,
            business_option_status: status
        });
    }

    render() {
        const { appStatus } = this.props;
        const currentBusinessOption = appStatus.currentBusinessOption;
        const currentBusinessMeta = currentBusinessOption.business_meta;
        const affiliateLink = (currentBusinessOption.affiliate_links[0]) ? currentBusinessOption.affiliate_links[0].link : '#';

        let imagePreview = null;

        const logo = (this.state.imagePreviewUrl) ? this.state.imagePreviewUrl :
            ((currentBusinessMeta.logo) ? API_BASE_IMAGE_URL + '/images/business-options/' + currentBusinessMeta.logo : null);
        if (logo) {
            imagePreview = (<img className="alert-frm-img" src={logo} />);
        }

        return (
            <div>
                <form onSubmit={(e)=>this._handleSubmit(e)}>
                    {
                        (this.state.isPreview && imagePreview) ?
                            <div>
                                <span className="remove-wrapper">
                                    <a className="remove" href="#" onClick={(e) => this.onClickRemove(e)}><i className="fa fa-remove" aria-hidden="true"></i></a>
                                    { imagePreview }
                                </span>
                                {
                                    this.state.imagePreviewUrl ?
                                    <button className="btn btn-default btn-lg btn-done">Done</button>
                                        :
                                        <button onClick={(e) => this.onClickRemove(e)} className="btn btn-default btn-lg btn-done">Change</button>
                                }
                            </div>
                            :
                            <ul className="alert-btns">
                                <li>
                                    <div className="upload-btn-wrapper">
                                        <button className="upload-button">Upload</button>
                                        <input type="file" name="logo" onChange={(e)=>this._handleImageChange(e)}/>
                                    </div>
                                </li>
                                <li>
                                    <a href={ affiliateLink } target="new" className="upload-button">Create One</a>
                                </li>
                            </ul>
                    }

                    <ul className="alert-f-links">
                        <li><a
                            className={currentBusinessOption.business_business_option_status == 'skipped' ? 'active' : ''}
                            href="" onClick={(e) => this.onClickUpdateStatus(e, 'skipped')}>Not now</a></li>
                        <li><a
                            className={currentBusinessOption.business_business_option_status == 'irrelevant' ? 'active' : ''}
                            href="" onClick={(e) => this.onClickUpdateStatus(e, 'irrelevant')}>Doesn't apply to me</a></li>
                    </ul>
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
    onClickNext: PropTypes.func.isRequired,
    getBusinessOptionFromUrl: PropTypes.func.isRequired,
    saveBusinessOptionFormRequest: PropTypes.func.isRequired,
    getAppStatus: PropTypes.func.isRequired,
    setBusinessMeta: PropTypes.func.isRequired,
    addFlashMessage: PropTypes.func.isRequired
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
            getBusinessOptionFromUrl,
            saveBusinessOptionFormRequest,
            getAppStatus,
            addFlashMessage,
            setBusinessMeta
        }
    )(Logo))