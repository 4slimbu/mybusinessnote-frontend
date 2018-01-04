import React, {Component} from "react";
import LevelIntroPage from "./LevelIntroPage";
import {connect} from "react-redux";
import PropTypes from "prop-types";
import {filterLevelsBySlug, firstSectionUrl, generateLevelCompletedPercent} from "../navigation/helperFunctions";
import {getBusinessOption, setCurrentLevel, setCurrentSection} from "../../actions/appStatusAction";

class LevelPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            currentLevel: {},
        };
        this.onClickStart = this.onClickStart.bind(this);
    }

    componentDidMount() {
        this.setState({
           currentLevel: this.props.match.params
        });
        console.log("filter by slug", this.props.match.params.level);

    }

    onClickStart() {
        const currentLevel = filterLevelsBySlug(this.props.appStatus.levels, this.props.match.params.level);
        console.log('current level: ', currentLevel);
        this.props.setCurrentLevel(currentLevel);
        this.props.setCurrentSection(currentLevel.sections[0]);
        this.props.history.push(firstSectionUrl(this.props.appStatus.currentLevel));
    }

    render() {
        let page;
        const { levels = [], currentLevel = {} } = this.props.appStatus;

        const completedPercent = generateLevelCompletedPercent(levels, currentLevel);

        console.log('completed percent', completedPercent);

        page = (<LevelIntroPage appStatus={this.props.appStatus} level={currentLevel} onClickStart={this.onClickStart}/>);

        if (completedPercent === -1) {
            console.log('inside completed percent === -1 ');
            page = (
                <section className="mid-sec bg-red mCustomScrollbar" data-mcs-theme="dark">
                    <div className="content-wrapper step-one">
                    </div>
                </section>
            );
        }

        // if (completedPercent === 100) {
        //     console.log('inside completed percent === 100')
        //     page = (<LevelCompletePage level={currentLevel}/>)
        // }

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
    setCurrentSection: PropTypes.func.isRequired
};

function mapStateToProps(state) {
    return {
        appStatus: state.appStatusReducer
    }
}

export default connect(mapStateToProps, {getBusinessOption, setCurrentLevel, setCurrentSection} )(LevelPage);