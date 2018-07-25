import React, {Component} from 'react';
import PropTypes from "prop-types";
import BusinessCategories from "./BusinessCategories";
import RegisterUser from "./RegisterUser";
import CreateBusiness from "./CreateBusiness";
import RegisterBusiness from "./RegisterBusiness";
import SellGoods from "./SellGoods";
import BrandColor from "./BrandColor";
import SingleTextField from "./SingleTextField";
import SocialMediaField from "./SocialMediaField";
import YesAndLinkField from "./YesAndLinkField";
import SingleImageField from "./SingleImageField";

class Element extends Component {
    //these are pre-defined levels intro components
    components = {
        BusinessCategories: BusinessCategories,
        SellGoods: SellGoods,
        RegisterUser: RegisterUser,
        CreateBusiness: CreateBusiness,
        RegisterBusiness: RegisterBusiness,
        SingleImageField: SingleImageField,
        SingleTextField: SingleTextField,
        BrandColor: BrandColor,
        SocialMediaField: SocialMediaField,
        YesAndLinkField: YesAndLinkField,
    };

    constructor(props) {
        super(props);
    }

    render() {
        const {element, onClickNext} = this.props;
        const DynamicElement = this.components[element];

        return (
            <div>
                <DynamicElement onClickNext={(e) => onClickNext(e)} onComplete={(bool) => this.props.onComplete(bool)}/>
            </div>
        )
    }
}

Element.propTypes = {
    element: PropTypes.string.isRequired,
    onClickNext: PropTypes.func
};

export default Element;