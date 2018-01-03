import React, {Component} from "react";
import LevelIntroPage from "./LevelIntroPage";
import {connect} from "react-redux";
import PropTypes from "prop-types";
import {generateLevelCompletedPercent} from "../navigation/helperFunctions";
import {getFirstBusinessOptionUsingLevel} from "../../actions/businessOptionAction";

class LevelPage extends Component {
    constructor(props) {
        super(props);
        this.onClickStart = this.onClickStart.bind(this);
    }

    onClickStart() {
        this.props.getFirstBusinessOptionUsingLevel(this.props.appStatus.currentLevel)
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
    getFirstBusinessOptionUsingLevel: PropTypes.func.isRequired
};

function mapStateToProps(state) {
    return {
        appStatus: state.appStatusReducer
    }
}

export default connect(mapStateToProps, {getFirstBusinessOptionUsingLevel} )(LevelPage);