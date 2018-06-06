import React from "react";
import PropTypes from "prop-types";
import LevelHead from "../../../level/includes/LevelHead";
import Element from "../../elements/Element";

const DefaultTemplate = ({appStatus}) => {
    const {currentBusinessOption} = appStatus;
    return (
        <div>
            <LevelHead appStatus={appStatus}/>

            <h1>{currentBusinessOption.name}</h1>
            <div className="content-wrap"
                 dangerouslySetInnerHTML={{__html: currentBusinessOption.content}}/>
            {
                currentBusinessOption.element &&
                <Element element={currentBusinessOption.element}
                         onClick={(e) => this.onClickNext(e).bind(this)}/>
            }
        </div>
    )
};

DefaultTemplate.propTypes = {
    appStatus: PropTypes.object.isRequired,
};

export default DefaultTemplate;