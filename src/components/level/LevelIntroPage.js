import React, {Component} from "react";
import LevelOneIntro from "./LevelOneIntro";
import LevelTwoIntro from "./LevelTwoIntro";
import LevelThreeIntro from "./LevelThreeIntro";

class LevelIntroPage extends Component {
    //pre-defined levels intro components
    components = {
        1: LevelOneIntro,
        2: LevelTwoIntro,
        3: LevelThreeIntro
    };

    render() {
        const Level = `${this.props.levelSlug}`;

        return <Level/>
    }
}

export default LevelIntroPage;