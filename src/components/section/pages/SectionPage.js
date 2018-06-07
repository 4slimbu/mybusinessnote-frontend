import React, {Component} from "react";
import {connect} from "react-redux";
import PropTypes from "prop-types";
import {setToolTipContent} from "../../../actions/appStatusAction";
import {Link, withRouter} from "react-router-dom";
import {addFlashMessage} from "../../../actions/flashMessageAction";
import {map} from "lodash";
import * as classnames from "classnames";
import {
    filterBusinessOptionsBySection,
    generateAppRelativeUrl,
    hasChildBusinessOptions,
    isItemLoaded,
    isSectionLocked
} from "../../../utils/helper/helperFunctions";
import LevelHead from "../../level/includes/LevelHead";

class SectionPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isEdit: false
        }
    }

    componentDidMount() {
        // this.$el = $(this.el);
        // this.$el.mCustomScrollbar({
        //     mouseWheel: {scrollAmount: 300}
        // });
    }


    onClickNext(e) {
        e.preventDefault();
        this.props.getBusinessOption(this.props.appStatus);
    }

    render() {
        const {appStatus, onHandleToolTip} = this.props;
        const {currentLevel, currentSection, businessOptionStatuses = [{}]} = this.props.appStatus;
        const relevantBusinessOptions = filterBusinessOptionsBySection(appStatus, currentSection.id);

        const businessOptionList = map(relevantBusinessOptions, (businessOption, key) => {
            const businessOptionUrl = generateAppRelativeUrl(currentLevel.slug, currentSection.slug, businessOption.id);
            const isLocked = isSectionLocked(businessOptionStatuses, businessOption);
            const stackedClass = hasChildBusinessOptions(appStatus, businessOption) ? 'paper' : '';
            const lockedClass = isLocked ? 'locked' : '';
            return (
                <li key={businessOption.id} className={classnames(lockedClass, stackedClass, 'active')}
                    onTouchEnd={(e) => onHandleToolTip(e, businessOption.id)}
                    onMouseEnter={(e) => onHandleToolTip(e, businessOption.id)}
                    onClick={(e) => onHandleToolTip(e, businessOption.id)}
                >
                    <Link className="link-box" to={businessOptionUrl}>
                        <div className="red-icon circular-white-bg" href="#">
                            {/*{businessOption.short_name}*/}
                            <img src={businessOption.icon}
                                 alt=""/>
                        </div>
                    </Link>
                </li>
            )
        });

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
                        {/*<div className="progress-bar" role="progressbar" aria-valuenow="60"*/}
                             {/*aria-valuemin="0" aria-valuemax="100"*/}
                             {/*style={{width: currentSection.completed_percent + '%'}}>*/}
                        {/*</div>*/}
                    </div>
                    <ul className="disc-style clearfix">
                        {isItemLoaded(this.props.appStatus.businessOptions) && businessOptionList}
                    </ul>
                </div>
            </div>
        );
    }
}

SectionPage.propTypes = {
    auth: PropTypes.object.isRequired,
    appStatus: PropTypes.object.isRequired,
    setToolTipContent: PropTypes.func.isRequired,
    addFlashMessage: PropTypes.func.isRequired,
    onHandleToolTip: PropTypes.func.isRequired
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
})(SectionPage));