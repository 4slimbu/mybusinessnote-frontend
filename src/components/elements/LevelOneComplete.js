import React, {Component} from 'react';

export default class LevelOneComplete extends Component {
    render() {
        return (
            <div className="content-wrapper step-one">
                <h5 className="obvious-h5">Getting started</h5>
                <h1>Congratulations</h1>
                <p>Level 1 complete!</p>
                <img className="complete-block-img" src="/assets/images/level-complete.png" alt="" />
                <div className="bottom-block-complete">
                    <div className="btn-wrap">
                        <a href="#" className="btn btn-default btn-md">Continue to level 2</a>
                    </div>
                    <a href="#" className="next-session-link"><i className="fa fa-chevron-down" aria-hidden="true"></i>
                    </a>
                    <h6>Setting the foundations</h6>
                </div>
            </div>
        )
    }
}