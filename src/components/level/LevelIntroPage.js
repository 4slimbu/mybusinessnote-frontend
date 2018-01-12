import React, {Component} from "react";
import LevelOneIntro from "./LevelOneIntro";
import LevelTwoIntro from "./LevelTwoIntro";
import LevelThreeIntro from "./LevelThreeIntro";
import PropTypes from "prop-types";

class LevelIntroPage extends Component {
    //these are pre-defined levels intro components
    components = {
        1: LevelOneIntro,
        2: LevelTwoIntro,
        3: LevelThreeIntro
    };

    render() {
        const {level, setCurrentLevel, setCurrentSection, setCurrentBusinessOption} = this.props;
        const Level = this.components[level.id];
        return <Level
            level={level}
            setCurrentLevel={setCurrentLevel}
            setCurrentSection={setCurrentSection}
            setCurrentBusinessOption={setCurrentBusinessOption}
        />
    }
}

LevelIntroPage.propTypes = {
    level: PropTypes.object.isRequired,
    setCurrentLevel: PropTypes.func.isRequired,
    setCurrentSection: PropTypes.func.isRequired,
    setCurrentBusinessOption: PropTypes.func.isRequired
};

export default LevelIntroPage;