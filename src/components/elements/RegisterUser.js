import React, {Component} from 'react';
import SignUpForm from "../sign-up/SignUpForm";
import {doesUserExists, userSignUpFormRequest, userUpdateRequest} from "../../actions/signUpActions";
import {addFlashMessage} from "../../actions/flashMessageAction";
import {connect} from "react-redux";
import PropTypes from "prop-types";
import {setCurrentUser} from "../../actions/authActions";
import {getAppStatus, getBusinessOption, getBusinessOptionFromUrl} from "../../actions/appStatusAction";

class RegisterUser extends Component {
    render() {
        const {appStatus, auth, userSignUpFormRequest, userUpdateRequest, getAppStatus, addFlashMessage,
            doesUserExists, setCurrentUser, getBusinessOptionFromUrl, getBusinessOption} = this.props;
        return (
            <div>
                <SignUpForm
                    appStatus={appStatus}
                    getAppStatus={getAppStatus}
                    auth={auth}
                    userSignUpFormRequest={userSignUpFormRequest}
                    userUpdateRequest={userUpdateRequest}
                    addFlashMessage={addFlashMessage}
                    doesUserExists={doesUserExists}
                    setCurrentUser={setCurrentUser}
                    getBusinessOption={getBusinessOption}
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
    userUpdateRequest: PropTypes.func.isRequired,
    addFlashMessage: PropTypes.func.isRequired,
    doesUserExists: PropTypes.func.isRequired,
    setCurrentUser: PropTypes.func.isRequired,
    getBusinessOptionFromUrl: PropTypes.func.isRequired,
    getAppStatus: PropTypes.func.isRequired
};

function mapStateToProps(state) {
    return {
        appStatus: state.appStatusReducer,
        auth: state.authReducer
    }
}

export default connect(mapStateToProps, {
    userSignUpFormRequest,
    userUpdateRequest,
    addFlashMessage,
    doesUserExists,
    setCurrentUser,
    getBusinessOptionFromUrl,
    getBusinessOption,
    getAppStatus
})(RegisterUser);