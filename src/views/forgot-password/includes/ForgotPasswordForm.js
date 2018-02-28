import React, {Component} from "react";
import PropTypes from "prop-types";
import TextFieldGroup from "../../common/TextFieldGroup";
import {validateLogin} from "../../../utils/validation/LoginFormValidation";
import {Link} from "react-router-dom";
import {POST_LOGIN_FORM_URL} from "../../../constants/apiUrls";
import {getErrorCodeMessage} from "../../../utils/helper/helperFunctions";
import {ROUTES} from "../../../constants/routes";
import {validateFields} from "../../../utils/validation/FieldValidator";

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
            isChanged: false
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
        });
    }

    isFormValid() {
        const rules = {
            email: 'required|email'
        };
        const {errors, isValid} = validateFields({
            email: this.state.email.value,
        }, rules);

        if (!isValid) {
            this.setState({errors});
        }

        return isValid;
    }

    onSubmit(e) {
        e.preventDefault();
        if (this.isFormValid()) {
            this.submitForm();
        }
    }

    submitForm() {
        this.props.callApi(POST_LOGIN_FORM_URL, {
            email: this.state.email.value,
        }).then(
            (response) => {
                const responseData = response.data;
                this.props.handleSuccessResponseData(responseData);
                this.props.redirectTo('/');
            },
            (error) => {
                const errorData = error.response.data;
                this.props.handleErrorResponseData(errorData);
                this.setState({
                    errorCode: errorData.errorCode ? errorData.errorCode : '',
                    errors: errorData.errors ? errorData.errors : {}
                });
            }
        );
    }

    render() {
        const {errors,errorCode} = this.state;
        return (
            <form className="apps-form" onSubmit={this.onSubmit}>
                <h1>Forgot Password</h1>
                <p>Please enter your email address to reset your password.</p>
                { errorCode && <div className="alert alert-danger">{getErrorCodeMessage(errorCode)}</div> }

                <TextFieldGroup fieldObject={this.state.email} onChange={this.onChange} error={errors.email} />

                <div className="btn-wrap">
                    <button className="btn btn-default btn-md">Send Reset Password Email</button>
                    <Link to={ROUTES.LOGIN} className="btn btn-default btn-md">Back</Link>
                </div>
            </form>
        )
    }
}

ForgotPasswordForm.propTypes = {
    callApi: PropTypes.func.isRequired,
    handleSuccessResponseData: PropTypes.func.isRequired,
    handleErrorResponseData: PropTypes.func.isRequired,
    redirectTo: PropTypes.func.isRequired,
};

export default ForgotPasswordForm;