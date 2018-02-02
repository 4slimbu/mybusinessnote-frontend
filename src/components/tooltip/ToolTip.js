import React, {Component} from "react";
import PropTypes from "prop-types";
import {Link, withRouter} from "react-router-dom";

class ToolTip extends Component {
    render() {
        const { toolTip, logout, history, auth } = this.props;

        const onLogout = function(e) {
            e.preventDefault();

            logout();
            history.push('/');
        };



        return (
            <section className="right-sec bg-white mCustomScrollbar" data-mcs-theme="dark">
                <div className="content-wrapper">
                    {
                        auth.isAuthenticated ?
                        <div>
                            <h5>Welcome { auth.user.first_name } {auth.user.last_name }</h5>
                            <ul className="my-dashboard">
                                <li><a target="_blank" href={process.env.REACT_APP_DASHBOARD_URL}>My Dashboard</a></li>
                                <li><Link to="/logout" onClick={(e) => onLogout(e)}>Logout</Link></li>
                            </ul>
                           
                        </div>
                            :
                            <div>
                                Hi Guest! | <Link to="/login">Login</Link>
                                <hr />
                            </div>
                    }
                    {
                        toolTip &&
                        <div>
                            <h5>Hint and tips</h5>
                            <div className="acc-wrapper">
                                <div className="panel-group" id="accordion" role="tablist" aria-multiselectable="true">
                                    {toolTip.rawHtmlContent && <div dangerouslySetInnerHTML={{__html: toolTip.rawHtmlContent}} />}
                                    {toolTip.accordion}
                                </div>
                            </div>
                        </div>
                    }
                    <div className="news-events-wrap">
                        <h5 className="news-title">News & Information</h5>
                        <div className="news-block clearfix">
                            <a href="#"><img src={`${process.env.PUBLIC_URL}/assets/images/news_events/img_1.jpg`}
                                             alt=""/></a>
                            <h6><a href="#">21 October 2017</a></h6>
                            <h5><a href="#">Ali Baba and Le Wrap join force</a></h5>
                            <ul>
                                <li><a href=""><i className="fa fa-share-alt" aria-hidden="true"></i>
                                </a>
                                </li>
                                <li><a href=""><i className="fa fa-twitter" aria-hidden="true"></i>
                                </a>
                                </li>
                                <li><a href=""><i className="fa fa-facebook" aria-hidden="true"></i></a></li>
                                <li><a href=""><i className="fa fa-linkedin" aria-hidden="true"></i>
                                </a>
                                </li>
                            </ul>
                        </div>
                        <div className="news-block clearfix">
                            <a href="#"><img src={`${process.env.PUBLIC_URL}/assets/images/news_events/img_2.jpg`}
                                             alt=""/></a>
                            <h6><a href="#">13 October 2017</a></h6>
                            <h5><a href="#">Banking on business pays off for award winning franchisee</a></h5>
                            <ul>
                                <li><a href=""><i className="fa fa-share-alt" aria-hidden="true"></i>
                                </a>
                                </li>
                                <li><a href=""><i className="fa fa-twitter" aria-hidden="true"></i>
                                </a>
                                </li>
                                <li><a href=""><i className="fa fa-facebook" aria-hidden="true"></i></a></li>
                                <li><a href=""><i className="fa fa-linkedin" aria-hidden="true"></i>
                                </a>
                                </li>
                            </ul>
                        </div>
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