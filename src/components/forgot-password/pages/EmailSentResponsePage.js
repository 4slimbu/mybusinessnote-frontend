import React from "react";

const EmailSentResponsePage = (props) => {
    const {onClickBackToLogin} = props;
    return(
        <div>
            <h1>Forgot Password</h1>
            <p>If your email exists on our records, you will receive a password reset email. Please contact hello@mybusinessjourney.com.au if you still have any problems.</p>
            <div className="btn-wrap">
                <a onClick={(e) => this.onClickBackToLogin(e)} className="btn btn-default btn-md">Back</a>
            </div>
        </div>
    );
};

export default EmailSentResponsePage;