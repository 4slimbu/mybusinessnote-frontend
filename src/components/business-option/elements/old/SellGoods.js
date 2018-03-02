import React, {Component} from 'react';
import {withRouter} from "react-router-dom";
import {connect} from "react-redux";
import PropTypes from "prop-types";
import {
    getAppStatus,
    getBusinessCategories, getBusinessOption, getBusinessOptionFromUrl, setBusinessCategoryId, setCurrentTipCategory,
    setSellGoods
} from "../../../../actions/appStatusAction";
import {saveBusinessFormRequest} from "../../../../actions/businessActions";
import {addFlashMessage} from "../../../../actions/flashMessageAction";
import {getAppUrlFromApiUrl} from "../../../../utils/helper/helperFunctions";

class SellGoods extends Component {
    componentDidMount() {
        this.props.getBusinessCategories();
    }

    handleToolTip(e, id) {
        e.preventDefault();
        this.props.setCurrentTipCategory(id);
    }

    onClickNext(e) {
        e.preventDefault();
        const {appStatus, history} = this.props;
        this.props.getBusinessOption(
            appStatus.currentBusinessOption.links.next + '&business_category_id=' + appStatus.business_category_id,
            true);
        history.push(getAppUrlFromApiUrl(appStatus.currentBusinessOption.links.next));
    }

    handleSelectSellGoods(e, sellGoods) {
        e.preventDefault();

        this.props.setSellGoods(sellGoods);
        const appStatus = this.props.appStatus;

        if (this.props.auth.isAuthenticated) {
            this.props.saveBusinessFormRequest({
                business_option_id: this.props.appStatus.currentBusinessOption.id,
                sell_goods: sellGoods
            },
                '/level/1/section/1/business-option/2'
                ).then(
                (response) => {
                    this.setState({isLoading: false});
                    this.props.addFlashMessage({
                        type: "success",
                        text: "Saved successfully!"
                    });
                    this.props.getAppStatus();
                },
                (error) => {
                    this.props.addFlashMessage({
                        type: "error",
                        text: "Failed!"
                    });
                }
            );
        }
    }

    render() {
        const { appStatus } = this.props;
        const next = (appStatus.currentBusinessOption.links && appStatus.business_category_id !== null) ? appStatus.currentBusinessOption.links.next : null;
        const selectedCategory = appStatus.businessCategories.data[appStatus.business_category_id -1];
        const sellGoodsCategory = (
            selectedCategory &&
            <li key={selectedCategory.id} style={{ maxWidth: "150px" }} className="active">
                <div>
                    <a className="white-icon" href="#">
                        <img src={selectedCategory.icon} alt=""/>
                    </a>
                    <a className="red-icon" href="#">
                        <img src={selectedCategory.hover_icon} alt=""/>
                    </a>
                    <span> <a href="#">{selectedCategory.name}</a></span>
                </div>
                <a className="apps-question" href="#"><i className="fa fa-lightbulb-o" aria-hidden="true"></i>
                </a>
            </li>
        );

        const sellGoodsQuestion = (
            <div>
                <ul className="apps-icons clearfix">
                    {sellGoodsCategory}
                </ul>
                <div className="selling-goods-btns">
                    <a href="" className={`btn btn-default btn-sm ${appStatus.sell_goods ? 'active' : ''}`}
                       onClick={(e) => this.handleSelectSellGoods(e, true)}>Yes</a>
                    <a href="" className={`btn btn-default btn-sm ${appStatus.sell_goods ? '' : 'active'}`}
                       onClick={(e) => this.handleSelectSellGoods(e, false)}>No</a>
                </div>
            </div>
        );

        return (
            <div>
                { sellGoodsQuestion }
                <div className="btn-wrap">
                    {next && <button onClick={(e) => this.onClickNext(e)} className="btn btn-default btn-md">Continue</button>}
                </div>
            </div>

        )

    }
}

SellGoods.propTypes = {
    getBusinessCategories: PropTypes.func.isRequired,
    setBusinessCategoryId: PropTypes.func.isRequired,
    setSellGoods: PropTypes.func.isRequired,
    setCurrentTipCategory: PropTypes.func.isRequired,
    onClickNext: PropTypes.func.isRequired,
    getBusinessOption: PropTypes.func.isRequired,
    getBusinessOptionFromUrl: PropTypes.func.isRequired,
    saveBusinessFormRequest: PropTypes.func.isRequired,
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
            getBusinessOption,
            getBusinessOptionFromUrl,
            saveBusinessFormRequest,
            getAppStatus,
            addFlashMessage
        }
    )(SellGoods))