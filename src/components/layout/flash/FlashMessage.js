import React, {Component} from "react";
import PropTypes from "prop-types";
import classnames from "classnames";

class FlashMessage extends Component {
    constructor(props) {
        super(props);
        setTimeout(() => {
            this.props.deleteFlashMessage(this.props.message.id);
        }, 4000);
    }

    render() {
        const {type, text} = this.props.message;
        return (
            <div className={classnames("alert alert-sticky custom-alert", {
                "alert-success": type === "success",
                "alert-danger": type === "error"
            })}>
                {text}
            </div>
        )
    }
}

FlashMessage.propTypes = {
    message: PropTypes.object.isRequired,
    deleteFlashMessage: PropTypes.func.isRequired
};

export default FlashMessage;