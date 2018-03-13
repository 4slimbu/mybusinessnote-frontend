import React, {Component} from 'react';
import {withRouter} from "react-router-dom";
import {connect} from "react-redux";
import PropTypes from "prop-types";
import {setCurrentTipCategory, setSellGoods} from "../../../../actions/appStatusAction";
import {getById, isItemLoaded} from "../../../../utils/helper/helperFunctions";
import request from "../../../../services/request";
import {makeRequest} from "../../../../actions/requestAction";
import {debounce} from "lodash";
import {ROUTES} from "../../../../constants/routes";

class SellGoods extends Component {
    constructor(props) {
        super(props);

        this.handleSelectSellGoods = debounce(this.handleSelectSellGoods.bind(this), 300);
    }

    handleToolTip(e, id) {
        e.preventDefault();
        this.props.setCurrentTipCategory(id);
    }

    onClickNext(e) {
        e.preventDefault();
        const {history} = this.props;
        history.push(ROUTES.ABOUT_YOU);
    }

    handleSelectSellGoods(e, sellGoods) {
        e.persist();

        if (this.props.auth.isAuthenticated) {
            this.props.makeRequest(request.Business.save, {
                business_option_id: this.props.appStatus.currentBusinessOption.id,
                sell_goods: sellGoods
            });
        } else {
            this.props.setSellGoods(sellGoods);
        }
    }

    render() {
        const {appStatus} = this.props;
        const {business} = appStatus;
        const next = business.business_category_id !== null;
        const selectedCategory = getById(appStatus.businessCategories, business.business_category_id);
        const sellGoodsCategory = (
            selectedCategory &&
            <li key={selectedCategory.id} style={{maxWidth: "150px"}} className="active">
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
                    <a href="#" className={`btn btn-default btn-md ${appStatus.business.sell_goods ? 'active' : ''}`}
                       onClick={(e) => this.handleSelectSellGoods(e, 1)}>Yes</a>
                    <a href="#" className={`btn btn-default btn-md ${appStatus.business.sell_goods ? '' : 'active'}`}
                       onClick={(e) => this.handleSelectSellGoods(e, 0)}>No</a>
                </div>
            </div>
        );

        return (
            <div>
                {sellGoodsQuestion}
                <div className="btn-wrap">
                    {next &&
                    <button onClick={(e) => this.onClickNext(e)} className="btn btn-default btn-md">Continue</button>}
                </div>
            </div>

        )

    }
}

SellGoods.propTypes = {
    appStatus: PropTypes.object.isRequired,
    setSellGoods: PropTypes.func.isRequired,
    setCurrentTipCategory: PropTypes.func.isRequired,
    onClickNext: PropTypes.func.isRequired,
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
            setSellGoods,
            setCurrentTipCategory,
        }
    )(SellGoods))