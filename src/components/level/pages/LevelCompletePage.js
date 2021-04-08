import React, {Component} from "react";
import {Link, withRouter} from "react-router-dom";
import PropTypes from "prop-types";
import {
    dashboardUrl, generateAppRelativeUrl, getByEventType, getCurrentLevelByUrl, getNext, isItemLoaded,
    publicUrl
} from "../../../utils/helper/helperFunctions";
import {setEvents} from "../../../actions/appStatusAction";
import {connect} from "react-redux";
import {ROUTES} from "../../../constants/routes";

class LevelCompletePage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            currentLevel: {},
            nextLevel: {},
            nextLevelUrl: '/'
        };
    }

    componentDidMount() {
        const {appStatus, history, location} = this.props;
        const currentLevel = getCurrentLevelByUrl(appStatus.levels, location.pathname);
        const nextLevel = getNext(appStatus.levels, currentLevel.id);
        const nextLevelUrl = isItemLoaded(nextLevel) ? '/level/' + nextLevel.slug : dashboardUrl();

        // if (!isItemLoaded(appStatus.events) || !isItemLoaded(getByEventType(appStatus.events, 'levelCompleted'))) {
        //     history.push(ROUTES.HOME);
        //     return;
        // }

        this.setState({
            ...this.state,
            currentLevel: currentLevel,
            nextLevel: nextLevel,
            nextLevelUrl: nextLevelUrl
        })
    }

    componentWillUnmount() {
        this.props.setEvents([]);
    }

    onClickContinue(e, url) {
        e.preventDefault();

        this.props.setEvents([]);
        this.props.history.push(url);
    }

    render() {

        return (
            <div className="level-complete">
                <h5 className="obvious-h5 hidden-xs">{this.state.currentLevel.name}</h5>
                {this.state.currentLevel.badge_message &&
                <div className="content-wrap" dangerouslySetInnerHTML={{__html: this.state.currentLevel.badge_message}}/>}
                <img className="complete-block-img"
                     src={publicUrl('/assets/images/level-complete.png')} alt=""/>
                <div className="bottom-block-complete">
                    {
                        !isItemLoaded(this.state.nextLevel) ?
                            <div className="btn-wrap">
                                <a href={dashboardUrl()} className="btn btn-default btn-md">Go to Dashboard</a>
                                <br/><br/>
                            </div>
                            :
                            <div>
                                <div className="btn-wrap">
                                    <Link
                                          to={this.state.nextLevelUrl}
                                          onClick={(e) => this.onClickContinue(e, this.state.nextLevelUrl)}
                                          className="btn btn-default btn-md">Continue to
                                        level {this.state.nextLevel.id}</Link>
                                </div>
                                <Link
                                      to={this.state.nextLevelUrl}
                                      onClick={(e) => this.onClickContinue(e, this.state.nextLevelUrl)}
                                      className="next-session-link">
                                    <i className="fa fa-chevron-down" aria-hidden="true"></i>
                                </Link>
                                <h6>{this.state.nextLevel.name}</h6>
                            </div>
                    }
                </div>
            </div>
        );
    }

}

LevelCompletePage.propTypes = {
    appStatus: PropTypes.object.isRequired,
    setEvents: PropTypes.func.isRequired
};

function mapStateToProps(state) {
    return {
        appStatus: state.appStatusReducer
    }
}

export default withRouter(connect(mapStateToProps, {
    setEvents
})(LevelCompletePage));