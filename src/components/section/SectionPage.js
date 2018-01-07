import React, {Component} from "react";
import {connect} from "react-redux";
import PropTypes from "prop-types";
import {
    getAppStatus, getBusinessOption, getBusinessOptionFromUrl,
    setCurrentBusinessOption
} from "../../actions/appStatusAction";
import BusinessOptionPage from "../business-option/BusinessOptionPage";
import Loading from "../Loading";

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
        this.props.getAppStatus();
        this.props.getBusinessOptionFromUrl(this.props.appStatus.currentBusinessOption.links.next);
    }

    render() {
        const { isFetching, currentLevel, currentSection, currentBusinessOption } = this.props.appStatus;
        return (
            <section className="mid-sec bg-red mCustomScrollbar" data-mcs-theme="dark">
                <div className="content-wrapper step-one">
                    { isFetching && <Loading /> }
                    <BusinessOptionPage
                        currentLevel={currentLevel}
                        currentSection={currentSection}
                        currentBusinessOption={currentBusinessOption}
                        onClickNext={(e) => this.onClickNext(e)}
                        isFetching={isFetching}
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
    getAppStatus: PropTypes.func.isRequired,
    setCurrentBusinessOption: PropTypes.func.isRequired
};

function mapStateToProps(state) {
    return {
        appStatus: state.appStatusReducer
    }
}

export default connect(mapStateToProps, {getBusinessOption, getBusinessOptionFromUrl, getAppStatus, setCurrentBusinessOption})(SectionPage);