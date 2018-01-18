import React, {Component} from "react";
import {connect} from "react-redux";
import PropTypes from "prop-types";
import {
    getAppStatus, getBusinessOption, getBusinessOptionFromUrl,
    setCurrentBusinessOption, setCurrentLevel, setCurrentSection
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
        const appStatus = this.props.appStatus;

        if (appStatus.currentLevel && appStatus.currentLevel.id && appStatus.currentSection && appStatus.currentSection.id) {
            const url = '/level/' + appStatus.currentLevel.id + '/section/' + appStatus.currentSection.id;
            this.props.getBusinessOptionFromUrl(url);
        } else {
            this.props.history.push('/');
        }

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
        const {setCurrentLevel, setCurrentSection, setCurrentBusinessOption, getBusinessOptionFromUrl} = this.props;
        return (
            <section className="mid-sec bg-red mCustomScrollbar" data-mcs-theme="dark">
                <div className="content-wrapper step-one">
                    { isFetching && <Loading /> }
                    {
                        currentBusinessOption && currentBusinessOption.id &&
                        <BusinessOptionPage
                            currentLevel={currentLevel}
                            currentSection={currentSection}
                            currentBusinessOption={currentBusinessOption}
                            setCurrentLevel={setCurrentLevel}
                            setCurrentSection={setCurrentSection}
                            setCurrentBusinessOption={setCurrentBusinessOption}
                            getBusinessOptionFromUrl={getBusinessOptionFromUrl}
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
    getAppStatus: PropTypes.func.isRequired,
    setCurrentLevel: PropTypes.func.isRequired,
    setCurrentSection: PropTypes.func.isRequired,
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
    getAppStatus,
    setCurrentLevel,
    setCurrentSection,
    setCurrentBusinessOption
})(SectionPage));