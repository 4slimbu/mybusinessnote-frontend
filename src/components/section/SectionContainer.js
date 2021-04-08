import React, {Component} from "react";
import {connect} from "react-redux";
import PropTypes from "prop-types";
import {callApi, makeRequest} from "../../actions/requestAction";
import SectionPage from "./pages/SectionPage";
import SectionCompletePage from "./pages/SectionCompletePage";
import {map} from "lodash";
import {Panel, PanelGroup} from "react-bootstrap";
import {
    extractLevelFromLocation,
    extractSectionFromLocation,
    filterBusinessOptionsBySection,
    filterFirstInCollection,
    generateAppRelativeUrl,
    getBySlug,
    getFirst,
    isItemLoaded,
    isSectionLocked
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
        this.onHandleToolTip = this.onHandleToolTip.bind(this);
        this.goTo = this.goTo.bind(this);
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
        let currentSection = filterFirstInCollection(sections, {slug: sectionSlug, level_id: currentLevel.id});

        // Redirect to home if not verified and section is locked
        if (!auth.isVerified && isSectionLocked(businessOptionStatuses, currentSection)) {
            props.setCurrent();
            this.redirectTo(ROUTES.HOME);
        }

        // Redirect to business option page if, section landing page is disabled
        if (!currentSection.show_landing_page) {
            const firstBusinessOption = getFirst(currentSection.businessOptions);
            const businessOptionUrl = generateAppRelativeUrl(currentLevel.slug, currentSection.slug, firstBusinessOption.id);
            this.redirectTo(businessOptionUrl);
        }

        // Set current level and section and continue
        this.props.setCurrent(currentLevel, currentSection);
        this.displayToolTip(props);
    }

    redirectTo(url) {
        this.props.history.push(url);
    }

    goTo(e, url) {
        e.preventDefault();
        const {history} = this.props;
        history.push(url);
    }

    onHandleToolTip(e, id, url) {
        e.preventDefault();
        this.displayToolTip(this.props, id);

        if (url.length > 0) {
            const {history} = this.props;
            history.push(url);
        }
    }

    onHandleToolTipSelect(newKey) {
        this.displayToolTip(this.props, newKey);
    }

    displayToolTip(props, id = 0) {
        const {setToolTipContent, appStatus} = props;
        const {levels, sections} = appStatus;
        const pathname = props.location.pathname;
        let levelSlug = extractLevelFromLocation(pathname);
        let sectionSlug = extractSectionFromLocation(pathname);
        let currentLevel = getBySlug(levels, levelSlug);
        let currentSection = filterFirstInCollection(sections, {slug: sectionSlug, level_id: currentLevel.id});
        const toolTip = {};

        // Set tooltip content for level
        toolTip.title = currentSection.tooltip_title;
        toolTip.rawHtmlContent = currentSection.tooltip;

        // Set tooltip accordion for levels other than level 1
        if (currentLevel.id !== 1) {
            const toolTipList = map(filterBusinessOptionsBySection(appStatus, currentSection.id), (item, key) => {
                const title = (item.id === id) ? <strong>{item.name}</strong> : item.name;
                return (
                    <Panel key={key} eventKey={item.id}>
                        <Panel.Heading>
                            <Panel.Title toggle>
                                <h4>
                                    <span className="accordion-titles">{title}</span>
                                    <span className="acc-img"></span>
                                </h4>
                            </Panel.Title>
                        </Panel.Heading>
                        <Panel.Body collapsible>
                            <div className="content-wrap" dangerouslySetInnerHTML={{__html: item.tooltip}}/>
                        </Panel.Body>
                    </Panel>
                )
            });

            toolTip.accordion = (
                <PanelGroup accordion id={`accordion-uncontrolled-level-three-sections`} activeKey={id}
                            onSelect={(newKey) => this.onHandleToolTipSelect(newKey)}>
                    {toolTipList}
                </PanelGroup>
            );
        }

        // Dispatch action to set tooltip content
        setToolTipContent(toolTip);
    }

    render() {
        const {makeRequest} = this.props;

        const sectionPageProps = {
            makeRequest: makeRequest,
            redirectTo: this.redirectTo,
            onHandleToolTip: this.onHandleToolTip,
            goTo: this.goTo,
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