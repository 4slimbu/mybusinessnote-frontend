import React, {Component} from 'react';
import {withRouter} from "react-router-dom";
import {connect} from "react-redux";
import PropTypes from "prop-types";
import {
    getAppStatus,
    getBusinessCategories, getBusinessOptionFromUrl, setBusinessCategoryId, setCurrentBusinessOption,
    setCurrentTipCategory,
    setSellGoods
} from "../../actions/appStatusAction";
import { saveBusinessOptionFormRequest} from "../../actions/businessActions";
import {addFlashMessage} from "../../actions/flashMessageAction";

class Logo extends Component {

    constructor(props) {
        super(props);
        this.state = {file: '',imagePreviewUrl: ''};
    }

    _handleSubmit(e) {
        e.preventDefault();
        console.log('handle uploading-', this.state.file);

        this.props.saveBusinessOptionFormRequest({
                business_option_id: this.props.appStatus.currentBusinessOption.id,
                business_meta: {
                    logo: this.state.file
                }
            }
        ).then(
            (response) => {
                this.props.addFlashMessage({
                    type: "success",
                    text: "Saved successfully!"
                });
                console.log('financing option: response', response.data.business_option);
                this.props.setCurrentBusinessOption(response.data.business_option);
            }
        );
    }

    _handleImageChange(e) {
        e.preventDefault();

        let reader = new FileReader();
        let file = e.target.files[0];

        reader.onloadend = () => {
            this.setState({
                file: file,
                imagePreviewUrl: reader.result
            });
        }

        reader.readAsDataURL(file)
    }

    onClickRemove(e) {
        e.preventDefault();
        this.setState({
            imagePreviewUrl: ''
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

        this.props.saveBusinessOptionFormRequest({
            business_option_id: this.props.appStatus.currentBusinessOption.id,
            business_option_status: status
        }).then(
            (response) => {
                this.props.addFlashMessage({
                    type: "success",
                    text: "Saved successfully!"
                });
                console.log('financing option: response', response.data.business_option);
                this.props.setCurrentBusinessOption(response.data.business_option);
            }
        );
    }

    render() {
        const { appStatus } = this.props;
        const currentBusinessOption = appStatus.currentBusinessOption;
        const currentBusinessMeta = currentBusinessOption.business_meta;
        const affiliateLink = (currentBusinessOption.affiliate_links[0]) ? currentBusinessOption.affiliate_links[0].link : '#';

        let {imagePreviewUrl} = this.state;
        let imagePreview = null;
        if (imagePreviewUrl) {
            imagePreview = (<img className="alert-frm-img" src={imagePreviewUrl} />);
        }

        return (
            <div>
                <form onSubmit={(e)=>this._handleSubmit(e)}>
                    {
                        imagePreview ?
                            <div>
                                <span className="remove-wrapper">
                                    <a className="remove" href="#" onClick={(e) => this.onClickRemove(e)}><i class="fa fa-remove" aria-hidden="true"></i></a>
                                    { imagePreview }
                                </span>
                                <button className="btn btn-default btn-lg btn-done">Done</button>
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
            addFlashMessage
        }
    )(Logo))