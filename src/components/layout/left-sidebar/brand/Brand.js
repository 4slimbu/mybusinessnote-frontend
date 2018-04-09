import React from "react";
import {Link} from "react-router-dom";
import {publicUrl} from "../../../../utils/helper/helperFunctions";

const Brand = () => {
    return (
        <div>
            <Link to="/" className="site-branding">
                <img src={`${publicUrl()}/assets/images/app_logo_256.png`} alt=""/>
            </Link>
            <h3 className="tagline-head">Let your <br/>journey begins</h3>
        </div>
    )
};

export default Brand;