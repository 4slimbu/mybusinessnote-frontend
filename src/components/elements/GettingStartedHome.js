import React, {Component} from 'react';
import {Link} from "react-router-dom";

export default class GettingStartedHome extends Component {
    render() {
        const next = (this.props.links) ? this.props.links.next : null;
        return (
            <div className="btn-wrap">
                {next && <Link to={next} className="btn btn-default btn-md">Start</Link>}
            </div>
        )
    }
}