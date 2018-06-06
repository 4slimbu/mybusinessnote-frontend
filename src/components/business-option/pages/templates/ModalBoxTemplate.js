import React from "react";
import PropTypes from "prop-types";
import LevelHead from "../../../level/includes/LevelHead";
import Element from "../../elements/Element";

const ModalBoxTemplate = ({appStatus}) => {
    const {currentSection, currentBusinessOption} = appStatus;
    return (
        <div>
            <LevelHead appStatus={appStatus}/>modal box template

            <div className='clearfix'>
                <a className="back-link pull-left" href="#" onClick={(e) => this.onClickBack(e)}>
                    <i className="fa fa-chevron-left" aria-hidden="true"></i>
                    back</a>
                {
                    (
                        currentBusinessOption.status === 'done' ||
                        currentBusinessOption.status === 'skipped' ||
                        currentBusinessOption.status === 'irrelevant'

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
                    appStatus.completed_status ?
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
    )
};

ModalBoxTemplate.propTypes = {
    levelHeadProps: PropTypes.object.isRequired,
    currentBusinessOption: PropTypes.object.isRequired
};

export default ModalBoxTemplate;