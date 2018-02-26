import React, {Component} from "react";
import LevelIntroPage from "./pages/LevelIntroPage";
import {connect} from "react-redux";
import PropTypes from "prop-types";
import {
    generateLevelCompletedPercent,
    getCurrentLevelByUrl, isSectionLocked
} from "../../utils/helper/helperFunctions";
import {
    getBusinessOption, setCompletedStatus, setCurrentBusinessOption, setCurrentLevel,
    setCurrentSection, setShowCompletedPage, setToolTipContent
} from "../../services/actions/appStatusAction";
import LevelCompletePage from "./pages/LevelCompletePage";
import {addFlashMessage} from "../../services/actions/flashMessageAction";
import {map} from "lodash";
import {Panel, PanelGroup} from "react-bootstrap";

class LevelContainer extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isCurrentLevelSet: false,
            isCurrentLevelComplete: false,
        };

        this.onClickLevelLink = this.onClickLevelLink.bind(this);
        this.onClickContinue = this.onClickContinue.bind(this);
        this.onClickSectionLink = this.onClickSectionLink.bind(this);
        this.onHandleToolTip = this.onHandleToolTip.bind(this);
        this.onHandleToolTipSelect = this.onHandleToolTipSelect.bind(this);
    }

    componentDidMount() {
        this.populateLevelData(this.props.appStatus);
    }

    componentWillReceiveProps(nextProps) {
        this.populateLevelData(nextProps.appStatus);
    }

    populateLevelData(appStatus) {
        const {levels = [{}], currentLevel = {}} = appStatus;
        const levelCompletePercent = generateLevelCompletedPercent(levels, currentLevel);
        this.setState({
            isCurrentLevelSet: !(Object.keys(currentLevel).length === 0 && currentLevel.constructor === Object),
            isCurrentLevelComplete: levelCompletePercent === 100
        });
    }

    onClickLevelLink(e, levelUrl) {
        e.preventDefault();
        const {
            setCurrentLevel, setCurrentSection, setCurrentBusinessOption,
            setShowCompletedPage, setCompletedStatus,
            appStatus, history
        } = this.props;
        const {currentLevel} = this.props.appStatus;
        const nextLevel = (appStatus.levels && appStatus.levels[currentLevel.id]) ? appStatus.levels[currentLevel.id] : currentLevel;

        setCurrentLevel(nextLevel);
        setCurrentSection({});
        setCurrentBusinessOption({});
        setShowCompletedPage(false);
        setCompletedStatus({});
        history.push(levelUrl);
    };

    onClickContinue(e) {
        e.preventDefault();
        const {appStatus, setCurrentLevel, setCurrentSection, setCurrentBusinessOption, history} = this.props;
        const {level} = appStatus;
        if (isSectionLocked(appStatus, level, 0)) {
            return;
        }
        setCurrentLevel(level);
        setCurrentSection(level.sections[0]);
        setCurrentBusinessOption({});
        history.push('/level/' + level.slug + '/section/' + level.sections[0].slug);
    };

    onClickSectionLink(e, level, section, isLocked) {
        e.preventDefault();
        const {setCurrentLevel, setCurrentSection, setCurrentBusinessOption, history} = this.props;
        const sectionUrl = '/level/' + level.slug + '/section/' + section.slug;
        if (isLocked) {
            return;
        }
        setCurrentLevel(level);
        setCurrentSection(section);
        setCurrentBusinessOption({});
        history.push(sectionUrl);
    };

    onHandleToolTip(e, id) {
        e.preventDefault();
        this.displayToolTip(id);
    }

    onHandleToolTipSelect(newKey) {
        this.displayToolTip(newKey);
    }

    displayToolTip(id = 0) {
        const {setToolTipContent, appStatus} = this.props;
        const {currentLevel} = appStatus;
        const toolTipList = map(currentLevel.sections, (item, key) => {
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
        const { appStatus } = this.props;
        const {currentLevel} = this.props.appStatus;
        const nextLevel = (appStatus.levels && appStatus.levels[currentLevel.id]) ? appStatus.levels[currentLevel.id] : currentLevel;
        const levelIntroPageProps = {
            appStatus: this.props.appStatus,
            level: currentLevel,
            onClickLevelLink: this.onClickLevelLink,
            onClickSectionLink: this.onClickSectionLink,
            onClickContinue: this.onClickContinue,
            onHandleToolTip: this.onHandleToolTip
        };
        const levelCompletePageProps = {
            level: currentLevel,
            nextLevel: nextLevel,
            onClickLevelLink: this.onClickLevelLink
        };

        return (
            this.state.isCurrentLevelSet ?
                this.state.isCurrentLevelComplete ?
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

export default connect(mapStateToProps, {
    getBusinessOption,
    setCurrentLevel,
    setCurrentSection,
    setCompletedStatus,
    setCurrentBusinessOption,
    getCurrentLevelByUrl,
    addFlashMessage,
    setToolTipContent,
    setShowCompletedPage,
})(LevelContainer);