import React from "react";
import {connect} from "react-redux";
import PropTypes from "prop-types";
import ReactLoading from "react-loading";

const LoadingMessage = (props) => {
    const {isLoading = false, loadingMessage} = props;
    const content = loadingMessage ? loadingMessage : 'Loading...';
    return (
        isLoading &&
        <div className="loading-spinner-wrapper">
            <ReactLoading type='spin' color='lightgrey' height='40px' width='40px' delay={200}
                          className="loading-spinner"/>
            <div className="content">{content}</div>
        </div>
    );
};

LoadingMessage.propTypes = {
    isLoading: PropTypes.bool.isRequired,
    loadingMessage: PropTypes.string.isRequired,
};

function mapStateToProps(state) {
    return {
        isLoading: state.loadingMessageReducer.isLoading,
        loadingMessage: state.loadingMessageReducer.loadingMessage,
    }
}

export default connect(mapStateToProps, {})(LoadingMessage);