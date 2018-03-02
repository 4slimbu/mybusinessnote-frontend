import React, {Component} from "react";
import {connect} from "react-redux";
import PropTypes from "prop-types";
import {withRouter} from "react-router-dom";
import {addFlashMessage} from "../actions/flashMessageAction";

export default function (ComposedComponent) {
    class RequireVerification extends Component {
        componentDidMount() {
            if (!this.props.isVerified) {
                this.props.addFlashMessage({
                    type: "error",
                    text: "Verification of email needed"
                });

                this.props.history.push("/");
            }
        }

        // componentWillUpdate(nextProps) {
        //     if (!nextProps.isVerified) {
        //         this.props.history.push("/");
        //     }
        // }

        render() {
            return (
                <ComposedComponent {...this.props}/>
            )
        }
    }

    RequireVerification.propTypes = {
        isVerified: PropTypes.bool.isRequired,
        addFlashMessage: PropTypes.func.isRequired
    };

    function mapStateToProps(state) {
        return {
            isVerified: state.authReducer.isVerified
        }
    }

    return connect(mapStateToProps, {addFlashMessage})(withRouter(RequireVerification));
};