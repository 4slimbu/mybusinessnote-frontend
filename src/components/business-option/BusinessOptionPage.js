import React, {Component} from "react";
import PropTypes from "prop-types";
import LevelHead from "../level/LevelHead";
import Element from "../elements/Element";

class BusinessOptionPage extends Component {
    render() {
        const {
            currentLevel, currentSection, currentBusinessOption, getBusinessOptionFromUrl

        } = this.props;
        const onClickNext= function(e) {
            e.preventDefault();
            getBusinessOptionFromUrl(currentBusinessOption.links.next);
        };
        const onClickBack= function(e) {
            e.preventDefault();
            getBusinessOptionFromUrl(currentBusinessOption.links.prev);
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
                                <Element element={currentBusinessOption.element} onClick={(e) => onClickNext(e).bind(this)}/>
                            }
                        </div>
                    </div>
                    :
                        <div>
                            <div className='clearfix'>
                                <a className="back-link pull-left" href="#" onClick={(e) => onClickBack(e)}>
                                    <i className="fa fa-chevron-left" aria-hidden="true"></i>
                                    back</a>
                                <a className="pull-right back-link" href="#" onClick={(e) => onClickNext(e)}>
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
                                <p>{ currentBusinessOption.name }</p>

                                <div>
                                    {
                                        currentBusinessOption.element &&
                                        <Element element={currentBusinessOption.element} onClickNext={(e) => onClickNext(e)}/>
                                    }
                                </div>
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
    onClickNext: PropTypes.func.isRequired,
};


export default BusinessOptionPage;