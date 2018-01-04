import React, {Component} from "react";
import PropTypes from "prop-types";
import {map} from "lodash";
import * as classnames from "classnames";

class ToolTip extends Component {
    render() {
        const { businessCategories, currentTipCategoryId } = this.props;
        const tipList = map(businessCategories.data, (item, key) => {
           return  (
               <div className="panel panel-default" key={`tip-list-${key}` }>
                   <div className="panel-heading " role="tab" id={`tip-heading-${key}`}>
                       <a href={`#tip-collapse-${key}`} className={ classnames("panel-title", { "" : item.id == currentTipCategoryId})} role="button" data-toggle="collapse"
                          data-parent="#accordion" aria-expanded="true" aria-controls={`tip-collapse-${key}`}>
                           <h4>
                               <span className="accordion-titles">{ item.name }</span>
                               <span className="acc-img"></span>
                           </h4>
                       </a>
                   </div>
                   <div id={`tip-collapse-${key}`} className={ classnames("panel-collapse collapse", { "in" : item.id == currentTipCategoryId})} role="tabpanel"
                        aria-labelledby={`heading${key}`}>
                       <div className="panel-body">
                           { item.tooltip }
                       </div>
                   </div>
               </div>
           )
        });

        return (
            <section className="right-sec bg-white mCustomScrollbar" data-mcs-theme="dark">
                <div className="content-wrapper">
                    <h5>Hint and tips</h5>
                    <div className="acc-wrapper">
                        <div className="panel-group" id="accordion" role="tablist" aria-multiselectable="true">
                            { tipList }
                        </div>
                    </div>
                    <div className="news-events-wrap">
                        <h5 className="news-title">News & Information</h5>
                        <div className="news-block clearfix">
                            <a href="#"><img src={`${process.env.PUBLIC_URL}/assets/images/news_events/img_1.jpg`}
                                             alt=""/></a>
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
                            <a href="#"><img src={`${process.env.PUBLIC_URL}/assets/images/news_events/img_2.jpg`}
                                             alt=""/></a>
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

ToolTip.propTypes = {
    businessCategories: PropTypes.object.isRequired,
    currentTipCategoryId: PropTypes.string
};

export default ToolTip;