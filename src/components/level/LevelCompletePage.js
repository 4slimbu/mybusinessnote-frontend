import React, {Component} from "react";

class LevelCompletePage extends Component {
    render() {
        return (
            <div className="level-7">
                <section className="mid-sec bg-red">
                    <div className="content-wrapper step-one">
                        <h5 className="obvious-h5">Getting started</h5>
                        <h1>Congratulations</h1>
                        <p>Level 1 complete!</p>
                        <img className="complete-block-img" src={`${process.env.PUBLIC_URL}/assets/images/level-complete.png`} alt="" />
                        <div className="bottom-block-complete">
                            <div className="btn-wrap">
                                <a href="level2_home.html" className="btn btn-default btn-md">Continue to level 2</a>
                            </div>
                            <a href="level2_home.html" className="next-session-link"><i className="fa fa-chevron-down" aria-hidden="true"></i>
                            </a>
                            <h6>Setting the foundations</h6>
                        </div>
                    </div>
                </section>
            </div>
        );
    }
}

export default LevelCompletePage;