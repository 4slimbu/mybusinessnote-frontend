import React, {Component} from "react";
import PropTypes from "prop-types";
import LevelHead from "../level/LevelHead";
import Element from "../elements/Element";

class BusinessOptionPage extends Component {
    render() {
        const {currentLevel, currentBusinessOption, onClickNext, isFetching} = this.props;
        return (
            <div>
                <LevelHead currentLevel={currentLevel}/>
                {
                    !isFetching &&
                    <div>
                        <h1>{currentBusinessOption.data.name}</h1>
                        <p>{currentBusinessOption.data.content}</p>
                        <div>
                            {
                                currentBusinessOption.data.element &&
                                <Element element={currentBusinessOption.data.element} onClickNext={(e) => onClickNext(e)}/>
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
    isFetching: PropTypes.bool.isRequired
};


export default BusinessOptionPage;