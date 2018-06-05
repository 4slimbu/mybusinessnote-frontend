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
    getStatus, isItemLoaded,
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
        const {currentLevel, currentSection, businessOptions = [{}], businessOptionStatuses = [{}] } = this.props.appStatus;
        const relevantBusinessOptions = filterBusinessOptionsBySection(businessOptions, currentSection.id);

        const businessOptionList = map(relevantBusinessOptions, (businessOption, key) => {
            const businessOptionUrl = generateAppRelativeUrl(currentLevel.slug, currentSection.slug, businessOption.id);
            const isLocked = isSectionLocked(businessOptionStatuses, businessOption);
            const lockedClass = isLocked ? 'locked' : '';
            return (
                <li key={businessOption.id} className={classnames(lockedClass, 'active')}>
                    <Link className="link-box" to={businessOptionUrl}>
                        <div className="red-icon circular-white-bg" href="#">
                            <img src={businessOption.icon}
                                 alt=""/>
                        </div>
                    </Link>
                </li>
            )
        });

        const levelHeadProps = {
            currentLevel: currentLevel,
            appStatus: this.props.appStatus
        };

        return (
            <div>
                <LevelHead {...levelHeadProps}/>
                <h2>{ currentSection.name }</h2>
                <div className="content-wrap" dangerouslySetInnerHTML={{__html: currentSection.content}}/>
                <ul className="apps-icons clearfix level2-apps-icons">
                    {isItemLoaded(this.props.appStatus.businessOptions) && businessOptionList}
                </ul>
            </div>
        );
    }
}

SectionPage.propTypes = {
    auth: PropTypes.object.isRequired,
    appStatus: PropTypes.object.isRequired,
    setToolTipContent: PropTypes.func.isRequired,
    addFlashMessage: PropTypes.func.isRequired
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