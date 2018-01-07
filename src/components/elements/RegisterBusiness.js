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
import {validateRegisterBusiness} from "../../utils/validation/BusinessValidation";

class RegisterBusiness extends Component {
    constructor(props) {
        super(props);
        this.state = {
            type: "update_business",
            business_id: null,
            abn: "",
            errors: {},
            isLoading: false
        };
        this.onChange = this.onChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
    }

    componentDidMount() {
        this.setState({
            business_option_id: this.props.appStatus.currentBusinessOption.data.id,
            business_id: this.props.appStatus.business_id,
            abn: this.props.appStatus.abn,
        });
    }

    componentWillReceiveProps() {
        this.setState({
            business_option_id: this.props.appStatus.currentBusinessOption.data.id,
            business_id: this.props.appStatus.business_id,
            abn: this.props.appStatus.abn,
        });
    }

    onChange(e) {
        this.setState({
            [e.target.name]: e.target.value
        });
    }

    isFormValid(data = null) {
        let input = (data) ? data : this.state;
        const { errors, isValid } = validateRegisterBusiness(input);

        console.log('is form valid', errors);

        if(! isValid) {
            this.setState({ errors });
        }

        return isValid;
    }

    onSubmit(e) {
        e.preventDefault();
        if (this.isFormValid()) {
            this.setState({
                errors: {},
                isLoading: true,
            });

            if (!this.props.appStatus.user_id || !this.props.appStatus.business_id) {
                this.props.addFlashMessage({
                    type: "error",
                    text: "You need to create an account before creating business"
                });
                return;
            }

            this.props.saveBusinessFormRequest(this.state).then(
                (response) => {
                    this.setState({isLoading: false});
                    const token = response.data.token;

                    if (token) {
                        localStorage.setItem("jwtToken", token);
                        setAuthorizationToken(token);
                        this.props.setCurrentUser(jwt_decode(token).user);
                    }
                    this.props.getAppStatus();
                    this.props.history.push('/level/' + this.props.appStatus.currentLevel.slug);
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
                    error={errors.abn}
                    label="Enter your Australian Business Number (ABN) *"
                    placeholder="eg. 3522 2525 2524"
                    onChange={this.onChange}
                    value={(this.state.abn) ? this.state.abn : appStatus.abn}
                    type="text"
                    field="abn"
                />

                <span className="find-web-span">Don’t have a ABN?</span><a href={ appStatus.currentBusinessOption.data.affiliate_links[0].link } target="new" className="btn btn-lg btn-default clearfix btn-level-5">Register for an ABN</a>

                <div className="btn-wrap">
                    <button disabled={ this.state.isLoading } className="btn btn-default btn-md">Done</button>
                </div>
            </form>
        );
    }
}

RegisterBusiness.propTypes = {
    appStatus: PropTypes.func.isRequired,
    auth: PropTypes.func.isRequired,
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
    getAppStatus,
    saveBusinessFormRequest,
    addFlashMessage,
    getBusinessOptionFromUrl
})(RegisterBusiness));