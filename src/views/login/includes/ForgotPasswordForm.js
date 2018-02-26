import React from "react";
import TextFieldGroup from "../../common/TextFieldGroup";

const ForgotPasswordForm = (props) => {
    const { isShowEmailSentResponsePage, onSendForgotPasswordEmailFormSubmit} = props;
    return(
        (
            isShowEmailSentResponsePage ?
                emailSentResponse :
                <form className="apps-form" onSubmit={onSendForgotPasswordEmailFormSubmit}>
                    <h1>Forgot Password</h1>
                    <p>Please enter your email address to reset your password.</p>
                    { errors.form && <div className="alert alert-danger">{errors.form}</div> }

                    <TextFieldGroup
                        error={errors.email}
                        label="Email"
                        onChange={this.onChange}
                        value={email}
                        type="text"
                        field="email"
                    />
                    <div className="btn-wrap">
                        <button className="btn btn-default btn-md">Send Reset Password Email</button>
                        <a onClick={(e) => this.onClickBackToLogin(e)} className="btn btn-default btn-md">Back</a>
                    </div>
                </form>

        );
    )
}