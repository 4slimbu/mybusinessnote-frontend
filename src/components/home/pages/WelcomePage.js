import React from "react";
import {Link} from "react-router-dom";
import {getAppUrlFromApiUrl} from "../../../utils/helper/helperFunctions";

const WelcomePage = (props) => {
    const {onClickStart, lastVisitedPath} = props;
    return (
        <div className="row">
            <div className="col-md-12">
                <div className="btn-wrap">
                    <p>Take me to the start. </p>
                    <Link to="/level/getting-started" onClick={(e) => onClickStart(e)}
                          className="btn btn-default btn-md">Start</Link>
                </div>
            </div>
            <div className="col-md-12">
                <div className="btn-wrap">
                    <p>Continue from where I left</p>
                    <Link to={getAppUrlFromApiUrl(lastVisitedPath)} className="btn btn-default btn-md">Continue</Link>
                </div>
            </div>
        </div>
    )
};

export default WelcomePage;