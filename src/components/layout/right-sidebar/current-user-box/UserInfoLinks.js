import React, {Component} from "react";
import {map} from "lodash";
import * as classnames from "classnames";
import {Link, withRouter} from "react-router-dom";
import SectionLinks from "../../left-sidebar/navigation/SectionLinks";
import PropTypes from "prop-types";
import {generateAppRelativeUrl} from "../../../../utils/helper/helperFunctions";
import {logout} from "../../../../actions/authActions";
import {connect} from "react-redux";

class UserInfoLinks extends Component {

    render() {
        const { logout, history, auth } = this.props;

        const onLogout = function(e) {
            e.preventDefault();

            logout();
            history.push('/');
        };

        const dashboardUrl = process.env.REACT_APP_DASHBOARD_URL + '/?token=' + localStorage.getItem("jwtToken");

        return (
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
        )
    }
}

UserInfoLinks.propTypes = {
    auth: PropTypes.object.isRequired,
};

function mapStateToProps(state) {
    return {
        auth: state.authReducer,
    }
}

export default withRouter(connect(mapStateToProps, {
    logout,
})(UserInfoLinks));