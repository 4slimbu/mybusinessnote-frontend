import React, {Component} from 'react';
import {withRouter} from "react-router-dom";
import {connect} from "react-redux";
import PropTypes from "prop-types";
import {generateAppRelativeUrl, getByKey, isItemLoaded} from "../../../../utils/helper/helperFunctions";
import {makeRequest} from "../../../../actions/requestAction";
import request from "../../../../services/request";
import {MESSAGES} from "../../../../constants/messages";

class SingleTextField extends Component {

    constructor(props) {
        super(props);
        this.state = {
            metaKey: 'text_input',
            value: '',
            affiliateLink: {},
            isChanged: false
        };
    }

    componentDidMount() {
        const {appStatus} = this.props;
        const {currentBusinessOption} = appStatus;
        const {businessMetas, affiliateLinks} = currentBusinessOption;

        const valueObject = getByKey(businessMetas, 'key', this.state.metaKey);
        this.setState({
            ...this.state,
            value: isItemLoaded(valueObject) ? valueObject.value : '',
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
                    [this.state.metaKey]: this.state.value
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

    onChange(e) {
        e.preventDefault();
        this.setState({
            ...this.state,
            value: e.target.value,
            isChanged: true
        })
    }

    render() {
        const {isChanged, value} = this.state;
        const {appStatus} = this.props;
        const currentBusinessOption = appStatus.currentBusinessOption;

        return (
            <div>
                <form className="alert-form">
                    <div className="form-group">
                        <input type="text"
                               onChange={(e) => this.onChange(e)}
                               className="form-control" name="" placeholder="eg. We deliver you safely home"
                               value={value}
                        />
                    </div>
                </form>
                {
                    isChanged && value &&
                    <a onClick={(e) => this.handleSubmit(e)} href="#"
                       className="btn btn-default btn-lg btn-alert">Done</a>
                }

            </div>

        )

    }
}

SingleTextField.propTypes = {
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
    )(SingleTextField))