import React from "react";
import PropTypes from "prop-types";
import {saveBusinessOption} from "../../utils/helper/helperFunctions";
import {map} from "lodash";

const SelectBusinessOptionMetaOld = ({current, currentBusinessOption, metaKey, metaValue}) => {
    const affiliateLinks = map(currentBusinessOption.affiliate_links, (item, key) => {
        return (
            <option key={item.id} value={item.link}
                    onClick={(e) => onClickAffiliateOption(e, item.link)}>{item.name}</option>
        );
    });

    const onChangeSelect = function (e) {
        e.preventDefault();

        saveBusinessOption(current, {
                business_option_id: current.props.appStatus.currentBusinessOption.id,
                business_meta: {
                    [metaKey ]: e.target.value
                }
            }
        );
    };

    const onClickOption = function (e, option) {
        e.preventDefault();

        saveBusinessOption(current, {
                business_option_id: current.props.appStatus.currentBusinessOption.id,
                business_meta: {
                    [metaKey ]: option
                }
            }
        );
    };

    const onClickAffiliateOption = function (e, url) {
        e.preventDefault();
        setTimeout(function () {
            window.open(url, '_blank');
        }, 1000);
    };

    return (
        <ul className="alert-btns">
            <li><a
                className={metaValue === 'yes' ? 'active' : ''}
                href="" onClick={(e) => onClickOption(e, 'yes')}>Yes</a></li>
            <li>
                <select onChange={(e) => onChangeSelect(e)} value={metaValue}>
                    <option value="">Options</option>
                    {affiliateLinks}
                </select>
            </li>
        </ul>
    )
};

SelectBusinessOptionMetaOld.propTypes = {
    status: PropTypes.string.isRequired,
    currentBusinessOption: PropTypes.object.isRequired
};

export default SelectBusinessOptionMetaOld;