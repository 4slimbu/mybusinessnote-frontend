import React from "react";
import PropTypes from "prop-types";
import {Helmet} from "react-helmet";
import {isItemLoaded} from "../../utils/helper/helperFunctions";

const MetaInformation = ({appStatus}) => {
    const { currentLevel, currentSection, currentBusinessOption } = appStatus;

    let title = '';
    let description = '';

    if (isItemLoaded(currentBusinessOption)) {
        title = currentBusinessOption.meta_title;
        description = currentBusinessOption.meta_description;
    } else if (isItemLoaded(currentSection)) {
        title = currentSection.meta_title;
        description = currentSection.meta_description;
    } else if (isItemLoaded(currentLevel)) {
        title = currentLevel.meta_title;
        description = currentLevel.meta_description;
    }

    return (
        <Helmet>
            <title>{ isItemLoaded(title) ? title + ' - ' : '' }My Business Note</title>
            <meta name="description" content={ description } />
        </Helmet>
    )
};

MetaInformation.propTypes = {
    appStatus: PropTypes.object.isRequired,
};

export default MetaInformation;