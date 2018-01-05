import React, {Component} from "react";
import {connect} from "react-redux";
import PropTypes from "prop-types";
import {getAppStatus, getBusinessOption, getBusinessOptionFromUrl} from "../../actions/appStatusAction";
import BusinessOptionPage from "../business-option/BusinessOptionPage";
import {API_BASE_URL} from "../../config";

class SectionPage extends Component {
    constructor(props) {
        super(props);
        this.onClickNext = this.onClickNext.bind(this);
    }

    componentDidMount() {
        this.props.getAppStatus();
        this.props.getBusinessOptionFromUrl(this.props.location.pathname);
    }


    onClickNext(e) {
        e.preventDefault();
        this.props.getBusinessOptionFromUrl(this.props.appStatus.currentBusinessOption.links.next);
    }

    render() {
        const { currentLevel, currentSection, currentBusinessOption } = this.props.appStatus;
        return (
            <section className="mid-sec bg-red mCustomScrollbar" data-mcs-theme="dark">
                <div className="content-wrapper step-one">
                    <BusinessOptionPage
                        currentLevel={currentLevel}
                        currentSection={currentSection}
                        currentBusinessOption={currentBusinessOption}
                        onClickNext={(e) => this.onClickNext(e)}
                    />
                </div>
            </section>
        );
    }
}

SectionPage.propTypes = {
    appStatus: PropTypes.object.isRequired,
    getBusinessOption: PropTypes.func.isRequired,
    getBusinessOptionFromUrl: PropTypes.func.isRequired,
    getAppStatus: PropTypes.func.isRequired
};

function mapStateToProps(state) {
    return {
        appStatus: state.appStatusReducer
    }
}

export default connect(mapStateToProps, {getBusinessOption, getBusinessOptionFromUrl, getAppStatus})(SectionPage);