import React, {Component} from "react";
import PropTypes from "prop-types";
import DefaultTemplate from "./templates/DefaultTemplate";
import ModalBoxTemplate from "./templates/ModalBoxTemplate";

const BusinessOptionPage = (props) => {
    const {appStatus, onHandleToolTip, onClickUpdateStatus} = props;
    const {currentBusinessOption} = appStatus;

    const templateProps = {
        appStatus: appStatus,
        onHandleToolTip: onHandleToolTip,
        onClickUpdateStatus: onClickUpdateStatus
    };

    return (
        <div>
            {
                (currentBusinessOption.template === 'default') ?
                    <DefaultTemplate {...templateProps}/> : ""
            }
            {
                (currentBusinessOption.template === 'modal_box') ?
                    <ModalBoxTemplate {...templateProps}/> : ""
            }
        </div>
    );
};

BusinessOptionPage.propTypes = {
    appStatus: PropTypes.object.isRequired,
    onHandleToolTip: PropTypes.func.isRequired,
    onClickUpdateStatus: PropTypes.func.isRequired
};


export default BusinessOptionPage;