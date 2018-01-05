import React, {Component} from "react";
import PropTypes from "prop-types";
import TextFieldGroup from "../common/TextFieldGroup";
import {validateLogin} from "../../utils/validation/LoginFormValidation";
import {withRouter} from "react-router-dom";

class LoginForm extends Component {
    constructor(props) {
        super(props);

        this.state = {
            email: "",
            password: "",
            errors: {},
            isLoading: false
        };

        this.onChange = this.onChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
    }

    isFormValid(data = null) {
        let input = (data) ? data : this.state;
        const {errors, isValid} = validateLogin(input);

        if (!isValid) {
            this.setState({errors});
        }

        return isValid;
    }

    onChange(e) {
        this.setState({
            [e.target.name]: e.target.value
        });
    }

    onSubmit(e) {
        e.preventDefault();

        if (this.isFormValid()) {
            this.setState({errors: {}, isLoading: true});

            this.props.userLoginFormRequest(this.state).then(
                (response) => {
                    this.setState({isLoading: false});

                    this.props.addFlashMessage({
                        type: "success",
                        text: "You have logged in successfully! Welcome!"
                    });

                    this.props.getAppStatus();

                    this.props.history.push("/");
                },
                (error) => {
                    this.setState({
                        isLoading: false,
                        errors: {
                            form: error.response.data.error
                        }
                    });
                }
            );
        }
    }

    render() {
        const {errors, email, password, isLoading} = this.state;
        return (
            <form onSubmit={this.onSubmit}>
                <h1>Login</h1>

                { errors.form && <div className="alert alert-danger">{errors.form}</div> }

                <TextFieldGroup
                    error={errors.email}
                    label="Email"
                    onChange={this.onChange}
                    value={email}
                    type="text"
                    field="email"
                />
                <TextFieldGroup
                    error={errors.password}
                    label="Password"
                    onChange={this.onChange}
                    value={password}
                    type="password"
                    field="password"
                />

                <div className="form-group">
                    <button className="btn btn-primary btn-lg" disabled={isLoading}>
                        Login
                    </button>
                </div>

            </form>
        )
    }
}

LoginForm.propTypes = {
    userLoginFormRequest: PropTypes.func.isRequired,
    addFlashMessage: PropTypes.func.isRequired,
    getAppStatus: PropTypes.func.isRequired
};

export default withRouter(LoginForm);