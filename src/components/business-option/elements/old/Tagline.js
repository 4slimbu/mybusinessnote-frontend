import React, {Component} from 'react';
import {withRouter} from "react-router-dom";
import {connect} from "react-redux";
import PropTypes from "prop-types";
import {getByKey, isItemLoaded} from "../../../../utils/helper/helperFunctions";
import OptionStatusButtonGroup from "../../../common/OptionStatusButtonGroup";
import {makeRequest} from "../../../../actions/requestAction";
import request from "../../../../services/request";
import {MESSAGES} from "../../../../constants/messages";

class Tagline extends Component {

    constructor(props) {
        super(props);
        this.state = {
            tagline: '',
            affiliateLink: {},
            isChanged: false
        };
    }

    componentDidMount() {
        const {appStatus} = this.props;
        const {currentBusinessOption} = appStatus;
        const {businessMetas, affiliateLinks} = currentBusinessOption;

        const taglineObject = getByKey(businessMetas, 'key', 'tagline');
        this.setState({
            ...this.state,
            tagline: isItemLoaded(taglineObject) ? taglineObject.value : '',
            affiliateLink: isItemLoaded(affiliateLinks) ? affiliateLinks[0] : {}
        });
    }

    handleSubmit(e) {
        e.preventDefault();

        this.props.makeRequest(request.BusinessOption.save, {
            id: this.props.appStatus.currentBusinessOption.id,
            input:{
                business_option_id: this.props.appStatus.currentBusinessOption.id,
                business_meta: {
                    tagline: this.state.tagline
                }
            }
        }, {message: MESSAGES.SAVING});
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

    onClickUpdateStatus(e, status) {
        e.preventDefault();

        this.props.makeRequest(request.BusinessOption.save, {
            id: this.props.appStatus.currentBusinessOption.id,
            input:{
                business_option_status: status
            }
        }, {message: MESSAGES.SAVING});
    };

    onChange(e) {
        e.preventDefault();
        this.setState({
            ...this.state,
            tagline: e.target.value,
            isChanged: true
        })
    }

    render() {
        const {appStatus} = this.props;
        const currentBusinessOption = appStatus.currentBusinessOption;
        const {isChanged, tagline} = this.state;

        const optionStatusButtonGroupProps = {
            status: currentBusinessOption.status,
            onClickUpdateStatus: this.onClickUpdateStatus,
        };

        return (
            <div>
                <form className="alert-form">
                    <div className="form-group">
                        <input type="text"
                               onChange={(e) => this.onChange(e)}
                               className="form-control" name="alert-name" placeholder="eg. We deliver you safely home"
                               value={tagline}
                        />
                    </div>
                </form>
                {
                    isChanged && tagline &&
                    <a onClick={(e) => this.handleSubmit(e)} href="#"
                       className="btn btn-default btn-lg btn-alert">Done</a>
                }

                <OptionStatusButtonGroup {...optionStatusButtonGroupProps}/>
            </div>

        )

    }
}

Tagline.propTypes = {
    setCurrentBusinessOption: PropTypes.func.isRequired,
    onClickNext: PropTypes.func.isRequired,
    getAppStatus: PropTypes.func.isRequired,
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
        }
    )(Tagline))