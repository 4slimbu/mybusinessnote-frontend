import React, {Component} from "react";
import {connect} from "react-redux";
import PropTypes from "prop-types";
import {
    getAppStatus, getBusinessOption, getBusinessOptionFromAppUrl, getBusinessOptionFromUrl, setCompletedStatus,
    setCurrentBusinessOption, setCurrentLevel, setCurrentSection, setShowCompletedPage, setToolTipContent
} from "../../actions/appStatusAction";
import BusinessOptionPage from "../business-option/BusinessOptionPage";
import Loading from "../Loading";
import {generateApiUrlFromUrlLocation, mbjLog} from "../navigation/helperFunctions";
import {withRouter} from "react-router-dom";
import {isEmpty} from "lodash";

class SectionPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isEdit: false
        }
    }

    componentDidMount() {
        this.props.getBusinessOption(this.props.history.location.pathname);
    }

    componentWillReceiveProps(nextProps) {
        if (this.props.auth.isAuthenticated && ! this.props.auth.isVerified) {
            this.props.history.push('/');
        }
    }


    onClickNext(e) {
        e.preventDefault();
        this.props.getBusinessOption(this.props.appStatus);
    }

    render() {
        const { isFetching, currentLevel, currentSection, currentBusinessOption} = this.props.appStatus;
        const {appStatus, getBusinessOption, setCurrentLevel, setCurrentSection, setCurrentBusinessOption,
            setToolTipContent, setShowCompletedPage,setCompletedStatus,
            getBusinessOptionFromUrl} = this.props;
        return (
            <section className="mid-sec bg-red mCustomScrollbar" data-mcs-theme="dark">
                <div className="content-wrapper step-one">
                    { isFetching && <Loading /> }
                    {
                        currentBusinessOption && currentBusinessOption.id &&
                        <BusinessOptionPage
                            appStatus={appStatus}
                            currentLevel={currentLevel}
                            currentSection={currentSection}
                            currentBusinessOption={currentBusinessOption}
                            setCurrentLevel={setCurrentLevel}
                            setCurrentSection={setCurrentSection}
                            setCurrentBusinessOption={setCurrentBusinessOption}
                            setCompletedStatus={setCompletedStatus}
                            setShowCompletedPage={setShowCompletedPage}
                            setToolTipContent={setToolTipContent}
                            getBusinessOptionFromUrl={getBusinessOptionFromUrl}
                            getBusinessOption={getBusinessOption}
                            isFetching={isFetching}
                        />
                    }
                </div>
            </section>
        );
    }
}

SectionPage.propTypes = {
    auth: PropTypes.object.isRequired,
    appStatus: PropTypes.object.isRequired,
    getBusinessOption: PropTypes.func.isRequired,
    getBusinessOptionFromUrl: PropTypes.func.isRequired,
    getBusinessOptionFromAppUrl: PropTypes.func.isRequired,
    getAppStatus: PropTypes.func.isRequired,
    setCurrentLevel: PropTypes.func.isRequired,
    setCurrentSection: PropTypes.func.isRequired,
    setToolTipContent: PropTypes.func.isRequired,
    setShowCompletedPage: PropTypes.func.isRequired,
    setCompletedStatus: PropTypes.func.isRequired,
    setCurrentBusinessOption: PropTypes.func.isRequired
};

function mapStateToProps(state) {
    return {
        appStatus: state.appStatusReducer,
        auth: state.authReducer
    }
}

export default withRouter(connect(mapStateToProps, {
    getBusinessOption,
    getBusinessOptionFromUrl,
    getBusinessOptionFromAppUrl,
    getAppStatus,
    setCurrentLevel,
    setCurrentSection,
    setToolTipContent,
    setCurrentBusinessOption,
    setCompletedStatus,
    setShowCompletedPage
})(SectionPage));