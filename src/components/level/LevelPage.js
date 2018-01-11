import React, {Component} from "react";
import LevelIntroPage from "./LevelIntroPage";
import {connect} from "react-redux";
import PropTypes from "prop-types";
import {
    filterLevelsBySlug, firstSectionUrl, generateLevelCompletedPercent,
    getCurrentLevelByUrl
} from "../navigation/helperFunctions";
import {getBusinessOption, setCurrentLevel, setCurrentSection} from "../../actions/appStatusAction";
import LevelCompletePage from "./LevelCompletePage";

class LevelPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            currentLevel: {},
        };
        this.onClickStart = this.onClickStart.bind(this);
    }

    componentDidMount() {
        alert('level c d m');
        this.setState({
           currentLevel: this.props.match.params
        });
    }

    componentWillReceiveProps(nextProps) {
        alert('level c w r p');
        if (this.props.history.location.pathname != nextProps.history.location.pathname) {
            const currentLevel = getCurrentLevelByUrl(nextProps.appStatus.levels, nextProps.history.location.pathname);
            if (currentLevel && currentLevel.id) {
                nextProps.setCurrentLevel(currentLevel);
            }
        }
    }

    onClickStart() {
        const currentLevel = filterLevelsBySlug(this.props.appStatus.levels, this.props.match.params.level);
        this.props.setCurrentLevel(currentLevel);
        this.props.setCurrentSection(currentLevel.sections[0]);
        this.props.history.push(firstSectionUrl(this.props.appStatus.currentLevel));
    }

    render() {
        let page;
        const { levels = [], currentLevel = {} } = this.props.appStatus;

        const completedPercent = generateLevelCompletedPercent(levels, currentLevel);

        page = (<LevelIntroPage appStatus={this.props.appStatus} level={currentLevel} onClickStart={this.onClickStart}/>);

        if (completedPercent === -1) {
            page = (
                <section className="mid-sec bg-red mCustomScrollbar" data-mcs-theme="dark">
                    <div className="content-wrapper step-one">
                    </div>
                </section>
            );
        }

        if (completedPercent >= "100") {
            page = (<LevelCompletePage level={currentLevel}/>)
        }

        return (
            <div>
                { page }
            </div>
        );
    }
}

LevelPage.propTypes = {
    appStatus: PropTypes.object.isRequired,
    getBusinessOption: PropTypes.func.isRequired,
    setCurrentLevel: PropTypes.func.isRequired,
    setCurrentSection: PropTypes.func.isRequired,
    getCurrentLevelByUrl: PropTypes.func.isRequired
};

function mapStateToProps(state) {
    return {
        appStatus: state.appStatusReducer
    }
}

export default connect(mapStateToProps, {getBusinessOption, setCurrentLevel, setCurrentSection, getCurrentLevelByUrl} )(LevelPage);