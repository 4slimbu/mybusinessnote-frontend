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

class MerchantFacilities extends Component {

    onClickNext(e) {
        e.preventDefault();
        this.props.getAppStatus();
        const appStatus = this.props.appStatus;
        this.props.getBusinessOptionFromUrl(appStatus.currentBusinessOption.links.next);
    }

    onClickOption(e, option) {
        e.preventDefault();

        this.props.saveBusinessOptionFormRequest({
                business_option_id: this.props.appStatus.currentBusinessOption.id,
                business_meta: {
                    merchant_facilities: option
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

        return (
            <div>
                <ul className="alert-btns">
                    <li><a
                        className={ currentBusinessMeta.merchant_facilities == 'option 1' ? 'active' : '' }
                        href="" onClick={(e) => this.onClickOption(e, 'option 1')}>Option 1</a></li>
                    <li><a
                        className={ currentBusinessMeta.merchant_facilities == 'option 2' ? 'active' : '' }
                        href="" onClick={(e) => this.onClickOption(e, 'option 2')}>Option 2</a></li>
                </ul>
                <ul className="alert-f-links">
                    <li><a
                        className={currentBusinessOption.business_business_option_status == 'skipped' ? 'active' : ''}
                        href="" onClick={(e) => this.onClickUpdateStatus(e, 'skipped')}>Not now</a></li>
                    <li><a
                        className={currentBusinessOption.business_business_option_status == 'irrelevant' ? 'active' : ''}
                        href="" onClick={(e) => this.onClickUpdateStatus(e, 'irrelevant')}>Doesn't apply to me</a></li>
                </ul>
            </div>

        )

    }
}

MerchantFacilities.propTypes = {
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
    )(MerchantFacilities))