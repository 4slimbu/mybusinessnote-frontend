import React, {Component} from "react";
import {connect} from "react-redux";
import PropTypes from "prop-types";
import {setEvents, setToolTipContent} from "../../../actions/appStatusAction";
import {Link, withRouter} from "react-router-dom";
import {addFlashMessage} from "../../../actions/flashMessageAction";
import {map} from "lodash";
import LevelHead from "../../level/includes/LevelHead";
import {generateAppRelativeUrl, getByEventType, getStatus, isItemLoaded} from "../../../utils/helper/helperFunctions";
import {ROUTES} from "../../../constants/routes";

class SectionCompletePage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isEdit: false
        }

        this.onClickContinue = this.onClickContinue.bind(this);
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
        const {appStatus} = this.props;
        const {currentLevel, currentSection} = this.props.appStatus;
        const sectionStatus = getStatus(appStatus.businessStatus.sectionStatuses, currentSection.id);
        const completedPercent = sectionStatus.completed_percent ? sectionStatus.completed_percent : 0;


        const levelHeadProps = {
            appStatus: this.props.appStatus
        };

        return (
            <div>
                <LevelHead {...levelHeadProps}/>

                <div className="alert-form">
                    <div className="alert-head pos-relative">
                        <div>
                            <Link className="pull-left abs-back" to={generateAppRelativeUrl(currentLevel.slug)}>
                                <i className="fa fa-chevron-left" aria-hidden="true"></i>
                            </Link>
                            <img className="red-icon mCS_img_loaded" src={currentSection.icon} alt=""/>
                            <h6>{currentSection.name}</h6>
                        </div>
                    </div>
                    <div className="progress c-progress">
                        <div className="progress-bar" role="progressbar" aria-valuenow="60"
                             aria-valuemin="0" aria-valuemax="100"
                             style={{width: completedPercent + '%'}}>
                        </div>
                    </div>
                    <div className="alert-f-body">
                        <div className="completed-section">
                            <img className="complete-tick"
                                 src={`${process.env.PUBLIC_URL}/assets/images/completed-tick.png`}
                                 alt=""/>
                            <p className="para-with-padding">Well done for completing this section!</p>
                            <Link to={generateAppRelativeUrl(currentLevel.slug)} onClick={(e) => this.onClickContinue(e, generateAppRelativeUrl(currentLevel.slug))}
                                  className="btn btn-default btn-lg btn-alert">Continue</Link>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

SectionCompletePage.propTypes = {
    auth: PropTypes.object.isRequired,
    appStatus: PropTypes.object.isRequired,
    setToolTipContent: PropTypes.func.isRequired,
    addFlashMessage: PropTypes.func.isRequired,
    onHandleToolTip: PropTypes.func.isRequired,
    goTo: PropTypes.func.isRequired,
};

function mapStateToProps(state) {
    return {
        appStatus: state.appStatusReducer,
        auth: state.authReducer
    }
}

export default withRouter(connect(mapStateToProps, {
    setToolTipContent,
    addFlashMessage,
    setEvents,
})(SectionCompletePage));