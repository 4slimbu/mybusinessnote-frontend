import React, {Component} from 'react';
import {withRouter} from "react-router-dom";
import {connect} from "react-redux";
import PropTypes from "prop-types";
import {setBusinessCategoryId, setCurrentTipCategory, setSellGoods} from "../../../../actions/appStatusAction";
import {addFlashMessage} from "../../../../actions/flashMessageAction";
import {saveBusinessOption} from "../../../../utils/helper/helperFunctions";
import OptionStatusButtonGroup from "../../../common/OptionStatusButtonGroup";

class Tagline extends Component {

    constructor(props) {
        super(props);
        this.state = {
            tagline: '',
            isChanged: false
        };
    }

    onClickNext(e) {
        e.preventDefault();
        this.props.getAppStatus();
        const appStatus = this.props.appStatus;
        this.props.getBusinessOptionFromUrl(appStatus.currentBusinessOption.links.next);
    }

    onClickOption(e) {
        e.preventDefault();
        saveBusinessOption(this, {
            business_option_id: this.props.appStatus.currentBusinessOption.id,
            business_meta: {
                tagline: this.state.tagline
            }
        });
    }

    onChangeTagline(e) {
        e.preventDefault();
        this.setState({
            tagline: e.target.value,
            isChanged: true
        })
    }

    render() {
        const {appStatus} = this.props;
        const currentBusinessOption = appStatus.currentBusinessOption;
        const currentBusinessMeta = currentBusinessOption.business_meta;
        const tagline = (this.state.isChanged) ? this.state.tagline : ((currentBusinessMeta.tagline) ? currentBusinessMeta.tagline : '');

        return (
            <div>
                <form className="alert-form">
                    <div className="form-group">
                        <input type="text"
                               onChange={(e) => this.onChangeTagline(e)}
                               className="form-control" name="alert-name" placeholder="eg. We deliver you safely home"
                               value={tagline}
                        />
                    </div>
                </form>
                {
                    tagline &&
                    <a onClick={(e) => this.onClickOption(e)} href="#"
                       className="btn btn-default btn-lg btn-alert">Done</a>
                }

                <OptionStatusButtonGroup
                    current={this}
                    status={currentBusinessOption.business_business_option_status}
                />
            </div>

        )

    }
}

Tagline.propTypes = {
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
            setBusinessCategoryId,
            setSellGoods,
            setCurrentTipCategory,
            addFlashMessage
        }
    )(Tagline))