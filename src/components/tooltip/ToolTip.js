import React, {Component} from "react";
import PropTypes from "prop-types";
import {Link, withRouter} from "react-router-dom";
import NewsList from '../../components/news/NewsList';



class ToolTip extends Component {


    render() {
       
        const { toolTip, currentNewsTerm, logout, history, auth } = this.props;

        const onLogout = function(e) {
            e.preventDefault();

            logout();
            history.push('/');
        };


      
        const dashboardUrl = process.env.REACT_APP_DASHBOARD_URL + '/?token=' + localStorage.getItem("jwtToken");

        return (
            <section className="right-sec bg-white mCustomScrollbar" data-mcs-theme="dark">
                <div className="content-wrapper">
                    {
                        auth.isAuthenticated ?
                        <div>
                            <h5>Welcome { auth.user.first_name } {auth.user.last_name }</h5>
                            <ul className="my-dashboard">
                                <li><a target="_blank" href={ dashboardUrl }>My Dashboard</a></li>
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
                        <h5 className="news-title">News & Informations</h5>
                        <NewsList currentNewsTerm= {currentNewsTerm}/>
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