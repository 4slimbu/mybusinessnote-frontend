import React from "react";

const EmailVerificationPage = (props) => {
    const {showVerifyLink, onVerifyAccount, onSendVerificationEmail} = props;
    return (
        <div className="row">
            <div className="col-md-12">
                <div className="btn-wrap">
                    {
                        showVerifyLink ?
                            <div className="btn-wrap">
                                <p>Click on verify to verify your account.</p>
                                <button onClick={(e) => onVerifyAccount(e)} className="btn btn-default btn-md">Verify
                                </button>
                            </div>
                            :
                            <div>
                                <h3>Verification Needed</h3>
                                <p>Please follow the link on your welcome email to verify your account. </p>
                            </div>

                    }
                </div>
            </div>
            <div className="col-md-12">
                <div className="btn-wrap">
                    <p>Send me the verification email again!</p>
                    <button onClick={(e) => onSendVerificationEmail(e)} className="btn btn-default btn-md">Send
                        Verification Email Again!
                    </button>
                </div>
            </div>
        </div>
    )
};

export default EmailVerificationPage;