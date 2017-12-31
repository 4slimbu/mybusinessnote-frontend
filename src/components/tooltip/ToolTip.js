import React, {Component} from "react";

class ToolTip extends Component {
    render() {
        return (
            <section className="right-sec bg-white mCustomScrollbar" data-mcs-theme="dark">
                <div className="content-wrapper">
                    <h5>Hint and tips</h5>
                    <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. </p>
                    <p>Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.</p>
                    <div className="acc-wrapper">
                        <div className="panel-group" id="accordion" role="tablist" aria-multiselectable="true">
                            <div className="panel panel-default">
                                <div className="panel-heading " role="tab" id="headingOne">
                                    <a href="#collapseOne" className="panel-title" role="button" data-toggle="collapse" data-parent="#accordion"  aria-expanded="true" aria-controls="collapseOne">
                                        <h4>
                                            <span className="accordion-titles">General</span>
                                            <span className="acc-img"></span>
                                        </h4>
                                    </a>
                                </div>
                                <div id="collapseOne" className="panel-collapse collapse in" role="tabpanel" aria-labelledby="headingOne">
                                    <div className="panel-body">
                                        s
                                    </div>
                                </div>
                            </div>
                            <div className="panel panel-default">
                                <div className="panel-heading " role="tab" id="headingTwo">
                                    <a className="panel-title collapsed" role="button" data-toggle="collapse" data-parent="#accordion" href="#collapseTwo" aria-expanded="false" aria-controls="collapseTwo">
                                        <h4>
                                            <span className="accordion-titles">Hospitality</span><span className="acc-img"></span>
                                        </h4>
                                    </a>
                                </div>
                                <div id="collapseTwo" className="panel-collapse collapse" role="tabpanel" aria-labelledby="headingTwo">
                                    <div className="panel-body">
                                        a
                                    </div>
                                </div>
                            </div>
                            <div className="panel panel-default">
                                <div className="panel-heading " role="tab" id="headingThree">
                                    <a className="panel-title collapsed" role="button" data-toggle="collapse" data-parent="#accordion" href="#collapseThree" aria-expanded="false" aria-controls="collapseThree">
                                        <h4>
                                            <span className="accordion-titles">Online Shop/Ecommerce</span><span className="acc-img"></span>
                                        </h4>
                                    </a>
                                </div>
                                <div id="collapseThree" className="panel-collapse collapse" role="tabpanel" aria-labelledby="headingThree">
                                    <div className="panel-body">
                                        u
                                    </div>
                                </div>
                            </div>
                            <div className="panel panel-default">
                                <div className="panel-heading " role="tab" id="headingFour">
                                    <a className="panel-title collapsed" role="button" data-toggle="collapse" data-parent="#accordion" href="#collapseFour" aria-expanded="false" aria-controls="collapseFour">
                                        <h4>
                                            <span className="accordion-titles">Sole Trader</span><span className="acc-img"></span>
                                        </h4>
                                    </a>
                                </div>
                                <div id="collapseFour" className="panel-collapse collapse" role="tabpanel" aria-labelledby="headingFour">
                                    <div className="panel-body">
                                        u
                                    </div>
                                </div>
                            </div>
                            <div className="panel panel-default">
                                <div className="panel-heading " role="tab" id="headingFive">
                                    <a className="panel-title collapsed" role="button" data-toggle="collapse" data-parent="#accordion" href="#collapseFive" aria-expanded="false" aria-controls="collapseFive">
                                        <h4>
                                            <span className="accordion-titles">Tradie</span><span className="acc-img"></span>
                                        </h4>
                                    </a>
                                </div>
                                <div id="collapseFive" className="panel-collapse collapse" role="tabpanel" aria-labelledby="headingFour">
                                    <div className="panel-body">
                                        u
                                    </div>
                                </div>
                            </div>
                            <div className="panel panel-default">
                                <div className="panel-heading " role="tab" id="headingSix">
                                    <a className="panel-title collapsed" role="button" data-toggle="collapse" data-parent="#accordion" href="#collapseSix" aria-expanded="false" aria-controls="collapseSix">
                                        <h4>
                                            <span className="accordion-titles">Professional Services</span><span className="acc-img"></span>
                                        </h4>
                                    </a>
                                </div>
                                <div id="collapseSix" className="panel-collapse collapse" role="tabpanel" aria-labelledby="headingFour">
                                    <div className="panel-body">
                                        u
                                    </div>
                                </div>
                            </div>
                            <div className="panel panel-default">
                                <div className="panel-heading " role="tab" id="headingSeven">
                                    <a className="panel-title collapsed" role="button" data-toggle="collapse" data-parent="#accordion" href="#collapseSeven" aria-expanded="false" aria-controls="collapseSeven">
                                        <h4>
                                            <span className="accordion-titles">Retail</span><span className="acc-img"></span>
                                        </h4>
                                    </a>
                                </div>
                                <div id="collapseSeven" className="panel-collapse collapse" role="tabpanel" aria-labelledby="headingSeven">
                                    <div className="panel-body">
                                        u
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="news-events-wrap">
                        <h5 className="news-title">News & Information</h5>
                        <div className="news-block clearfix">
                            <a href="#"><img src={`${process.env.PUBLIC_URL}/assets/images/news_events/img_1.jpg`} alt="" /></a>
                            <h6><a href="#">21 October 2017</a></h6>
                            <h5><a href="#">Ali Baba and Le Wrap join force</a></h5>
                            <ul>
                                <li><a href=""><i className="fa fa-share-alt" aria-hidden="true"></i>
                                </a>
                                </li>
                                <li><a href=""><i className="fa fa-twitter" aria-hidden="true"></i>
                                </a>
                                </li>
                                <li><a href=""><i className="fa fa-facebook" aria-hidden="true"></i></a></li>
                                <li><a href=""><i className="fa fa-linkedin" aria-hidden="true"></i>
                                </a>
                                </li>
                            </ul>
                        </div>
                        <div className="news-block clearfix">
                            <a href="#"><img src={`${process.env.PUBLIC_URL}/assets/images/news_events/img_2.jpg`} alt="" /></a>
                            <h6><a href="#">13 October 2017</a></h6>
                            <h5><a href="#">Banking on business pays off for award winning franchisee</a></h5>
                            <ul>
                                <li><a href=""><i className="fa fa-share-alt" aria-hidden="true"></i>
                                </a>
                                </li>
                                <li><a href=""><i className="fa fa-twitter" aria-hidden="true"></i>
                                </a>
                                </li>
                                <li><a href=""><i className="fa fa-facebook" aria-hidden="true"></i></a></li>
                                <li><a href=""><i className="fa fa-linkedin" aria-hidden="true"></i>
                                </a>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </section>
        );
    }
}

export default ToolTip;