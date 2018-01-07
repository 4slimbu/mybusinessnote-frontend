import React, {Component} from "react";
import PropTypes from "prop-types";
import jwt_decode from "jwt-decode";
import TextFieldGroup from "../common/TextFieldGroup";
import {validateLogin} from "../../utils/validation/LoginFormValidation";
import {withRouter} from "react-router-dom";
import setAuthorizationToken from "../../utils/setAuthorizationToken";

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

            this.props.userLoginFormRequest({
                siwps: this.state.email,
                sdlkw: this.state.password
            }).then(
                (response) => {
                    this.setState({isLoading: false});

                    const token = response.data.token;
                    if (token) {
                        localStorage.setItem("jwtToken", token);
                        setAuthorizationToken(token);
                        this.props.setCurrentUser(jwt_decode(token).user);

                        this.props.addFlashMessage({
                            type: "success",
                            text: "Logged in successfully! Welcome!"
                        });
                    }
                    this.props.getAppStatus();
                    this.props.history.push('/');
                },
                ( error ) => this.setState({errors: error.response.data.error, isLoading: false})
            );
        }
    }

    render() {
        const {errors, email, password, isLoading} = this.state;
        return (
            <form className="apps-form" onSubmit={this.onSubmit}>
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
                <div className="btn-wrap">
                    <button disabled={ isLoading } className="btn btn-default btn-md">Login</button>
                </div>

            </form>
        )
    }
}

LoginForm.propTypes = {
    userLoginFormRequest: PropTypes.func.isRequired,
    addFlashMessage: PropTypes.func.isRequired,
    getAppStatus: PropTypes.func.isRequired,
    setCurrentUser: PropTypes.func.isRequired,
    getBusinessOptionFromUrl: PropTypes.func.isRequired
};

export default withRouter(LoginForm);