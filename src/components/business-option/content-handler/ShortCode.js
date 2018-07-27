import React, {Component} from 'react';
import PropTypes from "prop-types";
import BusinessCategories from "./shortcodes/BusinessCategories";
import SellGoods from "./shortcodes/SellGoods";
import RegisterUser from "./shortcodes/RegisterUser";
import CreateBusiness from "./shortcodes/CreateBusiness";
import RegisterBusiness from "./shortcodes/RegisterBusiness";
import SingleImageField from "./shortcodes/SingleImageField";
import SingleTextField from "./shortcodes/SingleTextField";
import BrandColor from "./shortcodes/BrandColor";
import SocialMediaField from "./shortcodes/SocialMediaField";
import {isItemLoaded} from "../../../utils/helper/helperFunctions";
import ConfirmAndLink from "./shortcodes/ConfirmAndLink";

class ShortCode extends Component {
    constructor(props) {
        super(props);

        //these are pre-defined Shortcodes
        this.shortcodes = {
            BusinessCategories: BusinessCategories,
            SellGoods: SellGoods,
            RegisterUser: RegisterUser,
            CreateBusiness: CreateBusiness,
            RegisterBusiness: RegisterBusiness,
            SingleImageField: SingleImageField,
            SingleTextField: SingleTextField,
            BrandColor: BrandColor,
            SocialMediaField: SocialMediaField,
            ConfirmAndLink: ConfirmAndLink,
        };
    }

    render() {
        const {name, attributes} = this.props;
        const DynamicElement = isItemLoaded(this.shortcodes[name]) ? this.shortcodes[name] : '';

        return (
                DynamicElement && <DynamicElement attributes={attributes}/>
        )
    }

}

ShortCode.propTypes = {
    name: PropTypes.string.isRequired,
    attributes: PropTypes.object.isRequired
};

export default ShortCode;