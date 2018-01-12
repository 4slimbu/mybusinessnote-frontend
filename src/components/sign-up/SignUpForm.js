import React, {Component} from "react";
import PropTypes from 'prop-types';
import jwt_decode from "jwt-decode";
import {validateEmail, validateCreateUser, validateUpdateUser} from "../../utils/validation/UserValidation";
import TextFieldGroup from "../common/TextFieldGroup";
import {withRouter} from "react-router-dom";
import setAuthorizationToken from "../../utils/setAuthorizationToken";

class SignUpForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            type: "register_user",
            business_option_id: null,
            business_category_id: null,
            sell_goods: null,
            user_id: null,
            first_name: "",
            last_name: "",
            email: "",
            phone_number: "",
            password: "",
            confirm_password: "",
            errors: {},
            isLoading: false
        };
        this.onChange = this.onChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
        this.checkIfUserExists = this.checkIfUserExists.bind(this);
    }

    componentDidMount() {
        this.setState({
            business_option_id: this.props.appStatus.currentBusinessOption.id,
            business_category_id: this.props.appStatus.business_category_id,
            first_name: this.props.appStatus.first_name,
            last_name: this.props.appStatus.last_name,
            email: this.props.appStatus.email,
            phone_number: this.props.appStatus.phone_number,
            sell_goods: this.props.appStatus.sell_goods,
            user_id: this.props.appStatus.user_id ? this.props.appStatus.user_id : null,
        });
    }

    componentWillReceiveProps() {
        this.setState({
            business_option_id: this.props.appStatus.currentBusinessOption.id,
            business_category_id: this.props.appStatus.business_category_id,
            first_name: this.props.appStatus.first_name,
            last_name: this.props.appStatus.last_name,
            email: this.props.appStatus.email,
            phone_number: this.props.appStatus.phone_number,
            sell_goods: this.props.appStatus.sell_goods,
        });
    }

    onChange(e) {
        this.setState({
            [e.target.name]: e.target.value
        });
    }

    isFormValid(data = null) {
        let input = (data) ? data : this.state;
        const { errors, isValid } = (! this.props.auth.isAuthenticated) ? validateCreateUser(input) : validateUpdateUser(input);

        if(! isValid) {
            this.setState({ errors });
        }

        return isValid;
    }

    isEmailValid(email) {
        const { errors, isValid } = validateEmail(email);

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
                business_option_id: appStatus.currentBusinessOption.id,
            });
            if (this.props.auth.isAuthenticated) {
                this.props.userUpdateRequest(this.state, appStatus.currentBusinessOption.links.self).then(
                    (response) => {
                        this.setState({isLoading: false});

                        const token = response.data.token;
                        if (token) {
                            localStorage.setItem("jwtToken", token);
                            setAuthorizationToken(token);
                            this.props.setCurrentUser(jwt_decode(token).user);

                            this.props.addFlashMessage({
                                type: "success",
                                text: "Saved Successfully!"
                            });
                        }
                        this.props.getBusinessOptionFromUrl(appStatus.currentBusinessOption.links.next);
                    },
                    ( error ) => this.setState({errors: error.response.data.error, isLoading: false})
                );
            } else {
                this.props.userSignUpFormRequest(this.state).then(
                    (response) => {
                        this.setState({isLoading: false});

                        const token = response.data.token;
                        if (token) {
                            localStorage.setItem("jwtToken", token);
                            setAuthorizationToken(token);
                            this.props.setCurrentUser(jwt_decode(token).user);

                            this.props.addFlashMessage({
                                type: "success",
                                text: "You have signed up successfully! Welcome!"
                            });
                        }
                        this.props.getAppStatus().then((response) => {
                            this.props.getBusinessOptionFromUrl(appStatus.currentBusinessOption.links.next);
                        });
                    },
                    ( error ) => this.setState({errors: error.response.data.error, isLoading: false})
                );
            }
        }
    }

    checkIfUserExists(e) {
        const val = e.target.value;

        if (this.isEmailValid(this.state.email)) {
            this.setState({ errors: {}});

            this.props.doesUserExists(val).then(
                (response) => {
                    if (response.data.user) {
                        this.setState({
                            errors: {
                                ...this.state.errors,
                                "email" : "Email already exist in the database"
                            }
                        });
                    }
                },
                ( error ) => {
                    console.log('inside does user exist error', error);
                    this.setState({errors: error.response.data.error});
                }
            );
        }
    }

    render() {
        const { appStatus } = this.props;
        const errors = this.state.errors;

        return (
            <form className="apps-form" onSubmit={this.onSubmit}>
                <TextFieldGroup
                    error={errors.first_name}
                    label="First Name *"
                    placeholder="eg. John"
                    onChange={this.onChange}
                    value={this.state.first_name}
                    type="text"
                    field="first_name"
                />

                <TextFieldGroup
                    error={errors.last_name}
                    label="Last Name *"
                    placeholder="eg. Smith"
                    onChange={this.onChange}
                    value={this.state.last_name}
                    type="text"
                    field="last_name"
                />

                <TextFieldGroup
                    error={errors.email}
                    label="Email *"
                    placeholder="eg. john.smith@gmail.com"
                    onChange={this.onChange}
                    checkIfUserExists={this.checkIfUserExists}
                    value={this.state.email}
                    type="text"
                    field="email"
                />

                <TextFieldGroup
                    error={errors.phone_number}
                    label="Phone Number *"
                    placeholder="eg. (02) 9855 0000"
                    onChange={this.onChange}
                    value={this.state.phone_number}
                    type="text"
                    field="phone_number"
                />

                {
                    <div>
                        <TextFieldGroup
                            error={errors.password}
                            label="Password *"
                            placeholder="xxxxxxxxxxxx"
                            onChange={this.onChange}
                            value={this.state.password}
                            type="password"
                            field="password"
                        />

                        <small className="note">Must include lower, upper, number and symbol min 8 characters up to 20.
                        </small>

                        <TextFieldGroup
                            error={errors.confirm_password}
                            label="Confirm Password"
                            placeholder="xxxxxxxxxxxx"
                            onChange={this.onChange}
                            value={this.state.confirm_password}
                            type="password"
                            field="confirm_password"
                        />
                    </div>
                }



                <div className="btn-wrap">
                    <button disabled={ this.state.isLoading } className="btn btn-default btn-md">Continue</button>
                </div>
            </form>
        );
    }
}

SignUpForm.propTypes = {
    appStatus: PropTypes.object.isRequired,
    auth: PropTypes.object.isRequired,
    userSignUpFormRequest: PropTypes.func.isRequired,
    userUpdateRequest: PropTypes.func.isRequired,
    addFlashMessage: PropTypes.func.isRequired,
    doesUserExists: PropTypes.func.isRequired,
    setCurrentUser: PropTypes.func.isRequired,
    getBusinessOptionFromUrl: PropTypes.func.isRequired,
    getAppStatus: PropTypes.func.isRequired
};

export default withRouter(SignUpForm);