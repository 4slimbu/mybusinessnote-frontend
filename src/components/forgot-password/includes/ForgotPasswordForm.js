import React, {Component} from "react";
import PropTypes from "prop-types";
import TextFieldGroup from "../../common/TextFieldGroup";
import {Link} from "react-router-dom";
import {ROUTES} from "../../../constants/routes";
import {validateFields} from "../../../utils/validation/FieldValidator";
import request from "../../../services/request";

class ForgotPasswordForm extends Component {
    constructor(props) {
        super(props);

        this.state = {
            email: {
                isChanged: false,
                label: "Email",
                name: "email",
                placeholder: "Your email",
                value: "",
                oldValue: "",
                type: "text"
            },
            errorCode: '',
            errors: {},
            isChanged: false,
        };

        this.onChange = this.onChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
    }

    onChange(e) {
        this.setState({
            [e.target.name]: {
                ...this.state[e.target.name],
                value: e.target.value,
                isChanged: true
            },
            isChanged: true
        }, () => this.isFormValid());

    }

    isFormValid() {
        const rules = {
            email: 'required|email'
        };
        const {errors, isValid} = validateFields({
            email: this.state.email.value,
        }, rules);

        this.setState({
            errors: isValid ? {} : errors
        });

        return isValid;
    }

    onSubmit(e) {
        e.preventDefault();
        if (this.isFormValid()) {
            this.submitForm(e);
        }
    }

    submitForm() {
        const data = {email: this.state.email.value};
        this.props.makeRequest(request.Auth.forgotPassword, data).then(
            (responseData) => {
                this.props.showEmailSentResponsePage();
            },
            (errorData) => {
                this.setState({
                    errorCode: errorData.errorCode ? errorData.errorCode : '',
                    errors: errorData.errors ? errorData.errors : {}
                });
            }
        );
    }

    render() {
        const {errors} = this.state;
        return (
            <form className="apps-form" onSubmit={this.onSubmit}>
                <h1>Forgot Password</h1>
                <p>Please enter your email address to reset your password.</p>

                <TextFieldGroup fieldObject={this.state.email} onChange={this.onChange} error={errors.email}/>

                <div className="btn-wrap">
                    <button className="btn btn-default btn-md">Send Reset Password Email</button>
                    <Link to={ROUTES.LOGIN} className="btn btn-default btn-md">Back</Link>
                </div>
            </form>
        )
    }
}

ForgotPasswordForm.propTypes = {
    makeRequest: PropTypes.func.isRequired,
    showEmailSentResponsePage: PropTypes.func.isRequired,
};

export default ForgotPasswordForm;