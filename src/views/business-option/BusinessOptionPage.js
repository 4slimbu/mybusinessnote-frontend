import React, {Component} from "react";
import PropTypes from "prop-types";
import LevelHead from "../level/LevelHead";
import {getAppUrlFromApiUrl} from "../../utils/helper/helperFunctions";
import {withRouter} from "react-router-dom";
import Element from "./elements/old/Element";

class BusinessOptionPage extends Component {
    componentDidMount() {
        this.displayToolTip(this.props.currentBusinessOption.tooltip);
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.currentBusinessOption.id !== this.props.currentBusinessOption.id) {
            this.displayToolTip(nextProps.currentBusinessOption.tooltip);
        }
    }

    displayToolTip(content) {
        const toolTip = {};
        toolTip.rawHtmlContent = content;
        this.props.setToolTipContent(toolTip);
    }

    onClickNext(e) {
        e.preventDefault();
        const {
            currentLevel, currentBusinessOption, getBusinessOption, history,
            setCompletedStatus, addFlashMessage
        } = this.props;
        if (currentLevel.id === 3 && (currentBusinessOption.id === currentLevel.level_last_bo.id)) {
            addFlashMessage({
                type: "success",
                text: "Your journey ends here"
            });
            return;
        }
        getBusinessOption(currentBusinessOption.links.next);
        setCompletedStatus({});
        history.push(getAppUrlFromApiUrl(currentBusinessOption.links.next));
    }

    onClickBack(e) {
        const {
            currentLevel, currentBusinessOption, getBusinessOption, history, setCompletedStatus
        } = this.props;
        setCompletedStatus({});
        if (currentBusinessOption.id === currentLevel.level_first_bo.id) {
            history.push('/level/' + currentBusinessOption.level_slug);
            return;
        }
        getBusinessOption(currentBusinessOption.links.prev);
        history.push(getAppUrlFromApiUrl(currentBusinessOption.links.prev));
    }

    render() {
        const {
            appStatus, currentLevel, currentSection, currentBusinessOption
        } = this.props;
        let isComplete = false;

        const onComplete = function (bool) {
            isComplete = bool;
        };
        const isEnd = (currentLevel.id === 3 && (currentBusinessOption.id === currentLevel.level_last_bo.id));
        return (
            <div>
                <LevelHead currentLevel={currentLevel}/>
                {
                    (currentLevel.id == 1) ?
                        <div>
                            <h1>{currentBusinessOption.name}</h1>
                            <div className="content-wrap"
                                 dangerouslySetInnerHTML={{__html: currentBusinessOption.content}}/>
                            {
                                currentBusinessOption.element &&
                                <Element element={currentBusinessOption.element} onComplete={(bool) => onComplete(bool)}
                                         onClick={(e) => this.onClickNext(e).bind(this)}/>
                            }
                        </div>
                        :
                        <div>
                            <div className='clearfix'>
                                <a className="back-link pull-left" href="#" onClick={(e) => this.onClickBack(e)}>
                                    <i className="fa fa-chevron-left" aria-hidden="true"></i>
                                    back</a>
                                {
                                    (
                                        currentBusinessOption.business_business_option_status === 'done' ||
                                        currentBusinessOption.business_business_option_status === 'skipped' ||
                                        currentBusinessOption.business_business_option_status === 'irrelevant'

                                    ) && !isEnd &&
                                    <a className="pull-right front-link" href="#" onClick={(e) => this.onClickNext(e)}>
                                        next
                                        <i className="fa fa-chevron-right" aria-hidden="true"></i>
                                    </a>
                                }
                            </div>
                            <div className="alert-form">
                                <div className="alert-head">
                                    <div>
                                        <img className="red-icon mCS_img_loaded" src={currentSection.red_icon} alt=""/>
                                        <h6>{currentSection.name}</h6>
                                    </div>
                                </div>
                                <div className="progress c-progress">
                                    <div className="progress-bar" role="progressbar" aria-valuenow="60"
                                         aria-valuemin="0" aria-valuemax="100"
                                         style={{width: currentSection.completed_percent + '%'}}>
                                    </div>
                                </div>
                                {
                                    !appStatus.completed_status.level && appStatus.completed_status.section ?
                                        <div className="completed-section">
                                            <img className="complete-tick"
                                                 src={`${process.env.PUBLIC_URL}/assets/images/completed-tick.png`}
                                                 alt=""/>
                                            <p>Well done for completing this section!</p>
                                            <a href="#" onClick={(e) => this.onClickNext(e)}
                                               className="btn btn-default btn-lg btn-alert">Continue</a>
                                        </div>
                                        :
                                        <div>
                                            <p>{currentBusinessOption.name}</p>
                                            <div className="content-wrap"
                                                 dangerouslySetInnerHTML={{__html: currentBusinessOption.content}}/>
                                            <div>
                                                {
                                                    currentBusinessOption.element &&
                                                    <Element element={currentBusinessOption.element}
                                                             onClick={(e) => this.onClickNext(e)}/>
                                                }
                                            </div>
                                        </div>
                                }
                            </div>
                        </div>
                }
            </div>
        );
    }
}

BusinessOptionPage.propTypes = {
    currentLevel: PropTypes.object.isRequired,
    currentSection: PropTypes.object.isRequired,
    currentBusinessOption: PropTypes.object.isRequired,
    setCurrentLevel: PropTypes.func.isRequired,
    setCurrentSection: PropTypes.func.isRequired,
    setCurrentBusinessOption: PropTypes.func.isRequired,
    setCompletedStatus: PropTypes.func.isRequired,
    getBusinessOption: PropTypes.func.isRequired,
    getBusinessOptionFromUrl: PropTypes.func.isRequired,
    addFlashMessage: PropTypes.func.isRequired,
};


export default withRouter(BusinessOptionPage);