import React, {Component} from "react";
import PropTypes from "prop-types";
import {random} from "lodash";
import {getCookie, setCookie} from "../../utils/helper/helperFunctions";

class PopUp extends Component {
    constructor(props) {
        super(props);
        this.state = {
            target: 'all',
            triggerType: 'instant',
            delayTime: '5',
            minClickCount: '5',
            maxClickCount: '10',
            daysToDisableWhenCancelled: '30',
            content: null,
            referrerUrl: '',
            showPopUp: false,
            userClicksCount: 0
        };
        this.onClose = this.onClose.bind(this);
        this.showPopUpAfterFewRandClicks = this.showPopUpAfterFewRandClicks.bind(this);
        this.isDisabled = this.isDisabled.bind(this);
    }

    componentDidMount() {
        if (this.props.popUpSetting && this.props.popUpSetting.value) {
            const target = this.props.popUpSetting.value.target ? this.props.popUpSetting.value.target : this.state.target;
            const triggerType = this.props.popUpSetting.value.trigger_type ? this.props.popUpSetting.value.trigger_type : this.state.triggerType;
            const delayTime = this.props.popUpSetting.value.delay_time ? this.props.popUpSetting.value.delay_time : this.state.delayTime;
            const minClickCount = this.props.popUpSetting.value.min_click_count ? this.props.popUpSetting.value.min_click_count : this.state.minClickCount;
            const maxClickCount = this.props.popUpSetting.value.max_click_count ? this.props.popUpSetting.value.max_click_count : this.state.maxClickCount;
            const daysToDisableWhenCancelled = this.props.popUpSetting.value.days_to_disable_when_cancelled ? this.props.popUpSetting.value.days_to_disable_when_cancelled : this.state.daysToDisableWhenCancelled;
            const content = this.props.popUpSetting.value.content ? this.props.popUpSetting.value.content : this.state.content;

            this.setState({
                ...this.state,
                target: target,
                triggerType: triggerType,
                delayTime: delayTime,
                minClickCount: minClickCount,
                maxClickCount: maxClickCount,
                daysToDisableWhenCancelled: daysToDisableWhenCancelled,
                content: content
            }, function () {
                this.preparePopUp();
            });
        }
    }

    preparePopUp() {
        if (this.state.target === 'referrer') {
            if (this.checkIfReferrerIsValid()) {
                this.triggerPopUp();
            }
        }

        if (this.state.target === 'all') {
            this.triggerPopUp();
        }
    }


    isDisabled() {
        return getCookie('isPopUpDisabled');
    }

    triggerPopUp() {
        if (this.state.triggerType === 'instant') {
            this.showPopUpInstantly();
        }

        if (this.state.triggerType === 'delay') {
            this.showPopUpAfterDelaying();
        }

        if (this.state.triggerType === 'after_rand_clicks') {
            document.addEventListener('click', this.showPopUpAfterFewRandClicks, false);
        }
    }

    checkIfReferrerIsValid() {
        let regex = new RegExp(this.state.referrerUrl);

        return regex.test(document.referrer);
    }

    showPopUpInstantly() {
        if (this.isDisabled()) {
            return;
        }

        this.setState({
            ...this.state,
            showPopUp: true,
        })
    }

    showPopUpAfterDelaying() {
        setTimeout(function () {
            this.showPopUpInstantly();
        }.bind(this), this.state.delayTime * 1000);
    }

    showPopUpAfterFewRandClicks() {
        const minRequiredClickCount = random(this.state.minClickCount * 1, this.state.maxClickCount * 1);

        if (this.state.userClicksCount >= minRequiredClickCount) {
            this.showPopUpInstantly();
            document.removeEventListener('click', this.showPopUpAfterFewRandClicks, false);
        } else {
            this.setState({
                ...this.state,
                userClicksCount: this.state.userClicksCount + 1
            })
        }
    }

    onClose() {
        setCookie('isPopUpDisabled', true, {maxAge: this.state.daysToDisableWhenCancelled * 24 * 60 * 60, path: '/'});

        this.setState({
            showPopUp: false,
            content: null,
        });
    }

    render() {
        return (
            this.state.showPopUp ?
                <div className="popup popup-mode-content active">
                    <div className="popup-wrapper">
                        <div className="popup-container">
                            <div className="popup-content active">
                                <div className="content-wrap" dangerouslySetInnerHTML={{__html: this.state.content}}/>
                                <a title="Close Pop Up" href="#" onClick={this.onClose} className="close-popup">X</a>
                            </div>
                        </div>
                    </div>
                </div>
                :
                <div ref={node => {
                    this.node = node;
                }}></div>
        )
    }
}

PopUp.propTypes = {
    popUpSetting: PropTypes.object.isRequired,
};

export default PopUp;