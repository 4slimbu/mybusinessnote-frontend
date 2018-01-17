import React, {Component} from 'react';
import {withRouter} from "react-router-dom";
import {connect} from "react-redux";
import PropTypes from "prop-types";
import {
    getAppStatus,
    getBusinessCategories, getBusinessOptionFromUrl, setBusinessCategoryId, setCurrentTipCategory,
    setSellGoods
} from "../../actions/appStatusAction";
import {map} from "lodash";
import {saveBusinessFormRequest} from "../../actions/businessActions";
import {addFlashMessage} from "../../actions/flashMessageAction";

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
        this.props.getAppStatus();
        const appStatus = this.props.appStatus;
        const query = (appStatus.business_category_id) ? '?business_category_id=' + appStatus.business_category_id : '';
        this.props.getBusinessOptionFromUrl(appStatus.currentBusinessOption.links.next, query);
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
                appStatus.currentBusinessOption.links.self
                ).then(
                (response) => {
                    this.setState({isLoading: false});
                    this.props.addFlashMessage({
                        type: "success",
                        text: "Saved successfully!"
                    });
                    this.props.getAppStatus();
                }
            );
        }
    }

    render() {
        const { appStatus } = this.props;
        const next = (appStatus.currentBusinessOption.links && appStatus.business_category_id !== null) ? appStatus.currentBusinessOption.links.next : null;
        const selectedCategory = appStatus.businessCategories[appStatus.business_category_id];
        const sellGoodsCategory = (
            selectedCategory &&
            <li key={selectedCategory.id} style={{ maxWidth: "150px" }} className="active">
                <a className="white-icon" href="#">
                    <img src={selectedCategory.white_icon} alt=""/>
                </a>
                <a className="red-icon" href="#">
                    <img src={selectedCategory.red_icon} alt=""/>
                </a>
                <span> <a href="#">{selectedCategory.name}</a></span>
                <a className="apps-question" href="#"><i className="fa fa-lightbulb-o" aria-hidden="true"></i>
                </a>
            </li>
        );

        const sellGoodsQuestion = (
            <div>
                <ul className="apps-icons clearfix">
                    {sellGoodsCategory}
                </ul>
                <h3>Will you be selling goods online?</h3>
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
                <ul className="apps-icons clearfix apps-h-effect">
                    { sellGoodsQuestion }
                </ul>
                <div className="btn-wrap">
                    {next && <button onClick={(e) => this.onClickNext(e)} className="btn btn-default btn-md">Continue</button>}
                </div>
            </div>

        )

        // return (
        //     <div>here</div>
        // )
    }
}

SellGoods.propTypes = {
    getBusinessCategories: PropTypes.func.isRequired,
    setBusinessCategoryId: PropTypes.func.isRequired,
    setSellGoods: PropTypes.func.isRequired,
    setCurrentTipCategory: PropTypes.func.isRequired,
    onClickNext: PropTypes.func.isRequired,
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
            getBusinessOptionFromUrl,
            saveBusinessFormRequest,
            getAppStatus,
            addFlashMessage
        }
    )(SellGoods))