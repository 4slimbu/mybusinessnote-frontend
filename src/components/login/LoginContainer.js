import React, {Component} from "react";
import {connect} from "react-redux";
import PropTypes from "prop-types";
import LoginPage from "./pages/LoginPage";
import {handleErrorResponseData, handleSuccessResponseData, callApi} from "../../actions/requestAction";
import Loading from "../common/Loading";

class LoginContainer extends Component {

    constructor(props) {
        super(props);
        this.state = {
            isShowSocialLoginProcessingPage: false,
        };

        this.redirectTo = this.redirectTo.bind(this);
    }

    redirectTo(url) {
        this.props.history.push(url);
    }

    render() {
        const {handleSuccessResponseData, handleErrorResponseData} = this.props;

        const loginPageProps = {
            handleSuccessResponseData: handleSuccessResponseData,
            handleErrorResponseData: handleErrorResponseData,
            redirectTo: this.redirectTo,
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
    handleSuccessResponseData: PropTypes.func.isRequired,
    handleErrorResponseData: PropTypes.func.isRequired,
};

export default connect(null, {
    handleSuccessResponseData,
    handleErrorResponseData,
})(LoginContainer);