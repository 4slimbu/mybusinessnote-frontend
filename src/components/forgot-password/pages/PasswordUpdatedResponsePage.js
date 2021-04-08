import React from "react";
import {Link} from "react-router-dom";
import {ROUTES} from "../../../constants/routes";

const PasswordUpdatedResponsePage = () => {
    return (
        <div>
            <h1>Password Updated</h1>
            <p>Your password is updated successfully. Login with your new password.</p>
            <div className="btn-wrap">
                <Link to={ROUTES.LOGIN} className="btn btn-default btn-md">Login</Link>
            </div>
        </div>
    );
};

export default PasswordUpdatedResponsePage;