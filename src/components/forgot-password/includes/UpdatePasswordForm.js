import React, {Component} from "react";
import PropTypes from "prop-types";
import TextFieldGroup from "../../common/TextFieldGroup";
import {Link} from "react-router-dom";
import {ROUTES} from "../../../constants/routes";
import {validateFields} from "../../../utils/validation/FieldValidator";
import request from "../../../services/request";
import {MESSAGES} from "../../../constants/messages";

class UpdatePasswordForm extends Component {
    constructor(props) {
        super(props);

        this.state = {
            password: {
                isChanged: false,
                label: "Password",
                name: "password",
                placeholder: "Your Password",
                value: "",
                oldValue: "",
                type: "password"
            },
            confirm_password: {
                isChanged: false,
                label: "Confirm Password",
                name: "confirm_password",
                placeholder: "Confirm Your Password",
                value: "",
                oldValue: "",
                type: "password"
            },
            forgot_password_token: '',
            errorCode: '',
            errors: {},
            isChanged: false,
        };

        this.onChange = this.onChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
    }

    componentDidMount() {
        this.setState({
            forgot_password_token: this.props.forgotPasswordToken
        });
    }

    resetFields() {
        this.setState({
            password: {
                ...this.state.password,
                isChanged: false,
                value: ''
            },
            confirm_password: {
                ...this.state.confirm_password,
                isChanged: false,
                value: ''
            }
        })
    }

    onChange(e) {
        this.setState({
            [e.target.name]: {
                ...this.state[e.target.name],
                value: e.target.value,
                isChanged: true
            },
            isChanged: true
        }, () => {
            const dataObject = {};
            if (this.state.password.isChanged) {
                dataObject.password = this.state.password.value
            }
            if (this.state.confirm_password.isChanged) {
                dataObject.confirm_password = this.state.confirm_password.value
            }

            this.isFormValid(dataObject);
        });

    }

    isFormValid(dataObject) {
        const rules = {
            password: 'required|min:8',
            confirm_password: 'match:password'
        };
        const {errors, isValid} = validateFields(dataObject, rules);

        this.setState({
            errors: isValid ? {} : errors
        });

        return isValid;
    }

    onSubmit(e) {
        e.preventDefault();
        const dataObject = {
            password: this.state.password.value,
            confirm_password: this.state.confirm_password.value,
        };

        if (this.isFormValid(dataObject)) {
            this.submitForm();
        }
    }

    submitForm() {
        const data = {
            password: this.state.password.value,
            confirm_password: this.state.confirm_password.value,
            forgot_password_token: this.state.forgot_password_token
        };
        this.props.makeRequest(request.Auth.updatePassword, data, {message: MESSAGES.UPDATING}).then(
            (responseData) => {
                this.props.showPasswordUpdatedResponsePage();
            },
            (errorData) => {
                this.resetFields();
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
                <h1>Reset Password</h1>

                <TextFieldGroup fieldObject={this.state.password} onChange={this.onChange} error={errors.password}/>
                <TextFieldGroup fieldObject={this.state.confirm_password} onChange={this.onChange}
                                error={errors.confirm_password}/>

                <div className="btn-wrap">
                    <button className="btn btn-default btn-md">Reset Password</button>
                    <Link to={ROUTES.LOGIN} className="btn btn-default btn-md">Back</Link>
                </div>
            </form>
        )
    }
}

UpdatePasswordForm.propTypes = {
    makeRequest: PropTypes.func.isRequired,
    redirectTo: PropTypes.func.isRequired,
    showPasswordUpdatedResponsePage: PropTypes.func.isRequired,
    forgotPasswordToken: PropTypes.string.isRequired
};

export default UpdatePasswordForm;