import React, {Component} from "react";
import PropTypes from "prop-types";
import LevelHead from "../level/LevelHead";
import Element from "../elements/Element";

class BusinessOptionPage extends Component {
    render() {
        const {currentLevel, currentBusinessOption, onClickNext} = this.props;
        return (
            <div>
                <LevelHead currentLevel={currentLevel}/>
                <h1>{currentBusinessOption.data.name}</h1>
                <p>{currentBusinessOption.data.content}</p>
                <div>
                    {
                        currentBusinessOption.data.element &&
                        <Element element={currentBusinessOption.data.element} onClickNext={(e) => onClickNext(e)}/>
                    }
                </div>
            </div>
        );
    }
}

BusinessOptionPage.propTypes = {
    currentLevel: PropTypes.object.isRequired,
    currentSection: PropTypes.object.isRequired,
    currentBusinessOption: PropTypes.object.isRequired,
    onClickNext: PropTypes.func.isRequired
};


export default BusinessOptionPage;