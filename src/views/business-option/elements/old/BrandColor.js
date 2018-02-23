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
} from "../../../../services/actions/appStatusAction";
import { saveBusinessOptionFormRequest} from "../../../../services/actions/businessActions";
import {addFlashMessage} from "../../../../services/actions/flashMessageAction";
import {saveBusinessOption} from "../../../../utils/helper/helperFunctions";
import OptionStatusButtonGroup from "../../../common/OptionStatusButtonGroup";
import * as classnames from "classnames";

class BrandColor extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isChanged: false,
            isOwnColor: false,
            isBrandColorActive: true,
            brand_color: '',
            sec_brand_color: '',
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

        if (this.state.isBrandColorActive) {
            this.setState({
                isChanged: true,
                brand_color: option
            })
        } else {
            this.setState({
                isChanged: true,
                sec_brand_color: option
            })
        }

    }

    onClickOwnColor(e) {
        e.preventDefault();
        this.setState({
            isOwnColor: ! this.state.isOwnColor
        })
    }

    onClickBrandColor(e) {
        e.preventDefault();

        this.setState({
            isBrandColorActive: true
        })
    }

    onClickSecBrandColor(e) {
        e.preventDefault();

        this.setState({
            isBrandColorActive: false
        })
    }

    onChangeBrandColor(e) {
        e.preventDefault();
        this.setState({
            brand_color: e.target.value
        })
    }

    onChangeSecBrandColor(e) {
        e.preventDefault();
        this.setState({
            sec_brand_color: e.target.value
        })
    }

    onClickDone(e) {
        e.preventDefault();
        const { appStatus, addFlashMessage } = this.props;
        const currentBusinessOption = appStatus.currentBusinessOption;
        const currentBusinessMeta = currentBusinessOption.business_meta;
        const brandColor = (this.state.isChanged) ? this.state.brand_color : currentBusinessMeta.brand_color;
        const secBrandColor = (this.state.isChanged) ? this.state.sec_brand_color : currentBusinessMeta.sec_brand_color;
        if (typeof brandColor === 'undefined' || brandColor === '' || typeof secBrandColor === 'undefined' || secBrandColor === '') {
            addFlashMessage({
                type: "error",
                text: "Please select both colours"
            });
            return;
        }

        saveBusinessOption(this, {
            business_option_id: this.props.appStatus.currentBusinessOption.id,
            business_meta: {
                brand_color: brandColor,
                sec_brand_color: secBrandColor
            }
        });
    }

    render() {
        const { appStatus } = this.props;
        const currentBusinessOption = appStatus.currentBusinessOption;
        const currentBusinessMeta = currentBusinessOption.business_meta;
        const brandColor = (this.state.isChanged) ? this.state.brand_color : currentBusinessMeta.brand_color;
        const secBrandColor = (this.state.isChanged) ? this.state.sec_brand_color : currentBusinessMeta.sec_brand_color;
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
                            <input type="text"
                                   onChange={(e) => this.onChangeSecBrandColor(e)}
                                   className="form-control" name="sec-brand-color" placeholder="eg. #3c5693"
                                   value={secBrandColor}
                            />
                        </div>
                    </form>
                }
                <ul className="colors-sample">
                    <li className={classnames("", {"active" : this.state.isBrandColorActive })}><a href="" onClick={(e) => this.onClickBrandColor(e)} style={{ backgroundColor: brandColor }}></a></li>
                    <li className={classnames("", {"active" : !this.state.isBrandColorActive })}><a href="" onClick={(e) => this.onClickSecBrandColor(e)} style={{ backgroundColor: secBrandColor }}></a></li>
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
    )(BrandColor))