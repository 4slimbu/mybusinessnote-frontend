import React, {Component} from "react";
import PropTypes from "prop-types";
import {withRouter} from "react-router-dom";
import $ from "jquery";
import UserInfoLinks from "./current-user-box/UserInfoLinks";
import NewsList from "./news/NewsList";
import {connect} from "react-redux";
import ToolTip from "./tooltip/ToolTip";
import {makeRequest} from "../../../actions/requestAction";
import {setNews} from "../../../actions/newsAction";
import {isItemLoaded} from "../../../utils/helper/helperFunctions";

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
        const newsListProps = {
            makeRequest: makeRequest,
            setNews: setNews,
            news: news
        };

        return (
            <section ref={el => this.el = el} className="right-sec bg-white mCustomScrollbar f-right bg-white"
                     data-mcs-theme="dark">
                <div className="content-wrapper">
                    <div className="hidden-xs mb-20">
                        <UserInfoLinks/>
                    </div>
                    {
                        isItemLoaded(toolTip) &&
                        <ToolTip {...toolTip}/>
                    }
                    {/*<div className="news-events-wrap">*/}
                        {/*<h5 className="news-title">News & Informations</h5>*/}
                        {/*<NewsList {...newsListProps}/>*/}
                    {/*</div>*/}
                </div>
            </section>
        );
    }
}

RightSideBar.propTypes = {
    appStatus: PropTypes.object.isRequired,
    news: PropTypes.object.isRequired,
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
})(RightSideBar));