import React, {Component} from "react";
import {Link} from "react-router-dom";
import {publicUrl} from "../../../../utils/helper/helperFunctions";

export const Brand = () => {
    return (
        <span>
            <Link to="/" className="site-branding">
                <img src={`${publicUrl()}/assets/images/apps-logo.png`} alt="" />
            </Link>
            <h3 className="tagline-head">Let your <br/>journey begins</h3>
        </span>
    )
};