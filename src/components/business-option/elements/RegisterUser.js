import React, {Component} from 'react';
import SignUpForm from "../form/SignUpForm";
import {connect} from "react-redux";
import PropTypes from "prop-types";
import {makeRequest} from "../../../actions/requestAction";

class RegisterUser extends Component {
    render() {
        const {
            appStatus, auth,
            doesUserExists,
            makeRequest
        } = this.props;

        const signUpFormProps = {
            appStatus: appStatus,
            auth: auth,
            doesUserExists: doesUserExists,
            makeRequest: makeRequest,
        };

        return (
            <div>
                <SignUpForm {...signUpFormProps}/>

                {
                    !auth.isAuthenticated &&
                    <div>
                        <p>&nbsp;</p>
                        <p className="text-center">OR Login with</p>
                        <div className="row">

                            <div className="col-md-6 text-right col-sm-12">
                                <a className="btn btn-primary"
                                   href={process.env.REACT_APP_API_BASE_URL + '/login/oauth/google'}>
                                    <i className="fa fa-google"></i> Google</a>
                            </div>
                            <div className="col-md-6 col-sm-12 text-left">
                                <a className="btn btn-primary"
                                   href={process.env.REACT_APP_API_BASE_URL + '/login/oauth/facebook'}>
                                    <i className="fa fa-facebook-square"></i> Facebook</a>
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
    makeRequest: PropTypes.func.isRequired,
};

function mapStateToProps(state) {
    return {
        appStatus: state.appStatusReducer,
        auth: state.authReducer
    }
}

export default connect(mapStateToProps, {
    makeRequest,
})(RegisterUser);