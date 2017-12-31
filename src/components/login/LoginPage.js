import React, {Component} from "react";
import LoginForm from "./LoginForm";
import {userLoginFormRequest} from "../../actions/authActions";
import {connect} from "react-redux";
import PropTypes from "prop-types";
import {addFlashMessage} from "../../actions/flashMessageAction";

class LoginPage extends Component {
    render() {
        const {addFlashMessage, userLoginFormRequest} = this.props;
        return (
            <section className="mid-sec bg-red mCustomScrollbar" data-mcs-theme="dark">
                <div className="content-wrapper step-one">
                    <LoginForm
                        addFlashMessage={addFlashMessage}
                        userLoginFormRequest={userLoginFormRequest}/>
                </div>
            </section>
        )
    }
}

LoginPage.propTypes = {
    userLoginFormRequest: PropTypes.func.isRequired,
    addFlashMessage: PropTypes.func.isRequired
};

export default connect(null, {addFlashMessage, userLoginFormRequest})(LoginPage);