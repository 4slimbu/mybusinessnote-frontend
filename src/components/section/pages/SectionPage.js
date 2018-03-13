import React, {Component} from "react";
import {connect} from "react-redux";
import PropTypes from "prop-types";
import {setToolTipContent} from "../../../actions/appStatusAction";
import BusinessOptionPage from "../../business-option/BusinessOptionPage";
import {withRouter} from "react-router-dom";
import {addFlashMessage} from "../../../actions/flashMessageAction";
import $ from "jquery";

class SectionPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isEdit: false
        }
    }

    componentDidMount() {
        this.$el = $(this.el);
        this.$el.mCustomScrollbar({
            mouseWheel: {scrollAmount: 300}
        });
    }


    onClickNext(e) {
        e.preventDefault();
        this.props.getBusinessOption(this.props.appStatus);
    }

    render() {
        const {currentLevel, currentSection, currentBusinessOption} = this.props.appStatus;
        const {
            appStatus,
            setToolTipContent,
        } = this.props;

        const businessOptionPageProps = {
            appStatus: appStatus,
            currentLevel: currentLevel,
            currentSection: currentSection,
            currentBusinessOption: currentBusinessOption,
            setToolTipContent: setToolTipContent,
        };

        return (
            <div>
                {
                    currentBusinessOption && currentBusinessOption.id &&
                    <BusinessOptionPage {...businessOptionPageProps}/>
                }
            </div>
        );
    }
}

SectionPage.propTypes = {
    auth: PropTypes.object.isRequired,
    appStatus: PropTypes.object.isRequired,
    setToolTipContent: PropTypes.func.isRequired,
    addFlashMessage: PropTypes.func.isRequired
};

function mapStateToProps(state) {
    return {
        appStatus: state.appStatusReducer,
        auth: state.authReducer
    }
}

export default withRouter(connect(mapStateToProps, {
    setToolTipContent,
    addFlashMessage,
})(SectionPage));