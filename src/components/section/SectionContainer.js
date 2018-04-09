import React, {Component} from "react";
import {connect} from "react-redux";
import PropTypes from "prop-types";
import {callApi, makeRequest} from "../../actions/requestAction";
import SectionPage from "./pages/SectionPage";
import SectionCompletePage from "./pages/SectionCompletePage";
import {
    extractBoIdFromLocation,
    extractLevelFromLocation,
    extractSectionFromLocation,
    getById,
    getBySlug,
    getFirst,
    isItemLoaded, isSectionLocked
} from "../../utils/helper/helperFunctions";
import request from "../../services/request";
import {setCurrent} from "../../actions/appStatusAction";
import {ROUTES} from "../../constants/routes";

class SectionContainer extends Component {

    constructor(props) {
        super(props);
        this.state = {
            currentLevel: {},
            currentSection: {},
            currentBusinessOption: {},
            isShowSectionCompletePage: false,
        };

        this.redirectTo = this.redirectTo.bind(this);
    }

    componentDidMount() {
        this.bootstrap(this.props);
    }

    componentWillReceiveProps(nextProps) {
        if (this.props.location.pathname !== nextProps.location.pathname) {
            this.bootstrap(nextProps)
        }
    }

    bootstrap(props) {
        //initialize
        let {auth, appStatus, history} = props;
        let {levels, sections, businessOptions, businessOptionStatuses} = appStatus;
        let pathname = props.location.pathname;
        let levelSlug = extractLevelFromLocation(pathname);
        let sectionSlug = extractSectionFromLocation(pathname);
        let boId = extractBoIdFromLocation(pathname);

        let currentLevel = getBySlug(levels, levelSlug);
        let currentSection = getBySlug(sections, sectionSlug);

        // redirect to home if not verified and section is locked
        if (!auth.isVerified && isSectionLocked(businessOptionStatuses, currentSection)) {
            props.setCurrent();
            history.push(ROUTES.HOME);
        }

        // check if url has business option id
        if (!boId) {
            boId = getFirst(currentSection.businessOptions);
        }
        let currentBusinessOption = getById(businessOptions, boId);
        if (!currentBusinessOption) {
            this.props.makeRequest(request.BusinessOption.get, boId);
        }
        this.props.setCurrent(currentLevel, currentSection, currentBusinessOption);
    }


    redirectTo(url) {
        this.props.history.push(url);
    }

    render() {
        const {makeRequest} = this.props;

        const sectionPageProps = {
            makeRequest: makeRequest,
            redirectTo: this.redirectTo,
        };

        return (
            isItemLoaded(this.props.appStatus.sections) &&
            isItemLoaded(this.props.appStatus.currentLevel) &&
            isItemLoaded(this.props.appStatus.currentSection) &&
            <div>
                {
                    this.state.isShowSectionCompletePage ? <SectionCompletePage/> : <SectionPage {...sectionPageProps}/>
                }
            </div>
        )
    }
}

SectionContainer.propTypes = {
    makeRequest: PropTypes.func.isRequired,
    setCurrent: PropTypes.func.isRequired,
};

function mapStateToProps(state) {
    return {
        auth: state.authReducer,
        appStatus: state.appStatusReducer
    }
}


export default connect(mapStateToProps, {
    makeRequest, setCurrent
})(SectionContainer);