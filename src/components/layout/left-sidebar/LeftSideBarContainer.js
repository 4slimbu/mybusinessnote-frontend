import React, {Component} from "react";
import {Link, withRouter} from "react-router-dom";
import {connect} from "react-redux";
import LevelLinks from "./navigation/LevelLinks";
import {logout} from "../../../actions/authActions";
import {setCurrent} from "../../../actions/appStatusAction";
import {addFlashMessage} from "../../../actions/flashMessageAction";
import PropTypes from "prop-types";
import {generateAppRelativeUrl, getById, getFirst, publicUrl} from "../../../utils/helper/helperFunctions";
import MobileNavLinks from "./navigation/MobileNavLinks";

class LeftSideBarContainer extends Component {
    constructor(props) {
        super(props);

        this.onClickLevelLink = this.onClickLevelLink.bind(this);
        this.onClickSectionLink = this.onClickSectionLink.bind(this);
    }

    logout(e) {
        e.preventDefault();
        this.props.logout();
        this.props.history.push("/");
    }

    onClickLevelLink(e, level) {
        e.preventDefault();

        const levelUrl = generateAppRelativeUrl(level.slug);
        this.props.setCurrent(level);
        this.props.history.push(levelUrl);
    }

    onClickSectionLink(e, level, section, isLocked) {
        e.preventDefault();
        if (isLocked) {
            return;
        }
        const sectionUrl = generateAppRelativeUrl(level.slug, section.slug);
        this.props.history.push(sectionUrl);
    }

    render() {
        const {
            auth, appStatus, addFlashMessage, setCurrent,
            setCompletedStatus, getBusinessOptionFromUrl
        } = this.props;

        const levelLinksProps = {
            appStatus: appStatus,
            auth: auth,
            setCurrent: setCurrent,
            setCompletedStatus: setCompletedStatus,
            getBusinessOptionFromUrl: getBusinessOptionFromUrl,
            addFlashMessage: addFlashMessage,
            onClickLevelLink: this.onClickLevelLink,
            onClickSectionLink: this.onClickSectionLink
        };

        const mobileNavLinksProps = {
            appStatus: appStatus,
            auth: auth,
            setCurrent: setCurrent,
            setCompletedStatus: setCompletedStatus,
            getBusinessOptionFromUrl: getBusinessOptionFromUrl,
            addFlashMessage: addFlashMessage,
            onClickLevelLink: this.onClickLevelLink,
            onClickSectionLink: this.onClickSectionLink
        };

        const completed_percent = appStatus.currentLevel.completed_percent ? appStatus.currentLevel.completed_percent : 0;

        return (
            appStatus.levels &&
            <div>
                <section className="hidden-xs left-sec bg-navy">
                    <Link to="/" className="site-branding">
                        <img src={`${publicUrl()}/assets/images/app_logo_256.png`} alt=""/>
                    </Link>
                    <h3 className="tagline-head">Let your <br/>journey begins</h3>

                    <div className="menu-accordion">
                        <div className="panel-group" id="accordion2" role="tablist" aria-multiselectable="true">
                            <LevelLinks {...levelLinksProps}/>
                        </div>
                    </div>
                </section>
                <section className="hidden-sm hidden-md hidden-lg content-block">
                    <MobileNavLinks {...mobileNavLinksProps}/>

                    <div className="progress">
                        <div className="progress-bar" role="progressbar" aria-valuenow="60" aria-valuemin="0"
                             aria-valuemax="100" style={{width: completed_percent + "%"}}>
                        </div>
                    </div>
                </section>
            </div>
        )
    }
}

LeftSideBarContainer.propTypes = {
    auth: PropTypes.object.isRequired,
    logout: PropTypes.func.isRequired,
    appStatus: PropTypes.object.isRequired,
    setCurrent: PropTypes.func.isRequired,
    addFlashMessage: PropTypes.func.isRequired
};

function mapStateToProps(state) {
    return {
        auth: state.authReducer,
        appStatus: state.appStatusReducer
    }
}


export default withRouter(connect(mapStateToProps, {
    logout,
    setCurrent,
    addFlashMessage,
})(LeftSideBarContainer));