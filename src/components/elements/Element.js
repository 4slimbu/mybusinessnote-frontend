import React, {Component} from 'react';
import PropTypes from "prop-types";
import BusinessCategories from "./BusinessCategories";
import RegisterUser from "./RegisterUser";
import CreateBusiness from "./CreateBusiness";

class Element extends Component {
    constructor(props) {
        super(props);
    }

    //these are pre-defined levels intro components
    components = {
        BusinessCategories: BusinessCategories,
        RegisterUser: RegisterUser,
        CreateBusiness: CreateBusiness
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