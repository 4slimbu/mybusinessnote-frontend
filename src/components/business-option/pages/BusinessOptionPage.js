import React, {Component} from "react";
import PropTypes from "prop-types";
import {getAppUrlFromApiUrl, getById, getNext} from "../../../utils/helper/helperFunctions";
import {withRouter} from "react-router-dom";
import DefaultTemplate from "./templates/DefaultTemplate";
import ModalBoxTemplate from "./templates/ModalBoxTemplate";

class BusinessOptionPage extends Component {
    componentDidMount() {
        this.displayToolTip(this.props.currentBusinessOption.tooltip_title, this.props.currentBusinessOption.tooltip);
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.currentBusinessOption.id !== this.props.currentBusinessOption.id) {
            this.displayToolTip(nextProps.currentBusinessOption.tooltip_title, nextProps.currentBusinessOption.tooltip);
        }
    }

    displayToolTip(title, content) {
        const toolTip = {};
        toolTip.title = title;
        toolTip.rawHtmlContent = content;
        this.props.setToolTipContent(toolTip);
    }

    onClickNext(e) {
        e.preventDefault();
        const {
            currentBusinessOption, getBusinessOption, history,
            setCompletedStatus
        } = this.props;
        getBusinessOption(currentBusinessOption.links.next);
        setCompletedStatus({});
        history.push(getAppUrlFromApiUrl(currentBusinessOption.links.next));
    }

    onClickBack(e) {
        const {
            currentLevel, currentBusinessOption, getBusinessOption, history, setCompletedStatus
        } = this.props;
        setCompletedStatus({});
        if (currentBusinessOption.id === currentLevel.level_first_bo.id) {
            history.push('/level/' + currentBusinessOption.level_slug);
            return;
        }
        getBusinessOption(currentBusinessOption.links.prev);
        history.push(getAppUrlFromApiUrl(currentBusinessOption.links.prev));
    }

    render() {
        const {appStatus} = this.props;
        const {currentLevel, currentBusinessOption} = appStatus;

        return (
            <div>
                {
                    (currentBusinessOption.template === 'default') ?
                        <DefaultTemplate appStatus={appStatus}/> : ""
                }
                {
                    (currentBusinessOption.template === 'modal_box') ?
                        <ModalBoxTemplate appStatus={appStatus}/> : ""
                }
            </div>
        );
    }
}

BusinessOptionPage.propTypes = {
    currentLevel: PropTypes.object.isRequired,
    currentSection: PropTypes.object.isRequired,
    currentBusinessOption: PropTypes.object.isRequired,
};


export default withRouter(BusinessOptionPage);