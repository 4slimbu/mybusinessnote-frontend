import React, {Component} from 'react';
import SignUpForm from "../../form/SignUpForm";
import {doesUserExists, userSignUpFormRequest, userUpdateRequest} from "../../../../actions/signUpActions";
import {addFlashMessage} from "../../../../actions/flashMessageAction";
import {connect} from "react-redux";
import PropTypes from "prop-types";
import {setCurrentUser} from "../../../../actions/authActions";
import {getAppStatus, getBusinessOption, getBusinessOptionFromUrl} from "../../../../actions/appStatusAction";

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

                {
                    !auth.isAuthenticated &&
                    <div>
                        <p>&nbsp;</p>
                        <p className="text-center">OR Login with</p>
                        <div className="row">

                            <div className="col-md-6 text-right col-sm-12">
                                <a className="btn btn-primary" href={ process.env.REACT_APP_API_BASE_URL + '/login/oauth/google'} ><i className="fa fa-google"></i> Google</a>
                            </div>
                            <div className="col-md-6 col-sm-12 text-left">
                                <a className="btn btn-primary" href={ process.env.REACT_APP_API_BASE_URL + '/login/oauth/facebook'} ><i className="fa fa-facebook-square"></i> Facebook</a>
                            </div>
                        </div>
                    </div>
                }
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