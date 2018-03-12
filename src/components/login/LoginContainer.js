import React, {Component} from "react";
import {connect} from "react-redux";
import PropTypes from "prop-types";
import LoginPage from "./pages/LoginPage";
import {callApi, makeRequest} from "../../actions/requestAction";
import LoadingMessage from "../layout/loading/LoadingMessage";

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
        const {makeRequest} = this.props;

        const loginPageProps = {
            makeRequest: makeRequest,
            redirectTo: this.redirectTo,
        };

        return (
            <div>
                {
                    this.state.isShowSocialLoginProcessingPage ? <LoadingMessage/> : <LoginPage {...loginPageProps}/>
                }
            </div>
        )
    }
}

LoginContainer.propTypes = {
    makeRequest: PropTypes.func.isRequired,
};

function mapStateToProps(state) {
    return {
        auth: state.authReducer,
        appStatus: state.appStatusReducer
    }
}


export default connect(mapStateToProps, {
    makeRequest,
})(LoginContainer);