import React, {Component} from "react";
import {connect} from "react-redux";
import PropTypes from "prop-types";
import LoginPage from "./pages/LoginPage";
import {callApi, makeRequest} from "../../actions/requestAction";
import LoadingMessage from "../layout/loading/LoadingMessage";
import request from "../../services/request";

class LoginContainer extends Component {

    constructor(props) {
        super(props);
        this.state = {
            isShowSocialLoginProcessingPage: false,
        };

        this.redirectTo = this.redirectTo.bind(this);
    }

    componentDidMount() {
        if (this.props.match.params.driver) {
            this.setState({
                isShowSocialLoginProcessingPage: true
            });
            this.props.makeRequest(request.Auth.loginSocialUser, this.props.location.pathname + this.props.location.search).then(
                (response) => {
                    this.props.history.push('/');
                },
                ( error ) => {
                    // this.setState({errors: error.response.data.error, isLoading: false});
                }
            );
        }
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