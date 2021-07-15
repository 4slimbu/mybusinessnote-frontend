import React from "react";
import {Link} from "react-router-dom";

const GuestPage = (props) => {
    const {onClickStart} = props;
    return (
        <div className="row">
            <div className="col-md-12">
                <div className="btn-wrap">
                    <p>Want to start a new business note?</p>
                    <Link className="btn btn-default btn-md" to="/level/getting-started"
                          onClick={(e) => onClickStart(e)}>Click Here.</Link>
                </div>
            </div>
            <div className="col-md-12">
                <div className="btn-wrap">
                    <p>Already Registered? Continue your Business Note.</p>
                    <Link to="/login" className="btn btn-default btn-md">Login</Link>
                </div>
            </div>
            <div className="col-md-12">
                <div className="btn-wrap">
                    <p>Want to buy a business or franchise?</p>
                    <a href="http://www.franchisebusiness.com.au/" target="_blank" className="btn btn-default btn-md">Click
                        Here</a>
                </div>
            </div>
        </div>
    )
};

export default GuestPage;