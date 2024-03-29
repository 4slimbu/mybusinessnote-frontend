import React, {Component} from "react";
import {connect} from "react-redux";
import PropTypes from "prop-types";
import FlashMessage from "./FlashMessage";
import {deleteFlashMessage} from "../../../actions/flashMessageAction";

class FlashMessageList extends Component {
    render() {
        const messages = this.props.messages.map(message =>
            <FlashMessage key={message.id} message={message} deleteFlashMessage={this.props.deleteFlashMessage}/>
        );

        return (
            <div className="flash-message">{messages}</div>
        )
    }
}

FlashMessageList.propTypes = {
    messages: PropTypes.array.isRequired,
    deleteFlashMessage: PropTypes.func.isRequired
};

function mapStateToProps(state) {
    return {
        messages: state.flashMessageReducer
    }
}

export default connect(mapStateToProps, {deleteFlashMessage})(FlashMessageList);