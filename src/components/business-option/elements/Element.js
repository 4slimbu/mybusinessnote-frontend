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
import SWOT from "./SWOT";
import CustomerAnalysis from "./CustomerAnalysis";
import DemographicArea from "./DemographicArea";
import SocialMediaExecution from "./SocialMediaExecution";
import Budget from "./Budget";
import LegalAdviser from "./LegalAdviser";
import EmploymentContracts from "./EmploymentContracts";
import AwardWages from "./AwardWages";
import HrPolicy from "./HrPolicy";
import BookKeeping from "./BookKeeping";
import CashFlowForecasting from "./CashFlowForecasting";
import OfficeSpace from "./OfficeSpace";
import StoreLease from "./StoreLease";
import NeedHardware from "./NeedHardware";
import SingleFormField from "./SingleFormField";

class Element extends Component {
    //these are pre-defined levels intro components
    components = {
        BusinessCategories: BusinessCategories,
        SellGoods: SellGoods,
        RegisterUser: RegisterUser,
        CreateBusiness: CreateBusiness,
        RegisterBusiness: RegisterBusiness,
        SingleFormField: SingleFormField,
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
        SWOT: SWOT,
        CustomerAnalysis: CustomerAnalysis,
        DemographicArea: DemographicArea,
        SocialMediaExecution: SocialMediaExecution,
        Budget: Budget,
        LegalAdviser: LegalAdviser,
        EmploymentContracts: EmploymentContracts,
        AwardWages: AwardWages,
        HrPolicy: HrPolicy,
        BookKeeping: BookKeeping,
        CashFlowForecasting: CashFlowForecasting,
        OfficeSpace: OfficeSpace,
        StoreLease: StoreLease,
        NeedHardware: NeedHardware
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