import React, {Component} from 'react';
import {withRouter} from "react-router-dom";
import {connect} from "react-redux";
import PropTypes from "prop-types";
import {
    getAppStatus,
    getBusinessCategories, getBusinessOptionFromUrl, setBusinessCategoryId, setCompletedStatus,
    setCurrentBusinessOption,
    setCurrentTipCategory,
    setSellGoods, trackClick
} from "../../../../services/actions/appStatusAction";
import { saveBusinessOptionFormRequest} from "../../../../services/actions/businessActions";
import {addFlashMessage} from "../../../../services/actions/flashMessageAction";
import {saveBusinessOption} from "../../../../utils/helper/helperFunctions";
import SelectBusinessOptionMeta from "../../../common/SelectBusinessOptionMeta";
import OptionStatusButtonGroup from "../../../common/OptionStatusButtonGroup";

class CashFlowForecasting extends Component {
    constructor(props) {
        setCompletedStatus,
        super(props);
        this.state = {
            isShowCompleted: false,
            isLast: true
        }
    }

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
                    metaKey='cash_flow_forecasting_option'
                    metaValue={currentBusinessMeta.cash_flow_forecasting_option}
                />

                <OptionStatusButtonGroup
                    current={this}
                    status={currentBusinessOption.business_business_option_status}
                />
            </div>
        )

    }
}

CashFlowForecasting.propTypes = {
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
            addFlashMessage,
            trackClick
        }
    )(CashFlowForecasting))