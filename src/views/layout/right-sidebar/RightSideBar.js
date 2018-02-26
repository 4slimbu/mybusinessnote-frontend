import React, {Component} from "react";
import PropTypes from "prop-types";
import {withRouter} from "react-router-dom";
import $ from "jquery";
import UserInfoLinks from "./current-user-box/UserInfoLinks";
import NewsList from "./news/NewsList";
import {connect} from "react-redux";
import {getAppStatus} from "../../../services/actions/appStatusAction";
import ToolTip from "./tooltip/ToolTip";

class RightSideBar extends Component {

    componentDidMount() {
        this.$el = $(this.el);
        this.$el.mCustomScrollbar({
            mouseWheel: {scrollAmount: 300}
        });
    }

    render() {

        const {appStatus} = this.props;
        const toolTip = appStatus.toolTip;
        const currentNewsTerm = appStatus.currentBusinessOption.section_slug;

        return (
            <section ref={el => this.el = el} className="right-sec bg-white mCustomScrollbar f-right bg-white"
                     data-mcs-theme="dark">
                <div className="content-wrapper">
                    <div className="hidden-xs">
                        <UserInfoLinks/>
                    </div>
                    {
                        toolTip &&
                        <ToolTip {...toolTip}/>
                    }
                    <div className="news-events-wrap">
                        <h5 className="news-title">News & Informations</h5>
                        <NewsList currentNewsTerm={currentNewsTerm}/>
                    </div>
                </div>
            </section>
        );
    }
}

RightSideBar.propTypes = {
    appStatus: PropTypes.object.isRequired,
};

function mapStateToProps(state) {
    return {
        appStatus: state.appStatusReducer,
    }
}

export default withRouter(connect(mapStateToProps, {
    getAppStatus,
})(RightSideBar));