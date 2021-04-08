import React from "react";
import PropTypes from "prop-types";
import LevelHead from "../../../level/includes/LevelHead";
import Element from "../../elements/Element";
import BusinessOptionContent from "../../content-handler/BusinessOptionContent";

const DefaultTemplate = ({appStatus}) => {
    const {currentBusinessOption} = appStatus;
    return (
        <div>
            <LevelHead appStatus={appStatus}/>

            <h1>{currentBusinessOption.name}</h1>
            <div className="content-wrap">
                <BusinessOptionContent content={currentBusinessOption.content} />
            </div>
        </div>
    )
};

DefaultTemplate.propTypes = {
    appStatus: PropTypes.object.isRequired,
};

export default DefaultTemplate;