import React from "react";
import {Link} from "react-router-dom";
import {ROUTES} from "../../../constants/routes";

const EmailSentResponsePage = () => {
    return (
        <div>
            <h1>Forgot Password</h1>
            <p>If your email exists on our records, you will receive a password reset email. Please contact
                hello@mybusinessnote.com if you still have any problems.</p>
            <div className="btn-wrap">
                <Link to={ROUTES.HOME} className="btn btn-default btn-md">Back</Link>
            </div>
        </div>
    );
};

export default EmailSentResponsePage;