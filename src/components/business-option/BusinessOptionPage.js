import React, {Component} from "react";
import PropTypes from "prop-types";
import LevelHead from "../level/LevelHead";
import Element from "../elements/Element";
import {getBusinessOptionFromUrl} from "../../actions/appStatusAction";
import {getAppUrlFromApiUrl} from "../navigation/helperFunctions";
import {withRouter} from "react-router-dom";

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
        this.props.setToolTipContent(content);
    }
    onClickNext(e) {
        e.preventDefault();
        const {
            currentBusinessOption, getBusinessOption, history
        } = this.props;
        getBusinessOption(currentBusinessOption.links.next);
        history.push(getAppUrlFromApiUrl(currentBusinessOption.links.next));
    }

    onClickBack(e) {
        const {
            currentBusinessOption, getBusinessOption, history
        } = this.props;
        getBusinessOption(currentBusinessOption.links.prev);
        history.push(getAppUrlFromApiUrl(currentBusinessOption.links.prev));
    }

    render() {
        const {
            currentLevel, currentSection, currentBusinessOption
        } = this.props;
        let isComplete = false;

        const onComplete = function(bool) {
            isComplete = bool;
        };
        return (
            <div>
                <LevelHead currentLevel={currentLevel}/>
                {
                    (currentLevel.id == 1) ?
                    <div>
                        <h1>{currentBusinessOption.name}</h1>
                        <p>{currentBusinessOption.content}</p>
                        <div>
                            {
                                currentBusinessOption.element &&
                                <Element element={currentBusinessOption.element} onComplete={(bool) => onComplete(bool)} onClick={(e) => this.onClickNext(e).bind(this)}/>
                            }
                        </div>
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

                                    ) &&
                                    <a className="pull-right front-link" href="#" onClick={(e) => this.onClickNext(e)}>
                                        next
                                        <i className="fa fa-chevron-right" aria-hidden="true"></i>
                                    </a>
                                }
                            </div>
                            <div className="alert-form">
                                <div className="alert-head">
                                    <div>
                                        <img className="red-icon mCS_img_loaded" src={currentSection.red_icon} alt="" />
                                            <h6>{ currentSection.name }</h6>
                                    </div>
                                </div>
                                <div className="progress c-progress">
                                    <div className="progress-bar" role="progressbar" aria-valuenow="60" aria-valuemin="0" aria-valuemax="100" style={{ width: currentSection.completed_percent + '%'}}>
                                    </div>
                                </div>
                                {
                                    isComplete ?
                                        <div className="completed-section">
                                            <img className="complete-tick" src={`${process.env.PUBLIC_URL}/assets/images/completed-tick.png`} alt=""/>
                                                <p>Well done for completing this section!</p>
                                        </div>
                                        :
                                    <div>
                                        <p>{ currentBusinessOption.name }</p>

                                        <div>
                                            {
                                                currentBusinessOption.element &&
                                                <Element element={currentBusinessOption.element} onClick={(e) => this.onClickNext(e)}/>
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
    getBusinessOption: PropTypes.func.isRequired,
    getBusinessOptionFromUrl: PropTypes.func.isRequired,
};


export default withRouter(BusinessOptionPage);