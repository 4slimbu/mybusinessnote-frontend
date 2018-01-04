import React, {Component} from 'react';
import SignUpForm from "../sign-up/SignUpForm";
import {doesUserExists, userSignUpFormRequest} from "../../actions/signUpActions";
import {addFlashMessage} from "../../actions/flashMessageAction";
import {connect} from "react-redux";
import PropTypes from "prop-types";
import {setCurrentUser} from "../../actions/authActions";
import {getBusinessOptionFromUrl} from "../../actions/appStatusAction";

class RegisterUser extends Component {
    render() {
        const {appStatus, auth, userSignUpFormRequest, addFlashMessage, doesUserExists, setCurrentUser, getBusinessOptionFromUrl} = this.props;
        return (
            <div>
                <SignUpForm
                    appStatus={appStatus}
                    auth={auth}
                    userSignUpFormRequest={userSignUpFormRequest}
                    addFlashMessage={addFlashMessage}
                    doesUserExists={doesUserExists}
                    setCurrentUser={setCurrentUser}
                    getBusinessOptionFromUrl={getBusinessOptionFromUrl}
                />
            </div>
        );
    }
}

RegisterUser.propTypes = {
    appStatus: PropTypes.object.isRequired,
    auth: PropTypes.object.isRequired,
    userSignUpFormRequest: PropTypes.func.isRequired,
    addFlashMessage: PropTypes.func.isRequired,
    doesUserExists: PropTypes.func.isRequired,
    setCurrentUser: PropTypes.func.isRequired,
    getBusinessOptionFromUrl: PropTypes.func.isRequired
};

function mapStateToProps(state) {
    return {
        appStatus: state.appStatusReducer,
        auth: state.authReducer
    }
}

export default connect(mapStateToProps, {userSignUpFormRequest, addFlashMessage, doesUserExists, setCurrentUser, getBusinessOptionFromUrl})(RegisterUser);