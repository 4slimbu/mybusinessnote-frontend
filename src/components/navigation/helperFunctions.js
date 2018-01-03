// export  function getLevelUsingSlug(levelSlug, LevelsArray) {
//     return levelsArray[levelSlug];
// }

import {filter, map} from "lodash";

export function generateAppRelativeUrl(level, section = null, businessOption = null) {
    if (level && !section && !businessOption) {
        return '/level/' + level;
    }

    if (level && section && !businessOption) {
        return '/level/' + level + '/section/' + section;
    }

    if (level && section && businessOption) {
        return '/level/' + level + '/section/' + section + '/business-option/' + businessOption;
    }
}

export function filterLevelsBySlug(levels, slug) {
    let currentLevel =  filter(levels, (level) => {
        return level.slug;
    });
    //get only the first value
    return currentLevel[0];
}

export function generateLevelCompletedPercent(levels, currentLevel) {
    return (levels && currentLevel && levels[currentLevel.id -1]) ? levels[currentLevel.id -1].completed_percent : -1;
}