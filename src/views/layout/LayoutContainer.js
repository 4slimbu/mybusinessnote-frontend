import React, {Component} from "react";
import {withRouter} from "react-router-dom";
import {connect} from "react-redux";

class LayoutContainer extends Component {
    render() {

        return (
            <div id="page" className="hfeed site">
                <div id="content" className="site-content">
                    <div id="primary" className="content-area">
                        <main id="main" className="site-main">
                            <div className="section-wrapper">
                                {this.props.children}
                            </div>
                        </main>
                    </div>
                </div>
            </div>
        )
    }
}

LayoutContainer.propTypes = {};

function mapStateToProps(state) {
    return {}
}


export default withRouter(connect(mapStateToProps, {})(LayoutContainer));