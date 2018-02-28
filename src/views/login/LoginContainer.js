import React, {Component} from "react";
import {connect} from "react-redux";
import PropTypes from "prop-types";
import LoginPage from "./pages/LoginPage";
import {handleErrorResponseData, handleSuccessResponseData, callApi} from "../../services/actions/requestAction";
import Loading from "../common/Loading";

class LoginContainer extends Component {

    constructor(props) {
        super(props);
        this.state = {
            isShowSocialLoginProcessingPage: false,
        };
    }

    render() {
        const {callApi, handleSuccessResponseData, handleErrorResponseData} = this.props;
        const loginPageProps = {
            callApi: callApi,
            handleSuccessResponseData: handleSuccessResponseData,
            handleErrorResponseData: handleErrorResponseData,
        };

        return (
            <div>
                {
                    this.state.isShowSocialLoginProcessingPage ? <Loading/> : <LoginPage {...loginPageProps}/>
                }
            </div>
        )
    }
}

LoginContainer.propTypes = {
    callApi: PropTypes.func.isRequired,
    handleSuccessResponseData: PropTypes.func.isRequired,
    handleErrorResponseData: PropTypes.func.isRequired,
};

export default connect(null, {
    callApi,
    handleSuccessResponseData,
    handleErrorResponseData,
})(LoginContainer);