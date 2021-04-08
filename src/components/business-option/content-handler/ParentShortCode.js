import React, {Component} from 'react';
import PropTypes from "prop-types";
import {isItemLoaded} from "../../../utils/helper/helperFunctions";
import Form from "./shortcodes/Form";

class ParentShortCode extends Component {
    constructor(props) {
        super(props);

        //these are pre-defined Shortcodes
        this.shortcodes = {
            Form: Form,
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

ParentShortCode.propTypes = {
    name: PropTypes.string.isRequired,
    attributes: PropTypes.object.isRequired
};

export default ParentShortCode;