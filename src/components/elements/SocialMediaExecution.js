import React, {Component} from 'react';
import {withRouter} from "react-router-dom";
import {connect} from "react-redux";
import PropTypes from "prop-types";
import {
    getAppStatus,
    getBusinessCategories, getBusinessOptionFromUrl, setBusinessCategoryId, setCompletedStatus,
    setCurrentBusinessOption,
    setCurrentTipCategory,
    setSellGoods
} from "../../actions/appStatusAction";
import { saveBusinessOptionFormRequest} from "../../actions/businessActions";
import {addFlashMessage} from "../../actions/flashMessageAction";
import SelectBusinessOptionMeta from "../common/SelectBusinessOptionMeta";
import OptionStatusButtonGroup from "../common/OptionStatusButtonGroup";

class SocialMediaExecution extends Component {

    onClickNext(e) {
        e.preventDefault();
        this.props.getAppStatus();
        const appStatus = this.props.appStatus;
        this.props.getBusinessOptionFromUrl(appStatus.currentBusinessOption.links.next);
    }


    render() {
        const { appStatus } = this.props;
        const currentBusinessOption = appStatus.currentBusinessOption;
        const currentBusinessMeta = currentBusinessOption.business_meta;

        return (
            <div>
                <SelectBusinessOptionMeta
                    current={this}
                    currentBusinessOption={currentBusinessOption}
                    metaKey='social_media_execution'
                    metaValue={currentBusinessMeta.social_media_execution}
                />

                <OptionStatusButtonGroup
                    current={this}
                    status={currentBusinessOption.business_business_option_status}
                />
            </div>

        )

    }
}

SocialMediaExecution.propTypes = {
    getBusinessCategories: PropTypes.func.isRequired,
    setBusinessCategoryId: PropTypes.func.isRequired,
    setSellGoods: PropTypes.func.isRequired,
    setCurrentTipCategory: PropTypes.func.isRequired,
    setCurrentBusinessOption: PropTypes.func.isRequired,
    setCompletedStatus: PropTypes.func.isRequired,
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
            setCompletedStatus,
            getBusinessOptionFromUrl,
            saveBusinessOptionFormRequest,
            getAppStatus,
            addFlashMessage
        }
    )(SocialMediaExecution))