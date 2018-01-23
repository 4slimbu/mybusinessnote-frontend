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

class BrandColor extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isChanged: false,
            isOwnColor: false,
            brand_color: ''
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

        this.setState({
            isChanged: true,
            brand_color: option
        })
    }

    onClickOwnColor(e) {
        e.preventDefault();
        this.setState({
            isOwnColor: ! this.state.isOwnColor
        })
    }

    onChangeBrandColor(e) {
        e.preventDefault();
        this.setState({
            brand_color: e.target.value
        })
    }

    onClickDone(e) {
        e.preventDefault();

        saveBusinessOption(this, {
            business_option_id: this.props.appStatus.currentBusinessOption.id,
            business_meta: {
                brand_color: this.state.brand_color
            }
        });
    }

    render() {
        const { appStatus } = this.props;
        const currentBusinessOption = appStatus.currentBusinessOption;
        const currentBusinessMeta = currentBusinessOption.business_meta;
        const brandColor = (this.state.isChanged) ? this.state.brand_color : currentBusinessMeta.brand_color;
        return (
            <div>
                <ul className="alert-brands-colors">
                    <li><a href="" onClick={(e) => this.onClickOption(e, '#f7e461')}></a></li>
                    <li><a href="" onClick={(e) => this.onClickOption(e, '#cde1e0')}></a></li>
                    <li><a href="" onClick={(e) => this.onClickOption(e, '#a3c7e9')}></a></li>
                    <li><a href="" onClick={(e) => this.onClickOption(e, '#f79aaf')}></a></li>
                    <li><a href="" onClick={(e) => this.onClickOption(e, '#dc3c36')}></a></li>
                    <li><a href="" onClick={(e) => this.onClickOption(e, '#72a951')}></a></li>
                    <li><a href="" onClick={(e) => this.onClickOption(e, '#a082b4')}></a></li>
                    <li><a href="" onClick={(e) => this.onClickOption(e, '#3c5693')}></a></li>
                    <li><a href="" onClick={(e) => this.onClickOption(e, '#52b1b3')}></a></li>
                    <li><a href="" onClick={(e) => this.onClickOption(e, '#3c8782')}></a></li>
                </ul>
                <a href="#" onClick={(e) => this.onClickOwnColor(e)} className="add-colrs">Add your own colour</a>
                {
                    this.state.isOwnColor &&
                    <form className="alert-form" style={{ margin: '18px auto 0'}}>
                        <div className="form-group">
                            <input type="text"
                                   onChange={(e) => this.onChangeBrandColor(e)}
                                   className="form-control" name="brand-color" placeholder="eg. #3c5693"
                                   value={brandColor}
                            />
                        </div>
                    </form>
                }
                <ul className="colors-sample">
                    <li><a href="" style={{ backgroundColor: this.state.brand_color }}></a></li>
                    <li><a href="" style={{ backgroundColor: currentBusinessMeta.brand_color }}></a></li>
                </ul>
                <a href="#" onClick={(e) => this.onClickDone(e)} className="btn btn-default btn-lg btn-alert">Done</a>

                <OptionStatusButtonGroup
                    current={this}
                    status={currentBusinessOption.business_business_option_status}
                />
            </div>

        )

    }
}

BrandColor.propTypes = {
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
    )(BrandColor))