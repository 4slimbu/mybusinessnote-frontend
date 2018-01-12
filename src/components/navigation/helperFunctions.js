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

export function generateApiUrlFromSlug(appStatus, levelSlug, sectionSlug) {
    console.log('appstatus', appStatus.levels);
    return '/level/' + 1 + '/section/' + 1;
}

export function firstSectionUrl(currentLevel) {
    return '/level/' + currentLevel.slug + '/section/' + currentLevel.sections[0].slug;
}

export function filterLevelsBySlug(levels, levelSlug) {
    let currentLevel =  filter(levels, (level) => {
        return level.slug == levelSlug;
    });
    //get only the first value
    return currentLevel[0];
}

export function getCurrentLevelByUrl(levels, url) {
    console.log('helper: levels', levels);
    console.log('helper: url:', url);

    let splittedArray = url.split(/\/|\?|&|=|\./g);

    console.log('helper: splittedArray:', splittedArray[2]);

    if (splittedArray && splittedArray[2]) {
        let currentLevel = filter(levels, (level) => {
            return level.slug == splittedArray[2];
        });
        console.log('helper: current level', currentLevel);

        return (currentLevel && currentLevel[0]) ? currentLevel[0] : false;
    }

    return false;
}

export function getCurrentSectionByUrl(sections, url) {
    console.log('helper: sections', sections);
    console.log('helper: url:', url);

    let splittedArray = url.split(/\/|\?|&|=|\./g);

    console.log('helper: splittedArray:', splittedArray[4]);

    if (splittedArray && splittedArray[4]) {
        let currentSection = filter(sections, (section) => {
            return section.slug == splittedArray[4];
        });
        console.log('helper: current section', currentSection);

        return (currentSection && currentSection[0]) ? currentSection[0] : false;
    }

    return false;
}

export function generateLevelCompletedPercent(levels, currentLevel) {
    return (levels && currentLevel && levels[currentLevel.id -1]) ? levels[currentLevel.id -1].completed_percent : -1;
}