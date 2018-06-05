import React, {Component} from "react";
import {connect} from "react-redux";
import PropTypes from "prop-types";
import {callApi, makeRequest} from "../../actions/requestAction";
import SectionPage from "./pages/SectionPage";
import SectionCompletePage from "./pages/SectionCompletePage";
import {
    extractBoIdFromLocation,
    extractLevelFromLocation,
    extractSectionFromLocation, generateAppRelativeUrl,
    getById,
    getBySlug,
    getFirst,
    isItemLoaded, isSectionLocked
} from "../../utils/helper/helperFunctions";
import {setCurrent, setToolTipContent} from "../../actions/appStatusAction";
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
        // Initialize
        let {auth, appStatus} = props;
        let {levels, sections, businessOptionStatuses} = appStatus;
        let pathname = props.location.pathname;
        let levelSlug = extractLevelFromLocation(pathname);
        let sectionSlug = extractSectionFromLocation(pathname);
        let currentLevel = getBySlug(levels, levelSlug);
        let currentSection = getBySlug(sections, sectionSlug);

        // Redirect to home if not verified and section is locked
        if (!auth.isVerified && isSectionLocked(businessOptionStatuses, currentSection)) {
            props.setCurrent();
            this.redirectTo(ROUTES.HOME);
        }

        // Redirect to business option page if, section landing page is disabled
        if (! currentSection.show_landing_page) {
            const firstBusinessOption = getFirst(currentSection.businessOptions);
            const businessOptionUrl = generateAppRelativeUrl(currentLevel.slug, currentSection.slug, firstBusinessOption.id);
            this.redirectTo(businessOptionUrl);
        }

        // Set current level and section and continue
        this.props.setCurrent(currentLevel, currentSection);

        // Set tooltip
        this.displayToolTip(props);
    }

    redirectTo(url) {
        this.props.history.push(url);
    }

    displayToolTip(props) {
        let pathname = props.location.pathname;
        let sectionSlug = extractSectionFromLocation(pathname);
        let currentSection = getBySlug(props.appStatus.sections, sectionSlug);

        const toolTip = {};
        toolTip.title = currentSection.tooltip_title;
        toolTip.rawHtmlContent = currentSection.tooltip;
        this.props.setToolTipContent(toolTip);
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
    setToolTipContent: PropTypes.func.isRequired
};

function mapStateToProps(state) {
    return {
        auth: state.authReducer,
        appStatus: state.appStatusReducer
    }
}


export default connect(mapStateToProps, {
    makeRequest, setCurrent, setToolTipContent
})(SectionContainer);