import React, {Component} from "react";
import {connect} from "react-redux";
import PropTypes from "prop-types";
import {callApi, makeRequest} from "../../actions/requestAction";
import SectionPage from "./pages/SectionPage";
import SectionCompletePage from "./pages/SectionCompletePage";
import {
    extractBoIdFromLocation, extractLevelFromLocation, extractSectionFromLocation, getById,
    getBySlug, getFirst
} from "../../utils/helper/helperFunctions";
import request from "../../services/request";
import {setCurrent} from "../../actions/appStatusAction";

class SectionContainer extends Component {

    constructor(props) {
        super(props);
        this.state = {
            isShowSectionCompletePage: false,
        };

        this.redirectTo = this.redirectTo.bind(this);
    }

    componentDidMount() {
        this.bootstrap(this.props.location.pathname);
    }

    componentWillReceiveProps(nextProps) {
        if (this.props.location.pathname !== nextProps.location.pathname) {
            this.bootstrap(nextProps.location.pathname)
        }
    }

    bootstrap(location) {
        let {levels, businessOptions, sections} = this.props.appStatus;
        let levelSlug = extractLevelFromLocation(location);
        let sectionSlug = extractSectionFromLocation(location);
        let boId = extractBoIdFromLocation(location);

        let currentLevel = getBySlug(levels, levelSlug);
        let currentSection = getBySlug(currentLevel.sections, sectionSlug);
        if (!boId) {
            boId = getFirst(currentSection.businessOptions);
        }
        let currentBusinessOption = getById(businessOptions, boId);
        if (!currentBusinessOption) {
            this.props.makeRequest(request.BusinessOption.get, boId);
            this.props.setCurrent(currentLevel, currentSection);
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