import React, {Component} from "react";
import $ from "jquery";

class MainContentContainer extends Component {
    componentDidMount() {
        this.$el = $(this.el);
        this.$el.mCustomScrollbar({
            mouseWheel: {scrollAmount: 300},
        });
    }

    render() {
        return (
            <section ref={el => this.el = el} className="mid-sec bg-red mCustomScrollbar" data-mcs-theme="dark">
                <div className="content-wrapper step-one">
                    {this.props.children}
                </div>
            </section>
        );
    }
}

export default MainContentContainer;