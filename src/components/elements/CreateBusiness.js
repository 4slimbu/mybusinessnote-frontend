import React, {Component} from 'react';
import PropTypes from "prop-types";
import {connect} from "react-redux";
import {addFlashMessage} from "../../actions/flashMessageAction";
import {getBusinessOptionFromUrl} from "../../actions/appStatusAction";
import jwt_decode from "jwt-decode";
import setAuthorizationToken from "../../utils/setAuthorizationToken";
import {validateInput} from "../../utils/validation/SignUpFormValidation";
import TextFieldGroup from "../common/TextFieldGroup";
import {createBusinessFormRequest} from "../../actions/businessActions";
import {withRouter} from "react-router-dom";
import {validateCreateBusiness} from "../../utils/validation/CreateBusinessValidation";

class CreateBusiness extends Component {
    constructor(props) {
        super(props);
        this.state = {
            business_name: "",
            website: "",
            user_id: "",
            business_category_id: "",
            sell_goods: "",
            errors: {},
            isLoading: false
        };
        this.onChange = this.onChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
    }

    componentWillReceiveProps() {
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
        if (this.isFormValid()) {
            this.setState({
                errors: {},
                isLoading: true,
            });

            if (!this.state.business_category_id) {
                this.props.addFlashMessage({
                    type: "error",
                    text: "You haven't selected any business category"
                });
                return;
            }

            if (!this.state.user_id) {
                this.props.addFlashMessage({
                    type: "error",
                    text: "You need to create an account before creating business"
                });
                return;
            }

            this.props.createBusinessFormRequest(this.state).then(
                (response) => {
                    this.setState({isLoading: false});

                    const token = response.data.token;
                    localStorage.setItem("jwtToken", token);
                    setAuthorizationToken(token);
                    this.props.setCurrentUser(jwt_decode(token).user);

                    this.props.addFlashMessage({
                        type: "success",
                        text: "You have created your business successfully!"
                    });
                    this.props.getBusinessOptionFromUrl(this.props.appStatus.currentBusinessOption.links.next);
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
                    value={this.state.business_name}
                    type="text"
                    field="business_name"
                />

                <TextFieldGroup
                    error={errors.website}
                    label="Your Business Website *"
                    placeholder="eg. http://johnsbakery.com.au"
                    onChange={this.onChange}
                    value={this.state.website}
                    type="text"
                    field="website"
                />

                <span className="find-web-span">Don’t have a web address?</span><a href={ appStatus.currentBusinessOption.data.affiliate_links[0].link } target="new" className="btn btn-lg btn-default clearfix btn-level-5">Find me a web address</a>

                <div className="btn-wrap">
                    <button disabled={ this.state.isLoading } className="btn btn-default btn-md">Continue</button>
                </div>
            </form>
        );
    }
}

CreateBusiness.propTypes = {
    appStatus: PropTypes.func.isRequired,
    auth: PropTypes.func.isRequired,
    createBusinessFormRequest: PropTypes.func.isRequired,
    addFlashMessage: PropTypes.func.isRequired,
    getBusinessOptionFromUrl: PropTypes.func.isRequired
};


function mapStateToProps(state) {
    return {
        appStatus: state.appStatusReducer,
        auth: state.authReducer
    }
}

export default withRouter(connect(mapStateToProps, {
    createBusinessFormRequest,
    addFlashMessage,
    getBusinessOptionFromUrl
})(CreateBusiness));