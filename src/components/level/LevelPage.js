import React, {Component} from "react";
import LevelIntroPage from "./LevelIntroPage";
import LevelCompletePage from "./LevelCompletePage";
import BusinessOptionPage from "../business-option/BusinessOptionPage";

class LevelPage extends Component {
    render() {
        const completedPercent = 0;
        let page;
        if ( completedPercent === 0) {
            page = (<LevelIntroPage level="1" />);
        }
        if ( completedPercent === 100) {
            page = (<LevelCompletePage level="1"/>)
        }
        if ( completedPercent !== 0 && completedPercent !== 100) {
            page = (<BusinessOptionPage businessOption="1"/>)
        }
        return (
            <div>
                { page }
            </div>
        );
    }
}

export default LevelPage;