import React, {Component} from "react";
import LevelIntroPage from "./pages/LevelIntroPage";
import {connect} from "react-redux";
import PropTypes from "prop-types";
import {
    extractLevelFromLocation,
    generateAppRelativeUrl,
    getBySlug,
    getCurrentLevelSections,
    getFirst,
    isItemLoaded,
    isLevelLocked,
} from "../../utils/helper/helperFunctions";
import {setCurrent, setEvents, setToolTipContent} from "../../actions/appStatusAction";
import {addFlashMessage} from "../../actions/flashMessageAction";
import {map} from "lodash";
import {Panel, PanelGroup} from "react-bootstrap";
import {withRouter} from "react-router-dom";
import {MESSAGES} from "../../constants/messages";
import LevelDownPage from "./pages/LevelDownPage";

class LevelContainer extends Component {
    constructor(props) {
        super(props);

        this.onClickLevelLink = this.onClickLevelLink.bind(this);
        this.onClickContinue = this.onClickContinue.bind(this);
        this.goTo = this.goTo.bind(this);
        this.onHandleToolTip = this.onHandleToolTip.bind(this);
        this.onHandleToolTipSelect = this.onHandleToolTipSelect.bind(this);
    }

    componentDidMount() {
        this.bootstrap(this.props);
    }

    componentWillReceiveProps(nextProps) {
        if (this.props.location.pathname !== nextProps.location.pathname) {
            this.bootstrap(nextProps);
        }
    }

    bootstrap(props) {
        const {levels} = props.appStatus;
        const location = props.location.pathname;
        const levelSlug = extractLevelFromLocation(location);
        const currentLevel = getBySlug(levels, levelSlug);

        props.setCurrent(currentLevel);

        if (isItemLoaded(currentLevel) && ! currentLevel.is_down) {
            this.displayToolTip(props);
        }
    }

    onClickLevelLink(e, levelUrl) {
        e.preventDefault();
        const {
            appStatus, history
        } = this.props;
        const {currentLevel} = this.props.appStatus;
        const nextLevel = (appStatus.levels && appStatus.levels[currentLevel.id]) ? appStatus.levels[currentLevel.id] : currentLevel;

        setCurrent(nextLevel);
        history.push(levelUrl);
    };

    onClickContinue(e) {
        e.preventDefault();
        const {appStatus, history} = this.props;
        const {sections, currentLevel} = appStatus;

        if (isLevelLocked(appStatus, currentLevel)) {
            this.props.addFlashMessage({
                type: 'error',
                text: MESSAGES.ERR_LOCKED
            });
            return;
        }

        const levelSections = getCurrentLevelSections(sections, currentLevel.id);
        const firstSection = getFirst(levelSections);
        setCurrent(currentLevel, firstSection);
        history.push(generateAppRelativeUrl(currentLevel.slug, firstSection.slug));
    };

    goTo(e, url) {
        e.preventDefault();
        const {history} = this.props;
        history.push(url);
    };

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
        const {levels} = appStatus;
        const pathname = props.location.pathname;
        const levelSlug = extractLevelFromLocation(pathname);
        const currentLevel = getBySlug(levels, levelSlug);
        const toolTip = {};

        // Set tooltip content for level
        toolTip.title = currentLevel.tooltip_title;
        toolTip.rawHtmlContent = currentLevel.tooltip;

        // Set tooltip accordion for levels other than level 1
        if (currentLevel.id !== 1) {
            const toolTipList = map(getCurrentLevelSections(appStatus.sections, currentLevel.id), (item, key) => {
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
        const {appStatus} = this.props;
        const {currentLevel} = appStatus;
        const levelIntroPageProps = {
            appStatus: this.props.appStatus,
            currentLevel: currentLevel,
            onClickLevelLink: this.onClickLevelLink,
            goTo: this.goTo,
            onClickContinue: this.onClickContinue,
            onHandleToolTip: this.onHandleToolTip
        };

        const levelDownPageProps = {
            currentLevel: currentLevel
        };

        return (
            isItemLoaded(currentLevel) ?
                currentLevel.is_down ?
                    <LevelDownPage {...levelDownPageProps}/>
                    :
                    <LevelIntroPage {...levelIntroPageProps}/>
                :
                <div></div>
        );
    }
}

LevelContainer.propTypes = {
    appStatus: PropTypes.object.isRequired,
    setToolTipContent: PropTypes.func.isRequired,
    addFlashMessage: PropTypes.func.isRequired,
    setEvents: PropTypes.func.isRequired
};

function mapStateToProps(state) {
    return {
        appStatus: state.appStatusReducer
    }
}

export default withRouter(connect(mapStateToProps, {
    setCurrent,
    addFlashMessage,
    setToolTipContent,
    setEvents
})(LevelContainer));