import React, {Component} from "react";
import PropTypes from "prop-types";
import LevelHead from "../level/LevelHead";
import Element from "../elements/Element";
import {getBusinessOptionFromUrl} from "../../actions/appStatusAction";

class BusinessOptionPage extends Component {
    onClickNext(e) {
        const {
            currentBusinessOption, getBusinessOptionFromUrl
        } = this.props;
        e.preventDefault();
        getBusinessOptionFromUrl(currentBusinessOption.links.next);
    }

    onClickBack(e) {
        const {
            currentBusinessOption, getBusinessOptionFromUrl
        } = this.props;
        e.preventDefault();
        getBusinessOptionFromUrl(currentBusinessOption.links.prev);
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
                                <a className="pull-right back-link" href="#" onClick={(e) => this.onClickNext(e)}>
                                    next
                                    <i className="fa fa-chevron-right" aria-hidden="true"></i>
                                    </a>
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
    getBusinessOptionFromUrl: PropTypes.func.isRequired,
};


export default BusinessOptionPage;