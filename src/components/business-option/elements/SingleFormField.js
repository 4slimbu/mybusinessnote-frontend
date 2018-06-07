import React, {Component} from 'react';
import {withRouter} from "react-router-dom";
import {connect} from "react-redux";
import PropTypes from "prop-types";
import {setBusinessCategoryId, setCurrentTipCategory, setSellGoods} from "../../../actions/appStatusAction";
import {addFlashMessage} from "../../../actions/flashMessageAction";
import {saveBusinessOption} from "../../../utils/helper/helperFunctions";
import OptionStatusButtonGroup from "../../common/OptionStatusButtonGroup";
import SelectBusinessOptionMeta from "../../common/SelectBusinessOptionMeta";

class SingleFormField extends Component {

    onClickNext(e) {
        e.preventDefault();
        this.props.getAppStatus();
        const appStatus = this.props.appStatus;
        this.props.getBusinessOptionFromUrl(appStatus.currentBusinessOption.links.next);
    }

    onClickOption(e, option) {
        e.preventDefault();

        saveBusinessOption(this, {
            business_option_id: this.props.appStatus.currentBusinessOption.id,
            business_meta: {
                financing_option: option
            }
        })
    }

    render() {
        const {appStatus} = this.props;
        const currentBusinessOption = appStatus.currentBusinessOption;
        const currentBusinessMeta = currentBusinessOption.business_meta;

        return (
            <div>
                <SelectBusinessOptionMeta
                    current={this}
                    currentBusinessOption={currentBusinessOption}
                    metaKey='financing_option'
                    metaValue={currentBusinessMeta.financing_option}
                />

                <OptionStatusButtonGroup
                    current={this}
                    status={currentBusinessOption.business_business_option_status}
                />
            </div>

        )

    }
}

SingleFormField.propTypes = {
    getBusinessCategories: PropTypes.func.isRequired,
    setBusinessCategoryId: PropTypes.func.isRequired,
    setSellGoods: PropTypes.func.isRequired,
    setCurrentTipCategory: PropTypes.func.isRequired,
    setCurrentBusinessOption: PropTypes.func.isRequired,
    setCompletedStatus: PropTypes.func.isRequired,
    onClickNext: PropTypes.func.isRequired,
    getBusinessOptionFromUrl: PropTypes.func.isRequired,
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
            setBusinessCategoryId,
            setSellGoods,
            setCurrentTipCategory,
            addFlashMessage,
        }
    )(SingleFormField))