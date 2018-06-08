import React from "react";
import PropTypes from "prop-types";
import LevelHead from "../../../level/includes/LevelHead";
import Element from "../../elements/Element";
import {Link} from "react-router-dom";
import {
    filterFirstInCollection,
    generateAppRelativeUrl, getChildBusinessOptions, getStatus, hasChildBusinessOptions, isItemLoaded,
    isSectionLocked
} from "../../../../utils/helper/helperFunctions";
import {map} from "lodash";
import * as classnames from "classnames";
import OptionStatusButtonGroup from "../../../common/OptionStatusButtonGroup";

const ModalBoxTemplate = ({appStatus, onHandleToolTip, onClickUpdateStatus}) => {
    const {currentLevel, currentSection, currentBusinessOption, businessOptionStatuses} = appStatus;

    let backUrl = generateAppRelativeUrl(currentLevel.slug, currentSection.slug);
    if (currentBusinessOption.parent_id) {
        backUrl = generateAppRelativeUrl(currentLevel.slug, currentSection.slug, currentBusinessOption.parent_id);
    }

    let childBusinessOptions = getChildBusinessOptions(appStatus, currentBusinessOption);
    let businessOptionList;
    if (childBusinessOptions) {
        businessOptionList = map(childBusinessOptions, (businessOption, key) => {
            const businessOptionUrl = generateAppRelativeUrl(currentLevel.slug, currentSection.slug, businessOption.id);
            const isLocked = isSectionLocked(businessOptionStatuses, businessOption);
            const stackedClass = hasChildBusinessOptions(appStatus, businessOption) ? 'multiple-paper' : 'paper';
            const lockedClass = isLocked ? 'locked' : '';
            const businessOptionStatusObject = getStatus(appStatus.businessStatus.businessOptionStatuses, businessOption.id);
            const businessOptionStatus = businessOptionStatusObject.status ? businessOptionStatusObject.status : '';
            const completedClass = businessOptionStatus === 'done'  ? 'tick-done' : 'tick-incomplete';
            return (
                <li key={businessOption.id} className={classnames(lockedClass, stackedClass, 'active')}
                    onTouchEnd={(e) => onHandleToolTip(e, businessOption.id)}
                    onMouseOver={(e) => onHandleToolTip(e, businessOption.id)}
                    onClick={(e) => onHandleToolTip(e, businessOption.id)}
                >
                    <Link className="link-box" to={businessOptionUrl}>
                        <div className="red-icon circular-white-bg" href="#">
                            <img src={businessOption.icon}
                                 alt=""/>
                        </div>
                    </Link>
                    <span className={classnames(completedClass, 'glyphicon glyphicon-ok')}>
                    </span>
                </li>
            )
        });
    }

    const businessOptionStatusObject = getStatus(appStatus.businessStatus.businessOptionStatuses, currentBusinessOption.id);
    const optionStatusButtonGroupProps = {
        status: businessOptionStatusObject.status,
        onClickUpdateStatus: onClickUpdateStatus,
    };

    return (
        <div>
            <LevelHead appStatus={appStatus}/>

            <div className="alert-form">
                <div className="alert-head pos-relative">
                    <div>
                        <Link className="pull-left abs-back" to={backUrl}>
                            <i className="fa fa-chevron-left" aria-hidden="true"></i>
                        </Link>
                        <img className="red-icon mCS_img_loaded" src={currentBusinessOption.icon} alt=""/>
                        <h6>{currentBusinessOption.short_name}</h6>
                    </div>
                </div>
                <div className="progress c-progress">
                    {/*<div className="progress-bar" role="progressbar" aria-valuenow="60"*/}
                         {/*aria-valuemin="0" aria-valuemax="100"*/}
                         {/*style={{width: currentSection.completed_percent + '%'}}>*/}
                    {/*</div>*/}
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
                        (
                            isItemLoaded(businessOptionList) ?
                                <div className="alert-f-body">
                                    <div className="content-wrap"
                                         dangerouslySetInnerHTML={{__html: currentBusinessOption.content}}/>
                                    <ul className="disc-style clearfix">
                                        { businessOptionList }
                                    </ul>
                                </div>
                                    :
                                <div>
                                    <div className="alert-f-body">
                                        {
                                            currentBusinessOption.element &&
                                            <Element element={currentBusinessOption.element}
                                                     onClick={(e) => this.onClickNext(e)}/>
                                        }
                                    </div>
                                    <OptionStatusButtonGroup {...optionStatusButtonGroupProps}/>
                                </div>
                        )
                }
            </div>
        </div>
    )
};

ModalBoxTemplate.propTypes = {
    appStatus: PropTypes.object.isRequired,
    onHandleToolTip: PropTypes.func.isRequired,
    onClickUpdateStatus: PropTypes.func.isRequired
};

export default ModalBoxTemplate;