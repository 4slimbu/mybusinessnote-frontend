import React, {Component} from "react";
import LevelIntroPage from "./pages/LevelIntroPage";
import {connect} from "react-redux";
import PropTypes from "prop-types";
import {
    extractLevelFromLocation,
    generateAppRelativeUrl,
    getBySlug,
    getCurrentLevelByUrl,
    getCurrentLevelSections,
    getFirst,
    getNext,
    isItemLoaded,
    isLevelLocked,
} from "../../utils/helper/helperFunctions";
import {setCurrent, setToolTipContent} from "../../actions/appStatusAction";
import LevelCompletePage from "./pages/LevelCompletePage";
import {addFlashMessage} from "../../actions/flashMessageAction";
import {map} from "lodash";
import {Panel, PanelGroup} from "react-bootstrap";
import {withRouter} from "react-router-dom";
import {MESSAGES} from "../../constants/messages";

class LevelContainer extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isCurrentLevelSet: false,
            isCurrentLevelComplete: true,
        };

        this.onClickLevelLink = this.onClickLevelLink.bind(this);
        this.onClickContinue = this.onClickContinue.bind(this);
        this.onClickSectionLink = this.onClickSectionLink.bind(this);
        this.onHandleToolTip = this.onHandleToolTip.bind(this);
        this.onHandleToolTipSelect = this.onHandleToolTipSelect.bind(this);
    }

    componentDidMount() {
        this.bootstrap(this.props, this.props.location.pathname);
    }

    componentWillReceiveProps(nextProps) {
        if (this.props.location.pathname !== nextProps.location.pathname) {
            this.bootstrap(nextProps, nextProps.location.pathname)
        }
    }

    bootstrap(props, location) {
        const {levels} = props.appStatus;
        const levelSlug = extractLevelFromLocation(location);
        const currentLevel = getBySlug(levels, levelSlug);
        props.setCurrent(currentLevel);
        this.displayToolTip(props);
    }


    onClickLevelLink(e, levelUrl) {
        e.preventDefault();
        const {
            setShowCompletedPage,
            appStatus, history
        } = this.props;
        const {currentLevel} = this.props.appStatus;
        const nextLevel = (appStatus.levels && appStatus.levels[currentLevel.id]) ? appStatus.levels[currentLevel.id] : currentLevel;

        setCurrent(nextLevel);
        setShowCompletedPage(false);
        history.push(levelUrl);
    };

    onClickContinue(e) {
        e.preventDefault();
        const {appStatus, history} = this.props;
        const {sections, businessStatus, currentLevel} = appStatus;

        if (isLevelLocked(businessStatus.businessOptionStatuses, currentLevel)) {
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

    onClickSectionLink(e, level, section, isLocked) {
        e.preventDefault();
        if (isLocked) {
            return;
        }
        const {history} = this.props;
        setCurrent(level, section);
        history.push(generateAppRelativeUrl(level.slug, section.slug));
    };

    onHandleToolTip(e, id) {
        e.preventDefault();
        this.displayToolTip(this.props, id);
    }

    onHandleToolTipSelect(newKey) {
        this.displayToolTip(this.props, newKey);
    }

    displayToolTip(props, id = 0) {
        const {setToolTipContent, appStatus} = props;
        const {currentLevel} = appStatus;
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

        const toolTip = {};
        toolTip.rawHtmlContent = currentLevel.tooltip;
        toolTip.accordion = (
            <PanelGroup accordion id={`accordion-uncontrolled-level-three-sections`} activeKey={id}
                        onSelect={(newKey) => this.onHandleToolTipSelect(newKey)}>
                {toolTipList}
            </PanelGroup>
        );
        setToolTipContent(toolTip);
    }

    render() {
        const {appStatus} = this.props;
        const {currentLevel} = this.props.appStatus;
        const nextLevel = getNext(appStatus.levels, currentLevel.id);
        const levelIntroPageProps = {
            appStatus: this.props.appStatus,
            currentLevel: currentLevel,
            onClickLevelLink: this.onClickLevelLink,
            onClickSectionLink: this.onClickSectionLink,
            onClickContinue: this.onClickContinue,
            onHandleToolTip: this.onHandleToolTip
        };
        const levelCompletePageProps = {
            currentLevel: currentLevel,
            nextLevel: nextLevel,
            onClickLevelLink: this.onClickLevelLink
        };

        return (
            isItemLoaded(this.props.appStatus.currentLevel) ?
                this.props.appStatus.isShowLevelCompletePage ?
                    <LevelCompletePage {...levelCompletePageProps}/>
                    :
                    <LevelIntroPage {...levelIntroPageProps}/>
                :
                <div></div>
        );
    }
}

LevelContainer.propTypes = {
    appStatus: PropTypes.object.isRequired,
    getBusinessOption: PropTypes.func.isRequired,
    setCurrentLevel: PropTypes.func.isRequired,
    setCurrentSection: PropTypes.func.isRequired,
    setCurrentBusinessOption: PropTypes.func.isRequired,
    setCompletedStatus: PropTypes.func.isRequired,
    setToolTipContent: PropTypes.func.isRequired,
    getCurrentLevelByUrl: PropTypes.func.isRequired,
    setShowCompletedPage: PropTypes.func.isRequired,
    addFlashMessage: PropTypes.func.isRequired
};

function mapStateToProps(state) {
    return {
        appStatus: state.appStatusReducer
    }
}

export default withRouter(connect(mapStateToProps, {
    setCurrent,
    getCurrentLevelByUrl,
    addFlashMessage,
    setToolTipContent,
})(LevelContainer));