import React from "react";
import PropTypes from "prop-types";
import {Helmet} from "react-helmet";
import {isItemLoaded} from "../../utils/helper/helperFunctions";

const MetaInformation = ({appStatus}) => {
    const { currentLevel, currentSection, currentBusinessOption } = appStatus;

    let title = '';
    let description = '';

    if (isItemLoaded(currentBusinessOption)) {
        title = currentBusinessOption.name;
        description = currentBusinessOption.icon;
    } else if (isItemLoaded(currentSection)) {
        title = currentSection.name;
        description = currentSection.icon;
    } else if (isItemLoaded(currentLevel)) {
        title = currentLevel.name;
        description = currentLevel.icon;
    }

    return (
        <Helmet>
            <title>{ isItemLoaded(title) ? title + ' - ' : '' }My Business Journey</title>
            <meta name="description" content={ description } />
        </Helmet>
    )
};

MetaInformation.propTypes = {
    appStatus: PropTypes.object.isRequired,
};

export default MetaInformation;