import React from "react";
import PropTypes from "prop-types";
import {saveBusinessOption} from "../navigation/helperFunctions";
import {map} from "lodash";
import * as axios from "axios";
import {API_BASE_URL} from "../../config";

const SelectBusinessOptionMeta = ({ current, currentBusinessOption, metaKey, metaValue }) => {
    const affiliateLinkId = (currentBusinessOption.affiliate_links[0]) ? currentBusinessOption.affiliate_links[0].id : '';
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

    const onClickAffiliateLink = function(e, boId, affId, link) {
        e.preventDefault();

        current.props.trackClick(boId, affId);

        setTimeout(function () {
            window.open(link, '_blank');
        }, 1000);
    };

    return (
        <ul className="alert-btns">
            <li><a
                className={ metaValue  === 'yes' ? 'active' : '' }
                href="" onClick={(e) => onClickOption(e, 'yes')}>Yes</a></li>
            <li>
                <a onClick={(e) => onClickAffiliateLink(e, currentBusinessOption.id, affiliateLinkId, affiliateLink)}
                   href={ affiliateLink } target="new" className="upload-button">{ affiliateLinkLabel }</a>
            </li>
        </ul>
    )
};

SelectBusinessOptionMeta.propTypes = {
    status: PropTypes.string.isRequired,
    currentBusinessOption: PropTypes.object.isRequired
};

export default SelectBusinessOptionMeta;