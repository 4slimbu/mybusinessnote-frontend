import React from "react";
import {getEnv} from "../../utils/helper/helperFunctions";

const SocialLoginButton = () => {
    return (
        <div>
            <p className="text-center">OR Login with</p>
            <div className="row">

                <div className="col-md-6 text-right col-sm-12">
                    <a className="btn btn-primary" href={getEnv('API_BASE_URL') + '/login/oauth/google'}>
                        <i className="fa fa-google"></i> Google</a>
                </div>
                <div className="col-md-6 col-sm-12 text-left">
                    <a className="btn btn-primary" href={getEnv('API_BASE_URL') + '/login/oauth/facebook'}>
                        <i className="fa fa-facebook-square"></i> Facebook</a>
                </div>
            </div>
        </div>
    )
};

export default SocialLoginButton;