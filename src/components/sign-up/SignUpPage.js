import React, {Component} from "react";
import SignUpForm from "./SignUpForm";
import {connect} from "react-redux";
import PropTypes from 'prop-types';
import {doesUserExists, userSignUpFormRequest} from "../../actions/signUpActions";
import {addFlashMessage} from "../../actions/flashMessageAction";

class SignUpPage extends Component {
    render() {
        const {userSignUpFormRequest, addFlashMessage, doesUserExists} = this.props;
        return (
            <div className="rows">
                <div className="col-md-4 col-md-offset-4">
                    <SignUpForm
                        userSignUpFormRequest={userSignUpFormRequest}
                        addFlashMessage={addFlashMessage}
                        doesUserExists={doesUserExists}
                    />
                </div>
            </div>
        );
    }
}

SignUpForm.propTypes = {
    userSignUpFormRequest: PropTypes.func.isRequired,
    addFlashMessage: PropTypes.func.isRequired,
    doesUserExists: PropTypes.func.isRequired
};

export default connect(null, {userSignUpFormRequest, addFlashMessage, doesUserExists})(SignUpPage);