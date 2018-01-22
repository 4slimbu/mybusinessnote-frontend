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

export function getApiUrlFromAppUrl(location) {
    const levelSlug = extractLevelFromLocation(location);
    const sectionSlug = extractSectionFromLocation(location);
    const boId = extractBoIdFromLocation(location);
    return '/business-option?' + 'level=' + levelSlug + '&section=' + sectionSlug + '&bo=' + boId;
}

export function getAppUrlFromApiUrl(location) {
    const levelSlug = extractLevelFromLocation(location);
    const sectionSlug = extractSectionFromLocation(location);
    const boId = extractBoIdFromLocation(location);
    return '/level/' + levelSlug + '/section/' + sectionSlug + '/bo/' + boId;
}

export function extractLevelFromLocation(location) {
    let params = location.split(/\/|\?|&|=|\./g);

    return params && (params.indexOf('level') >= 0) && params[params.indexOf('level') + 1];
}

export function extractSectionFromLocation(location) {
    let params = location.split(/\/|\?|&|=|\./g);

    return params && (params.indexOf('section') >= 0) && params[params.indexOf('section') + 1];
}

export function extractBoIdFromLocation(location) {
    let params = location.split(/\/|\?|&|=|\./g);

    return params && (params.indexOf('bo') >= 0) && params[params.indexOf('bo') + 1];
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

export function saveBusinessOption(currentObject, data) {
    currentObject.props.saveBusinessOptionFormRequest(data).then(
        (response) => {
            currentObject.props.addFlashMessage({
                type: "success",
                text: "Saved successfully!"
            });
            console.log('financing option: response', response.data.business_option);
            if (currentObject.state && currentObject.state.isLast && currentObject.props.appStatus.currentSection.completed_percent >= '100') {
                currentObject.setState({
                    isShowCompleted: true
                });
                return;
            }
            setTimeout(function () {
                const appStatus = currentObject.props.appStatus;
                currentObject.props.getBusinessOptionFromUrl(appStatus.currentBusinessOption.links.next);
                currentObject.props.history.push(getAppUrlFromApiUrl(appStatus.currentBusinessOption.links.next));
            }, 1500);
        },
        (error) => {
            currentObject.props.addFlashMessage({
                type: "error",
                text: "Failed!"
            });
        }
    );
}