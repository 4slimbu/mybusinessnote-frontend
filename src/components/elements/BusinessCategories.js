import React, {Component} from 'react';
import {Link, withRouter} from "react-router-dom";
import {connect} from "react-redux";
import PropTypes from "prop-types";
import {
    getBusinessCategories, getBusinessOptionFromUrl, setBusinessCategoryId, setCurrentTipCategory,
    setSellGoods
} from "../../actions/appStatusAction";
import {map} from "lodash";

class BusinessCategories extends Component {
    constructor(props) {
        super(props);

        this.state = {
            selectedBusinessCategory: null,
            businessCategories: null,
            active: null,
            showSellGoodsOption: false,
        };
    }

    componentDidMount() {
        this.props.getBusinessCategories();
    }

    handleSelect(e, id) {
        e.preventDefault();

        this.props.setBusinessCategoryId(id);
        this.setState({
            showSellGoodsOption: (id != 4) ? true : false,
            active: id
        });
    }

    handleSelectSellGoods(e, sellGoods) {
        e.preventDefault();

        this.props.setSellGoods(sellGoods);
    }

    handleToolTip(e, id) {
        e.preventDefault();
        this.props.setCurrentTipCategory(id);
    }

    onClickNext(e) {
        e.preventDefault();
        this.props.getBusinessOptionFromUrl(this.props.appStatus.currentBusinessOption.links.next);
    }

    render() {
        const { appStatus, onClickNext } = this.props;
        const next = (appStatus.currentBusinessOption.links && appStatus.business_category_id !== null) ? appStatus.currentBusinessOption.links.next : null;
        const businessCategories = map(appStatus.businessCategories.data, (item, key) => {
            const active = appStatus.business_category_id == item.id ? 'active' : '';
            return (
                <li key={item.id} style={{ maxWidth: "150px" }} className={active}>
                    <div onClick={(e) => this.handleSelect(e, item.id)}>
                        <a className="white-icon" href="#">
                            <img src={item.white_icon} alt=""/>
                        </a>
                        <a className="red-icon" href="#">
                            <img src={item.red_icon} alt=""/>
                        </a>
                        <span> <a href="#">{item.name}</a></span>
                    </div>
                    <a className="apps-question" href="#" onClick={(e) => this.handleToolTip(e, item.id)}>
                        <i className="fa fa-lightbulb-o" aria-hidden="true"></i>
                    </a>
                </li>
            )
        });

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
                    {(this.state.showSellGoodsOption) ? sellGoodsQuestion : businessCategories}
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

BusinessCategories.propTypes = {
    getBusinessCategories: PropTypes.func.isRequired,
    setBusinessCategoryId: PropTypes.func.isRequired,
    setSellGoods: PropTypes.func.isRequired,
    setCurrentBusinessCategoryId: PropTypes.func.isRequired,
    setCurrentTipCategory: PropTypes.func.isRequired,
    onClickNext: PropTypes.func.isRequired,
    getBusinessOptionFromUrl: PropTypes.func.isRequired
};

function mapStateToProps(state) {
    return {
        appStatus: state.appStatusReducer
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
            getBusinessOptionFromUrl
        }
    )(BusinessCategories))