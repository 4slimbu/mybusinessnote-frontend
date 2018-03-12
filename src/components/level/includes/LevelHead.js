import React from "react";
import PropTypes from "prop-types";
import ProgressBar from "../../common/ProgressBar";
import {getStatus, isItemLoaded} from "../../../utils/helper/helperFunctions";

const LevelHead = (props) => {
    const {currentLevel, appStatus} = props;
    const levelStatus = getStatus(appStatus.businessStatus.levelStatuses, currentLevel.id);
    const completedPercent = levelStatus.completed_percent ? levelStatus.completed_percent : 0;
    const totalSections = currentLevel.sections.length;
    const relativeSectionCount = isItemLoaded(appStatus.currentSection) ? appStatus.currentSection.id + '/' + totalSections : totalSections + ' sections';

    return (
        <div>
            <h5 className="obvious-h5">{currentLevel.name}</h5>
            <ProgressBar
                completedPercent={completedPercent}
                relativeSectionCount={relativeSectionCount}
            />
        </div>
    )
};

LevelHead.propTypes = {
    currentLevel: PropTypes.object.isRequired
};

export default LevelHead;