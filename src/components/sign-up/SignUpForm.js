import React, {Component} from "react";
import PropTypes from 'prop-types';
import {map} from "lodash";
import timezones from "../../data/timezones";
import * as classnames from "classnames";
import {validateEmail, validateInput} from "../../utils/validation/SignUpFormValidation";
import TextFieldGroup from "../common/TextFieldGroup";
import {withRouter} from "react-router-dom";

class SignUpForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            first_name: "",
            last_name: "",
            email: "",
            phone_number: "",
            password: "",
            confirm_password: "",
            timezone: "",
            errors: {},
            isLoading: false
        };
        this.onChange = this.onChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
        this.checkIfUserExists = this.checkIfUserExists.bind(this);
    }

    onChange(e) {
        this.setState({
            [e.target.name]: e.target.value
        });
    }

    isFormValid(data = null) {
        let input = (data) ? data : this.state;
        const { errors, isValid } = validateInput(input);

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

        if (this.isFormValid()) {
            this.setState({ errors: {}, isLoading: true});

            this.props.userSignUpFormRequest(this.state).then(
                (response) => {
                    this.setState({isLoading: false});

                    this.props.addFlashMessage({
                        type: "success",
                        text: "You have signed up successfully! Welcome!"
                    });

                    this.props.history.push("/");
                },
                ( error ) => this.setState({errors: error.response.data.error, isLoading: false})
            );
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
                ( error ) => this.setState({errors: error.response.data.error})
            );
        }
    }

    render() {
        const errors = this.state.errors;
        const options = map(timezones, (value, key) => {
            return <option key={value} value={value}>{key}</option>
        });

        const displayError = (fieldName) => {
            return map(fieldName, (value, key) => {
                return <div className="help-block" key={key}>{ value }</div>
            })
        };

        return (
            <form onSubmit={this.onSubmit}>
                <h1>Sign Up</h1>

                <TextFieldGroup
                    error={errors.first_name}
                    label="First Name"
                    onChange={this.onChange}
                    value={this.state.first_name}
                    type="text"
                    field="first_name"
                />

                <TextFieldGroup
                    error={errors.last_name}
                    label="Last Name"
                    onChange={this.onChange}
                    value={this.state.last_name}
                    type="text"
                    field="last_name"
                />

                <TextFieldGroup
                    error={errors.email}
                    label="Email"
                    onChange={this.onChange}
                    checkIfUserExists={this.checkIfUserExists}
                    value={this.state.email}
                    type="text"
                    field="email"
                />

                <TextFieldGroup
                    error={errors.phone_number}
                    label="Phone Number"
                    onChange={this.onChange}
                    value={this.state.phone_number}
                    type="text"
                    field="phone_number"
                />

                <TextFieldGroup
                    error={errors.password}
                    label="Password"
                    onChange={this.onChange}
                    value={this.state.password}
                    type="password"
                    field="password"
                />

                <TextFieldGroup
                    error={errors.confirm_password}
                    label="Confirm Password"
                    onChange={this.onChange}
                    value={this.state.confirm_password}
                    type="password"
                    field="confirm_password"
                />

                <div className={classnames("form-group", {"has-error": errors.timezone})}>
                    <label className="control-label">Timezone</label>
                    <select type="text" className="form-control"
                            name="timezone"
                            value={this.state.timezone}
                            onChange={this.onChange}
                    >
                        <option value="" disabled>Choose your timezone</option>
                        {options}
                    </select>
                    { errors.timezone && displayError(errors.timezone)}
                </div>

                <div className="form-group">
                    <button disabled={ this.state.isLoading } className="btn btn-primary btn-lg">Sign Up</button>
                </div>
            </form>
        );
    }
}

SignUpForm.propTypes = {
    userSignUpFormRequest: PropTypes.func.isRequired,
    addFlashMessage: PropTypes.func.isRequired,
    doesUserExists: PropTypes.func.isRequired
};

export default withRouter(SignUpForm);