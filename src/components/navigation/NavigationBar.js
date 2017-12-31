import React, {Component} from "react";
import {Link, NavLink, withRouter} from "react-router-dom";
import {connect} from "react-redux";
import PropTypes from "prop-types";
import {logout} from "../../actions/authActions";

class NavigationBar extends Component {
    logout(e) {
        e.preventDefault();
        this.props.logout();
    }

    navigateTo(url) {
        this.props.history.push(url);
    }

    render() {
        const { isAuthenticated } = this.props.auth;

        const userLinks = (
            <ul>
                <li>
                    <a href="#" onClick={this.logout.bind(this)}>Logout</a>
                </li>
            </ul>
        );

        const guestLinks = (
            <ul>
                <li>
                    <NavLink to="/login" activeClassName="active">Login</NavLink>
                </li>
            </ul>
        );

        return (
            <section className="left-sec bg-navy">
                <NavLink to="/" className="site-branding"><img src={`${process.env.PUBLIC_URL}/assets/images/apps-logo.png`} alt="" /></NavLink>
                <h3 className="tagline-head">Let your <br/>journey begins</h3>
                <div>
                    { isAuthenticated ? userLinks : guestLinks }
                </div>
                <div className="menu-accordion">
                    <div className="panel-group" id="accordion2" role="tablist" aria-multiselectable="true">
                        <div className="panel panel-default panel-faq active">
                            <div className="panel-heading" role="tab" id="headingEight">
                                <div className="panel-title clearfix">
                                    <Link onClick={() => this.navigateTo('/level/1')} role="button" data-toggle="collapse" data-parent="#accordion2" to="/level/1#collapseEight" aria-expanded="true" aria-controls="collapseOne">
                                        <figure><img src={`${process.env.PUBLIC_URL}/assets/images/journey/img_1.png`} alt="" /></figure>
                                        <h6>Getting<br/> started</h6>
                                    </Link>
                                </div>
                            </div>
                            <div id="collapseEight" className="panel-collapse collapse in" role="tabpanel" aria-labelledby="headingEight">
                                <div className="panel-body">
                                    <ul className="getting-start-list">
                                        <li><Link to="/level/1/section/1">
                                            <span className="circle-span complete"></span>Your business</Link>
                                        </li>
                                        <li><Link to="/level/1/section/2"><span className="circle-span"></span>About you</Link></li>
                                        <li><Link to="/level/1/section/3"><span className="circle-span"></span>Your business</Link></li>
                                        <li><Link to="/level/1/section/4"><span className="circle-span"></span>Register your business</Link></li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                        <div className="panel panel-default panel-faq">
                            <div className="panel-heading" role="tab" id="headingNine">
                                <div className="panel-title clearfix">
                                    <Link onClick={() => this.navigateTo('/level/2')} className="collapsed" role="button" data-toggle="collapse" data-parent="#accordion2" to="/level/2#collapseNine" aria-expanded="false" aria-controls="collapseNine">
                                        <figure><img src={`${process.env.PUBLIC_URL}/assets/images/journey/img_2.png`} alt="" /></figure>
                                        <h6>Setting the <br/>foundation</h6>
                                    </Link>
                                </div>
                            </div>
                            <div id="collapseNine" className="panel-collapse collapse" role="tabpanel" aria-labelledby="headingNine">
                                <div className="panel-body">
                                    <ul className="getting-start-list">
                                        <li>
                                            <Link to="/level/2/section/1">
                                                <span className="circle-span"></span>Marketing
                                            </Link></li>
                                        <li><Link to="/level/2/section/2"><span className="circle-span"></span>Finances</Link></li>
                                        <li><Link to="/level/2/section/3"><span className="circle-span"></span>Operations</Link></li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                        <div className="panel panel-default panel-faq">
                            <div className="panel-heading" role="tab" id="headingTen">
                                <div className="panel-title clearfix">
                                    <Link onClick={() => this.navigateTo('/level/3')} className="collapsed" role="button" data-toggle="collapse" data-parent="#accordion2" to="/level/3#collapseTen" aria-expanded="false" aria-controls="collapseTen">
                                        <figure><img src={`${process.env.PUBLIC_URL}/assets/images/journey/img_3.png`} alt="" /></figure>
                                        <h6>Building up the<br/> business</h6>
                                    </Link>
                                </div>
                            </div>
                            <div id="collapseTen" className="panel-collapse collapse" role="tabpanel" aria-labelledby="headingTen">
                                <div className="panel-body">
                                    <ul className="getting-start-list">
                                        <li><Link to="/level/3/section/1"><span className="circle-span"></span>Marketing </Link></li>
                                        <li><Link to="/level/3/section/2"><span className="circle-span"></span>Legal</Link></li>
                                        <li><Link to="/level/3/section/3"><span className="circle-span"></span>Human resources</Link></li>
                                        <li><Link to="/level/3/section/4"><span className="circle-span"></span>Operations</Link></li>
                                        <li><Link to="/level/3/section/5"><span className="circle-span"></span>Finances</Link></li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        )
    }
}

NavigationBar.propTypes = {
    auth: PropTypes.object.isRequired,
    logout: PropTypes.func.isRequired
};

function mapStateToProps(state) {
    return {
        auth: state.authReducer
    }
}

export default connect(mapStateToProps, { logout })(withRouter(NavigationBar));