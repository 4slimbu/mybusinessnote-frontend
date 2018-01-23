import React, {Component} from "react";
import {connect} from "react-redux";
import PropTypes from "prop-types";
import {
    getAppStatus, getBusinessOption, getBusinessOptionFromAppUrl, getBusinessOptionFromUrl,
    setCurrentBusinessOption, setCurrentLevel, setCurrentSection, setShowCompletedPage, setToolTipContent
} from "../../actions/appStatusAction";
import BusinessOptionPage from "../business-option/BusinessOptionPage";
import Loading from "../Loading";
import {generateApiUrlFromSlug, generateApiUrlFromUrlLocation} from "../navigation/helperFunctions";
import {withRouter} from "react-router-dom";

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
        console.log('section c w r p');
        //get url part
        console.log('url part', this.props.history.location.pathname);
        //extract route params
        //get business option
        //get component did mount
        // if (this.props.history.location.pathname != nextProps.history.location.pathname) {
        //     const levelSlug = nextProps.match.params.level;
        //     const sectionSlug = nextProps.match.params.section;
        //     const appStatus = this.props.appStatus;
        //     generateApiUrlFromSlug(appStatus, levelSlug, sectionSlug);
        // }
    }


    onClickNext(e) {
        e.preventDefault();
        this.props.getBusinessOption(this.props.appStatus);
    }

    render() {
        const { isFetching, currentLevel, currentSection, currentBusinessOption} = this.props.appStatus;
        const {appStatus, getBusinessOption, setCurrentLevel, setCurrentSection, setCurrentBusinessOption,
            setToolTipContent, setShowCompletedPage,
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
    appStatus: PropTypes.object.isRequired,
    getBusinessOption: PropTypes.func.isRequired,
    getBusinessOptionFromUrl: PropTypes.func.isRequired,
    getBusinessOptionFromAppUrl: PropTypes.func.isRequired,
    getAppStatus: PropTypes.func.isRequired,
    setCurrentLevel: PropTypes.func.isRequired,
    setCurrentSection: PropTypes.func.isRequired,
    setToolTipContent: PropTypes.func.isRequired,
    setShowCompletedPage: PropTypes.func.isRequired,
    setCurrentBusinessOption: PropTypes.func.isRequired
};

function mapStateToProps(state) {
    return {
        appStatus: state.appStatusReducer
    }
}

export default withRouter(connect(mapStateToProps, {
    getBusinessOption,
    getBusinessOptionFromUrl,
    getBusinessOptionFromUrl,
    getBusinessOptionFromAppUrl,
    getAppStatus,
    setCurrentLevel,
    setCurrentSection,
    setToolTipContent,
    setCurrentBusinessOption,
    setShowCompletedPage
})(SectionPage));