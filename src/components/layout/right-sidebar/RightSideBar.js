import React, {Component} from "react";
import PropTypes from "prop-types";
import {withRouter} from "react-router-dom";
import $ from "jquery";
import UserInfoLinks from "./current-user-box/UserInfoLinks";
import NewsList from "./news/NewsList";
import {connect} from "react-redux";
import {getAppStatus} from "../../../actions/appStatusAction";
import ToolTip from "./tooltip/ToolTip";
import {makeRequest} from "../../../actions/requestAction";
import {setNews} from "../../../actions/newsAction";
import {extractSectionFromLocation} from "../../../utils/helper/helperFunctions";

class RightSideBar extends Component {

    componentDidMount() {
        this.$el = $(this.el);
        this.$el.mCustomScrollbar({
            mouseWheel: {scrollAmount: 300}
        });
    }

    render() {

        const {appStatus, makeRequest, setNews, news} = this.props;
        const toolTip = appStatus.toolTip;
        const newsTerm = extractSectionFromLocation(this.props.location.pathname);
        const newsListProps = {
            newsTerm: newsTerm,
            makeRequest: makeRequest,
            setNews: setNews,
            news: news
        };

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
                        <NewsList {...newsListProps}/>
                    </div>
                </div>
            </section>
        );
    }
}

RightSideBar.propTypes = {
    appStatus: PropTypes.object.isRequired,
    news: PropTypes.array.isRequired,
};

function mapStateToProps(state) {
    return {
        appStatus: state.appStatusReducer,
        news: state.newsReducer
    }
}

export default withRouter(connect(mapStateToProps, {
    makeRequest,
    setNews,
    getAppStatus,
})(RightSideBar));