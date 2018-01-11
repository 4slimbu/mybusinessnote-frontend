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
                {
                    <div>
                        <h1>{currentBusinessOption.name}</h1>
                        <p>{currentBusinessOption.content}</p>
                        <div>
                            {
                                currentBusinessOption.element &&
                                <Element element={currentBusinessOption.element} onClickNext={(e) => onClickNext(e)}/>
                            }
                        </div>
                    </div>
                }
            </div>
        );
    }
}

BusinessOptionPage.propTypes = {
    currentLevel: PropTypes.object.isRequired,
    currentSection: PropTypes.object.isRequired,
    currentBusinessOption: PropTypes.object.isRequired,
    onClickNext: PropTypes.func.isRequired,
};


export default BusinessOptionPage;