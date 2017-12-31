import React, {Component} from "react";

export default class LevelLinks extends Component {
    render() {
        const levels = (
            <div className="panel panel-default panel-faq active">
                <div className="panel-heading" role="tab" id="headingEight">
                    <div className="panel-title clearfix">
                        <a role="button" data-toggle="collapse" data-parent="#accordion2" href="#collapseEight" aria-expanded="true" aria-controls="collapseOne">
                            <figure><img src={`${process.env.PUBLIC_URL}/assets/images/journey/img_1.png`} alt="" /></figure>
                            <h6>Getting<br/> started</h6>
                        </a>
                    </div>
                </div>
                <div id="collapseEight" className="panel-collapse collapse in" role="tabpanel" aria-labelledby="headingEight">
                    <div className="panel-body">
                        <ul className="getting-start-list">
                            <li><a href="level1_step_1.html">
                                <span className="circle-span complete"></span>Your business</a>
                            </li>
                            <li><a href="level1_step_4.html"><span className="circle-span"></span>About you</a></li>
                            <li><a href="level1_step_5.html"><span className="circle-span"></span>Your business</a></li>
                            <li><a href="level1_step_6.html"><span className="circle-span"></span>Register your business</a></li>
                        </ul>
                    </div>
                </div>
            </div>
        );
        return (
            <div>
                { levels}
            </div>
        )
    }
}