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

class Tagline extends Component {

    constructor(props) {
        super(props);
        this.state = {
            tagline: ''
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

    onClickUpdateStatus(e, status) {
        e.preventDefault();
        saveBusinessOption(this, {
            business_option_id: this.props.appStatus.currentBusinessOption.id,
            business_option_status: status
        });
    }

    onChangeTagline(e) {
        e.preventDefault();
        this.setState({
            tagline: e.target.value
        })
    }

    render() {
        const { appStatus } = this.props;
        const currentBusinessOption = appStatus.currentBusinessOption;
        const currentBusinessMeta = currentBusinessOption.business_meta;
        const tagline = (this.state.tagline) ? this.state.tagline : ((currentBusinessMeta.tagline) ? currentBusinessMeta.tagline : '');

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
                    <a onClick={(e) => this.onClickOption(e)} href="#" className="btn btn-default btn-lg btn-alert">Done</a>
                }
                <ul className="alert-f-links">
                    <li><a
                        className={currentBusinessOption.business_business_option_status == 'skipped' ? 'active' : ''}
                        href="" onClick={(e) => this.onClickUpdateStatus(e, 'skipped')}>Not now</a></li>
                    <li><a
                        className={currentBusinessOption.business_business_option_status == 'irrelevant' ? 'active' : ''}
                        href="" onClick={(e) => this.onClickUpdateStatus(e, 'irrelevant')}>Doesn't apply to me</a></li>
                </ul>
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
    )(Tagline))