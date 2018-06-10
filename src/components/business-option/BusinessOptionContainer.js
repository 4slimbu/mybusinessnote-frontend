import React, {Component} from "react";
import {connect} from "react-redux";
import PropTypes from "prop-types";
import {callApi, makeRequest} from "../../actions/requestAction";
import {
    extractBoIdFromLocation,
    extractLevelFromLocation,
    extractSectionFromLocation, filterBusinessOptionsBySection, filterFirstInCollection, generateAppRelativeUrl,
    getById,
    getBySlug, getChildBusinessOptions, getCodeMessage,
    isItemLoaded, isLevelLocked
} from "../../utils/helper/helperFunctions";
import {setCurrent, setToolTipContent} from "../../actions/appStatusAction";
import BusinessOptionPage from "./pages/BusinessOptionPage";
import {map} from "lodash";
import {Panel, PanelGroup} from "react-bootstrap";
import request from "../../services/request";
import {MESSAGES} from "../../constants/messages";
import {ROUTES} from "../../constants/routes";
import {addFlashMessage} from "../../actions/flashMessageAction";

class BusinessOptionContainer extends Component {

    constructor(props) {
        super(props);
        this.state = {
            currentLevel: {},
            currentSection: {},
            currentBusinessOption: {},
        };

        this.redirectTo = this.redirectTo.bind(this);
        this.onHandleToolTip = this.onHandleToolTip.bind(this);
        this.goTo = this.goTo.bind(this);
        this.onClickUpdateStatus = this.onClickUpdateStatus.bind(this);
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
        let {appStatus, auth, history} = props;
        let {levels, sections, businessOptions} = appStatus;
        let pathname = props.location.pathname;
        let levelSlug = extractLevelFromLocation(pathname);
        let sectionSlug = extractSectionFromLocation(pathname);
        let boId = extractBoIdFromLocation(pathname);
        let currentLevel = getBySlug(levels, levelSlug);
        let currentSection = getBySlug(sections, sectionSlug);
        let currentBusinessOption = getById(businessOptions, boId);

        //check if authenticated and verified
        if (currentBusinessOption.id !== 1 && currentBusinessOption.id !== 2 && currentBusinessOption.id !== 3) {
            if (! auth.isAuthenticated || !auth.isVerified) {
                history.push(ROUTES.HOME);
                return;
            }
        }

        // Set current level and section and continue
        this.props.setCurrent(currentLevel, currentSection, currentBusinessOption);
        this.displayToolTip(props);
    }

    onClickUpdateStatus(e, status) {
        e.preventDefault();

        this.props.makeRequest(request.BusinessOption.save, {
            id: this.props.appStatus.currentBusinessOption.id,
            input:{
                business_option_status: status
            }
        }, {message: MESSAGES.SAVING}).then((response) => {
            let {appStatus, history} = this.props;
            let {currentLevel, currentSection, currentBusinessOption} = appStatus;
            let backUrl = generateAppRelativeUrl(currentLevel.slug, currentSection.slug);
            if (currentBusinessOption.parent_id) {
                backUrl = generateAppRelativeUrl(currentLevel.slug, currentSection.slug, currentBusinessOption.parent_id);
            }
            history.push(backUrl);
        });
    };

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
        const {levels, businessOptions} = appStatus;
        const pathname = props.location.pathname;
        let levelSlug = extractLevelFromLocation(pathname);
        let currentLevel = getBySlug(levels, levelSlug);
        let boId = extractBoIdFromLocation(pathname);
        let currentBusinessOption = getById(businessOptions, boId);
        const toolTip = {};

        // Set tooltip content for level
        toolTip.title = currentBusinessOption.tooltip_title;
        toolTip.rawHtmlContent = currentBusinessOption.tooltip;

        // Set tooltip accordion for levels other than level 1
        if (currentLevel.id !== 1) {
            const toolTipList = map(getChildBusinessOptions(appStatus, currentBusinessOption), (item, key) => {
                const title = (item.id === id) ? <strong>{item.short_name}</strong> : item.short_name;
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


    redirectTo(url) {
        this.props.history.push(url);
    }

    render() {
        const businessOptionPageProps = {
            appStatus: this.props.appStatus,
            onHandleToolTip: this.onHandleToolTip,
            goTo: this.goTo,
            onClickUpdateStatus: this.onClickUpdateStatus
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