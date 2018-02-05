import React, {Component} from "react";
import PropTypes from "prop-types";
import jwt_decode from "jwt-decode";
import TextFieldGroup from "../common/TextFieldGroup";
import {withRouter} from "react-router-dom";
import setAuthorizationToken from "../../utils/setAuthorizationToken";
import {connect} from "react-redux";
import {setCurrentUser, verifyEmail} from "../../actions/authActions";
import {addFlashMessage} from "../../actions/flashMessageAction";
import {getAppStatus} from "../../actions/appStatusAction";

class EmailVerificationForm extends Component {
    constructor(props) {
        super(props);

        this.state = {
            email_verification_token: "",
        };

        this.onChange = this.onChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
    }

    onChange(e) {
        this.setState({
            [e.target.name]: e.target.value
        });
    }

    onSubmit(e) {
        e.preventDefault();

        this.props.verifyEmail({
            email_verification_token: this.state.email_verification_token
        }).then(
            (response) => {
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
            ( error ) => {
                if (error.response.data.error) {
                    this.props.addFlashMessage({
                        type: "error",
                        text: 'Unable to verify account'
                    });
                }
            }
        );
    }

    render() {
        const {email_verification_token} = this.state;
        return (
            <form className="apps-form" onSubmit={this.onSubmit}>

                <TextFieldGroup
                    label="Verification Code"
                    onChange={this.onChange}
                    value={email_verification_token}
                    type="text"
                    field="email_verification_token"
                />
                <div className="btn-wrap">
                    <button className="btn btn-default btn-md">Verify</button>
                </div>
            </form>
        )
    }
}

EmailVerificationForm.propTypes = {
    verifyEmail: PropTypes.func.isRequired,
    addFlashMessage: PropTypes.func.isRequired,
    getAppStatus: PropTypes.func.isRequired,
    setCurrentUser: PropTypes.func.isRequired,
};

function mapStateToProps(state) {
    return {}
}

export default withRouter(connect(mapStateToProps, {
    verifyEmail,
    addFlashMessage,
    getAppStatus,
    setCurrentUser
})(EmailVerificationForm));