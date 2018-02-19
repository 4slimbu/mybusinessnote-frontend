import React, {Component} from "react";
import PropTypes from "prop-types";
import {Link, withRouter} from "react-router-dom";
import NewsList from '../../components/news/NewsList';
import UserInfoLinks from "../navigation/UserInfoLinks";
import $ from "jquery";

class ToolTip extends Component {

    componentDidMount() {
        this.$el = $(this.el);
        this.$el.mCustomScrollbar({
            mouseWheel: {scrollAmount: 300}
        });
    }

    render() {

        const {toolTip, currentNewsTerm, logout, history, auth} = this.props;

        const onLogout = function (e) {
            e.preventDefault();

            logout();
            history.push('/');
        };


        const dashboardUrl = process.env.REACT_APP_DASHBOARD_URL + '/?token=' + localStorage.getItem("jwtToken");

        return (
            <section ref={el => this.el = el} className="right-sec bg-white mCustomScrollbar f-right bg-white"
                     data-mcs-theme="dark">
                <div className="content-wrapper">
                    <div className="hidden-xs">
                        <UserInfoLinks/>
                    </div>
                    {
                        toolTip &&
                        <div>
                            <h5>Hint and tips</h5>
                            {toolTip.rawHtmlContent &&
                            <div className="content-wrap" dangerouslySetInnerHTML={{__html: toolTip.rawHtmlContent}}/>}
                            <div className="acc-wrapper">
                                <div className="panel-group" id="accordion" role="tablist" aria-multiselectable="true">
                                    {toolTip.accordion}
                                </div>
                            </div>
                        </div>
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

ToolTip.propTypes = {
    businessCategories: PropTypes.object.isRequired,
    currentTipCategoryId: PropTypes.string,
    auth: PropTypes.object.isRequired,
    logout: PropTypes.func.isRequired,
};

export default withRouter(ToolTip);