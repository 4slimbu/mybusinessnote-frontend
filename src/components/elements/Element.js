import React, {Component} from 'react';
import PropTypes from "prop-types";
import BusinessCategories from "./BusinessCategories";
import RegisterUser from "./RegisterUser";
import CreateBusiness from "./CreateBusiness";
import RegisterBusiness from "./RegisterBusiness";
import SellGoods from "./SellGoods";
import Logo from "./Logo";
import FinancingOption from "./FinancingOption";
import InitialAccountSoftware from "./InitialAccountSoftware";
import Tagline from "./Tagline";
import BrandColor from "./BrandColor";
import SocialMediaRegistration from "./SocialMediaRegistration";
import BusinessBanking from "./BusinessBanking";
import MerchantFacilities from "./MerchantFacilities";
import BusinessEmailSetUp from "./BusinessEmailSetUp";
import PhoneSetUp from "./PhoneSetUp";
import QuickOfficeSetUp from "./QuickOfficeSetUp";
import SetUpInternet from "./SetUpInternet";
import OfficeAccessories from "./OfficeAccessories";

class Element extends Component {
    constructor(props) {
        super(props);
    }

    //these are pre-defined levels intro components
    components = {
        BusinessCategories: BusinessCategories,
        SellGoods: SellGoods,
        RegisterUser: RegisterUser,
        CreateBusiness: CreateBusiness,
        RegisterBusiness: RegisterBusiness,
        Logo: Logo,
        Tagline: Tagline,
        BrandColor: BrandColor,
        SocialMediaRegistration: SocialMediaRegistration,
        FinancingOption: FinancingOption,
        InitialAccountSoftware: InitialAccountSoftware,
        BusinessBanking: BusinessBanking,
        MerchantFacilities: MerchantFacilities,
        BusinessEmailSetUp: BusinessEmailSetUp,
        PhoneSetUp: PhoneSetUp,
        QuickOfficeSetUp: QuickOfficeSetUp,
        SetUpInternet: SetUpInternet,
        OfficeAccessories: OfficeAccessories,


    };

    render() {
        const {element, onClickNext} = this.props;
        const DynamicElement = this.components[element];
        console.log('Element: business Categories', DynamicElement);

        return (
            <div>
                <DynamicElement onClickNext={(e) => onClickNext(e)}/>
            </div>
        )
    }
}

Element.propTypes = {
    element: PropTypes.string.isRequired,
    onClickNext: PropTypes.func.isRequired
};

export default Element;