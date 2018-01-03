import React, {Component} from "react";
import LevelIntroPage from "./LevelIntroPage";
import LevelCompletePage from "./LevelCompletePage";
import {connect} from "react-redux";
import PropTypes from "prop-types";

class LevelPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            levelSlug: "",
        }
    }

    componentWillReceiveProps(nextProps) {
        this.setState({
            ...this.state,
            levelSlug: nextProps.match.params.level,
        })

    }

    render() {
        let page;
        const { levels = [], current = {} } = this.props.appStatus;

        // const completedPercent = (levels[this.state.levelSlug]) ? levels[this.state.levelSlug].completed_percent : 0;

        // page = (<LevelIntroPage appStatus={this.props.appStatus} levelSlug={this.state.levelSlug}/>);

        // if (completedPercent === -1) {
        //     page = (
        //         <section className="mid-sec bg-red mCustomScrollbar" data-mcs-theme="dark">
        //             <div className="content-wrapper step-one">
        //             </div>
        //         </section>
        //     );
        // }

        // if (completedPercent === 100) {
        //     page = (<LevelCompletePage level={this.state.level}/>)
        // }

        return (
            <div>
                { page }
            </div>
        );
    }
}

LevelPage.propTypes = {
    appStatus: PropTypes.object.isRequired
};

function mapStateToProps(state) {
    return {
        appStatus: state.appStatusReducer
    }
}

export default connect(mapStateToProps)(LevelPage);