import React from "react";
import PropTypes from "prop-types";
import {saveBusinessOption} from "../navigation/helperFunctions";
import {map} from "lodash";

const SelectBusinessOptionMeta = ({ current, currentBusinessOption, metaKey, metaValue }) => {
    const affiliateLinkLabel = (currentBusinessOption.affiliate_links[0]) ? currentBusinessOption.affiliate_links[0].name : 'Set Up Now';
    const affiliateLink = (currentBusinessOption.affiliate_links[0]) ? currentBusinessOption.affiliate_links[0].link : '#';

    const onClickOption = function(e, option) {
        e.preventDefault();

        saveBusinessOption(current, {
                business_option_id: current.props.appStatus.currentBusinessOption.id,
                business_meta: {
                    [metaKey ]: option
                }
            }
        );
    };

    const onClickAffiliateOption = function(e, url) {
        e.preventDefault();
        setTimeout(function () {
            window.open(url, '_blank');
        }, 1000);
    };

    return (
        <ul className="alert-btns">
            <li><a
                className={ metaValue  === 'yes' ? 'active' : '' }
                href="" onClick={(e) => onClickOption(e, 'yes')}>Yes</a></li>
            <li>
                <a href={ affiliateLink } target="new">{ affiliateLinkLabel }</a>
            </li>
        </ul>
    )
};

SelectBusinessOptionMeta.propTypes = {
    status: PropTypes.string.isRequired,
    currentBusinessOption: PropTypes.object.isRequired
};

export default SelectBusinessOptionMeta;