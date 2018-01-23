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
import {saveBusinessOption} from "../navigation/helperFunctions";
import OptionStatusButtonGroup from "../common/OptionStatusButtonGroup";

class MerchantFacilities extends Component {

    constructor(props) {
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

    onClickOption(e, option) {
        e.preventDefault();

        saveBusinessOption(this, {
            business_option_id: this.props.appStatus.currentBusinessOption.id,
            business_meta: {
                merchant_facilities: option
            }
        });
    }

    render() {
        const { appStatus } = this.props;
        const currentBusinessOption = appStatus.currentBusinessOption;
        const currentBusinessMeta = currentBusinessOption.business_meta;
        const affiliateLink = (currentBusinessOption.affiliate_links[0]) ? currentBusinessOption.affiliate_links[0].link : '#';

        return (
            this.state.isShowCompleted ?
                <div className="completed-section">
                    <img className="complete-tick" src={`${process.env.PUBLIC_URL}/assets/images/completed-tick.png`} alt=""/>
                    <p>Well done for completing this section!</p>
                </div>
                :
                <div>
                    <ul className="alert-btns">
                        <li><a
                            className={ currentBusinessMeta.merchant_facilities == 'yes' ? 'active' : '' }
                            href="" onClick={(e) => this.onClickOption(e, 'yes')}>Yes</a></li>
                        <li><a href={ affiliateLink }>Set up Now</a></li>
                    </ul>

                    <OptionStatusButtonGroup
                        current={this}
                        status={currentBusinessOption.business_business_option_status}
                    />
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