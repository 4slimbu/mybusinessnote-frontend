import React, {Component} from "react";
import {connect} from "react-redux";
import PropTypes from "prop-types";
import {callApi, makeRequest} from "../../actions/requestAction";
import {
    extractBoIdFromLocation,
    extractLevelFromLocation,
    extractSectionFromLocation,
    getById,
    getBySlug,
    isItemLoaded
} from "../../utils/helper/helperFunctions";
import {setCurrent, setToolTipContent} from "../../actions/appStatusAction";
import BusinessOptionPage from "./BusinessOptionPage";

class BusinessOptionContainer extends Component {

    constructor(props) {
        super(props);
        this.state = {
            currentLevel: {},
            currentSection: {},
            currentBusinessOption: {},
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
        let {appStatus} = props;
        let {levels, sections, businessOptions} = appStatus;
        let pathname = props.location.pathname;
        let levelSlug = extractLevelFromLocation(pathname);
        let sectionSlug = extractSectionFromLocation(pathname);
        let boId = extractBoIdFromLocation(pathname);
        let currentLevel = getBySlug(levels, levelSlug);
        let currentSection = getBySlug(sections, sectionSlug);
        let currentBusinessOption = getById(businessOptions, boId);

        // Set current level and section and continue
        this.props.setCurrent(currentLevel, currentSection, currentBusinessOption);
    }


    redirectTo(url) {
        this.props.history.push(url);
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
            isItemLoaded(this.props.appStatus.sections) &&
            isItemLoaded(this.props.appStatus.currentLevel) &&
            isItemLoaded(this.props.appStatus.currentSection) &&
            isItemLoaded(this.props.appStatus.currentBusinessOption) &&
            <div>
                <BusinessOptionPage {...businessOptionPageProps}/>
            </div>
        )
    }
}

BusinessOptionContainer.propTypes = {
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
    makeRequest, setCurrent, setToolTipContent
})(BusinessOptionContainer);