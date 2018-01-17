import React, {Component} from 'react';
import PropTypes from "prop-types";
import {connect} from "react-redux";
import {addFlashMessage} from "../../actions/flashMessageAction";
import {getAppStatus, getBusinessOptionFromUrl} from "../../actions/appStatusAction";
import jwt_decode from "jwt-decode";
import setAuthorizationToken from "../../utils/setAuthorizationToken";
import TextFieldGroup from "../common/TextFieldGroup";
import {saveBusinessFormRequest} from "../../actions/businessActions";
import {withRouter} from "react-router-dom";
import {validateCreateBusiness} from "../../utils/validation/BusinessValidation";

class CreateBusiness extends Component {
    constructor(props) {
        super(props);
        this.state = {
            type: "update_business",
            business_id: null,
            business_name: "",
            website: "",
            errors: {},
            isLoading: false
        };
        this.onChange = this.onChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
    }

    componentDidMount() {
        this.setState({
            business_option_id: this.props.appStatus.currentBusinessOption.id,
            business_id: this.props.appStatus.business_id,
            business_name: this.props.appStatus.business_name,
            website: this.props.appStatus.website,
        });
    }

    componentWillReceiveProps() {
        this.setState({
            business_option_id: this.props.appStatus.currentBusinessOption.id,
            business_id: this.props.appStatus.business_id,
            business_name: this.props.appStatus.business_name,
            website: this.props.appStatus.website,
        });
    }

    onChange(e) {
        this.setState({
            [e.target.name]: e.target.value
        });
    }

    isFormValid(data = null) {
        let input = (data) ? data : this.state;
        const { errors, isValid } = validateCreateBusiness(input);

        console.log('is form valid', errors);

        if(! isValid) {
            this.setState({ errors });
        }

        return isValid;
    }

    onSubmit(e) {
        e.preventDefault();
        const appStatus = this.props.appStatus;
        if (this.isFormValid()) {
            this.setState({
                errors: {},
                isLoading: true,
            });

            if (!appStatus.user_id || !appStatus.business_id) {
                this.props.addFlashMessage({
                    type: "error",
                    text: "You need to create an account before creating business"
                });
                return;
            }

            this.props.saveBusinessFormRequest(this.state, appStatus.currentBusinessOption.links.self).then(
                (response) => {
                    this.setState({isLoading: false});
                    const token = response.data.token;

                    if (token) {
                        localStorage.setItem("jwtToken", token);
                        setAuthorizationToken(token);
                        this.props.setCurrentUser(jwt_decode(token).user);
                    }
                    this.props.getAppStatus();
                    this.props.addFlashMessage({
                        type: "success",
                        text: "Saved successfully!"
                    });
                    this.props.getBusinessOptionFromUrl(appStatus.currentBusinessOption.links.next);
                },
                ( error ) => this.setState({errors: error.response.data.error, isLoading: false})
            );
        }
    }


    render() {
        const { appStatus } = this.props;
        const errors = this.state.errors;

        return (
            <form className="apps-form" onSubmit={this.onSubmit}>
                <TextFieldGroup
                    error={errors.business_name}
                    label="Your Business Name *"
                    placeholder="eg. John's Bakery LTD PTD"
                    onChange={this.onChange}
                    value={(this.state.business_name) ? this.state.business_name : appStatus.business_name}
                    type="text"
                    field="business_name"
                />

                <TextFieldGroup
                    error={errors.website}
                    label="Your Business Website *"
                    placeholder="eg. http://johnsbakery.com.au"
                    onChange={this.onChange}
                    value={(this.state.website) ? this.state.website : appStatus.website}
                    type="text"
                    field="website"
                />

                <span className="find-web-span">Don’t have a web address?</span><a href={ appStatus.currentBusinessOption.affiliate_links[0].link } target="new" className="btn btn-lg btn-default clearfix btn-level-5">Find me a web address</a>

                <div className="btn-wrap">
                    <button disabled={ this.state.isLoading } className="btn btn-default btn-md">Continue</button>
                </div>
            </form>
        );
    }
}

CreateBusiness.propTypes = {
    appStatus: PropTypes.object.isRequired,
    auth: PropTypes.object.isRequired,
    saveBusinessFormRequest: PropTypes.func.isRequired,
    addFlashMessage: PropTypes.func.isRequired,
    getBusinessOptionFromUrl: PropTypes.func.isRequired,
    getAppStatus: PropTypes.func.isRequired
};


function mapStateToProps(state) {
    return {
        appStatus: state.appStatusReducer,
        auth: state.authReducer
    }
}

export default withRouter(connect(mapStateToProps, {
    saveBusinessFormRequest,
    addFlashMessage,
    getBusinessOptionFromUrl,
    getAppStatus
})(CreateBusiness));