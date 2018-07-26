import React, {Component} from 'react';
import {withRouter} from "react-router-dom";
import {connect} from "react-redux";
import PropTypes from "prop-types";
import {setBusinessCategoryId, setCurrentTipCategory, setSellGoods} from "../../../../actions/appStatusAction";
import {addFlashMessage} from "../../../../actions/flashMessageAction";
import {generateAppRelativeUrl, getByKey, isItemLoaded} from "../../../../utils/helper/helperFunctions";
import * as classnames from "classnames";
import {makeRequest} from "../../../../actions/requestAction";
import request from "../../../../services/request";
import {MESSAGES} from "../../../../constants/messages";

class BrandColor extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isChanged: false,
            isOwnColor: false,
            isBrandColorActive: true,
            brand_color: '',
            sec_brand_color: '',
            affiliateLink: {}
        }
    }

    componentDidMount() {
        const {appStatus} = this.props;
        const {currentBusinessOption} = appStatus;
        const {businessMetas, affiliateLinks} = currentBusinessOption;

        const brandColorObject = getByKey(businessMetas, 'key', 'brand_color');
        const secBrandColorObject = getByKey(businessMetas, 'key', 'sec_brand_color');
        this.setState({
            ...this.state,
            brand_color: isItemLoaded(brandColorObject) ? brandColorObject.value : '',
            sec_brand_color: isItemLoaded(secBrandColorObject) ? secBrandColorObject.value : '',
            affiliateLink: isItemLoaded(affiliateLinks) ? affiliateLinks[0] : {}
        });
    }

    handleSubmit(e) {
        e.preventDefault();

        this.props.makeRequest(request.BusinessOption.save, {
            id: this.props.appStatus.currentBusinessOption.id,
            input: {
                business_option_id: this.props.appStatus.currentBusinessOption.id,
                business_meta: {
                    brand_color: this.state.brand_color,
                    sec_brand_color: this.state.sec_brand_color
                }
            }
        }, {message: MESSAGES.SAVING}).then((response) => {
            let {appStatus, history} = this.props;
            let {currentLevel, currentSection, currentBusinessOption} = appStatus;
            let backUrl = generateAppRelativeUrl(currentLevel.slug, currentSection.slug);
            if (currentBusinessOption.parent_id) {
                backUrl = generateAppRelativeUrl(currentLevel.slug, currentSection.slug, currentBusinessOption.parent_id);
            }
            history.push(backUrl);
        });
    }

    onClickNext(e) {
        e.preventDefault();
        this.props.getAppStatus();
        const appStatus = this.props.appStatus;
        this.props.getBusinessOptionFromUrl(appStatus.currentBusinessOption.links.next);
    }

    onClickAffiliateLink(e, boId, affId, link) {
        e.preventDefault();

        this.props.makeRequest(request.Track.click, {
            boId: boId,
            affId: affId
        });

        setTimeout(function () {
            window.open(link, '_blank');
        }, 1000);
    }


    onClickOption(e, option) {
        e.preventDefault();

        if (this.state.isBrandColorActive) {
            this.setState({
                ...this.state,
                isChanged: true,
                brand_color: option
            })
        } else {
            this.setState({
                ...this.state,
                isChanged: true,
                sec_brand_color: option
            })
        }

    }

    onClickOwnColor(e) {
        e.preventDefault();
        this.setState({
            ...this.state,
            isOwnColor: !this.state.isOwnColor
        })
    }

    onClickBrandColor(e) {
        e.preventDefault();

        this.setState({
            ...this.state,
            isBrandColorActive: true
        })
    }

    onClickSecBrandColor(e) {
        e.preventDefault();

        this.setState({
            ...this.state,
            isBrandColorActive: false
        })
    }

    onChangeBrandColor(e) {
        e.preventDefault();
        this.setState({
            ...this.state,
            brand_color: e.target.value
        })
    }

    onChangeSecBrandColor(e) {
        e.preventDefault();
        this.setState({
            ...this.state,
            sec_brand_color: e.target.value
        })
    }

    render() {
        const {appStatus} = this.props;
        const currentBusinessOption = appStatus.currentBusinessOption;
        const {brand_color, sec_brand_color} = this.state;

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
                    <form className="alert-form" style={{margin: '18px auto 0'}}>
                        <div className="form-group">
                            <input type="text"
                                   onChange={(e) => this.onChangeBrandColor(e)}
                                   className="form-control" name="brand-color" placeholder="eg. #3c5693"
                                   value={brand_color}
                            />
                            <input type="text"
                                   onChange={(e) => this.onChangeSecBrandColor(e)}
                                   className="form-control" name="sec-brand-color" placeholder="eg. #3c5693"
                                   value={sec_brand_color}
                            />
                        </div>
                    </form>
                }
                <ul className="colors-sample">
                    <li className={classnames("", {"active": this.state.isBrandColorActive})}>
                        <a href=""
                           onClick={(e) => this.onClickBrandColor(e)}
                           style={{backgroundColor: brand_color}}></a>
                    </li>
                    <li className={classnames("", {"active": !this.state.isBrandColorActive})}>
                        <a href=""
                           onClick={(e) => this.onClickSecBrandColor(e)}
                           style={{backgroundColor: sec_brand_color}}></a>
                    </li>
                </ul>
                <a href="#" onClick={(e) => this.handleSubmit(e)} className="btn btn-default btn-lg btn-alert">Done</a>

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
            makeRequest,
            setBusinessCategoryId,
            setSellGoods,
            setCurrentTipCategory,
            addFlashMessage
        }
    )(BrandColor))