// export  function getLevelUsingSlug(levelSlug, LevelsArray) {
//     return levelsArray[levelSlug];
// }

import {filter, map} from "lodash";
import {APP_DEBUG_LEVEL, APP_ENV} from "../../config";

export function mbjLog(name, data = null, level = 'info') {
    if (APP_ENV === 'debug') {
        if (APP_DEBUG_LEVEL === 'info') {
            if (level === 'info') {
                console.log('info:' + name, data);
            }
        }
        if (APP_DEBUG_LEVEL === 'debug') {
            if (level === 'debug') {
                console.log('debug:' + name, data);
            }
        }
        if (APP_DEBUG_LEVEL === 'all') {
            console.log(level + ':' + name, data);
        }
    }
}

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
    mbjLog('appstatus', appStatus.levels);
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
    mbjLog('helper: levels', levels);
    mbjLog('helper: url:', url);

    let splittedArray = url.split(/\/|\?|&|=|\./g);

    mbjLog('helper: splittedArray:', splittedArray[2]);

    if (splittedArray && splittedArray[2]) {
        let currentLevel = filter(levels, (level) => {
            return level.slug == splittedArray[2];
        });
        mbjLog('helper: current level', currentLevel);

        return (currentLevel && currentLevel[0]) ? currentLevel[0] : false;
    }

    return false;
}

export function getCurrentSectionByUrl(sections, url) {
    mbjLog('helper: sections', sections);
    mbjLog('helper: url:', url);

    let splittedArray = url.split(/\/|\?|&|=|\./g);

    mbjLog('helper: splittedArray:', splittedArray[4]);

    if (splittedArray && splittedArray[4]) {
        let currentSection = filter(sections, (section) => {
            return section.slug == splittedArray[4];
        });
        mbjLog('helper: current section', currentSection);

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
            mbjLog('save bo response', response);
            currentObject.props.addFlashMessage({
                type: "success",
                text: "Saved successfully!"
            });
            const appStatus = currentObject.props.appStatus;
            currentObject.props.setCompletedStatus(response.data.completed_status);
            currentObject.props.getBusinessOptionFromUrl(appStatus.currentBusinessOption.links.self).then((res) => {
                if (response.data.completed_status.level) {
                    currentObject.props.history.push('/level/' + appStatus.currentBusinessOption.level_slug);
                    return;
                }

                if (response.data.completed_status.section) {
                    return;
                }

                setTimeout(function () {
                    currentObject.props.getBusinessOptionFromUrl(appStatus.currentBusinessOption.links.next);
                    currentObject.props.history.push(getAppUrlFromApiUrl(appStatus.currentBusinessOption.links.next));
                }, 0);
            });

        },
        (error) => {
            currentObject.props.addFlashMessage({
                type: "error",
                text: "Failed!"
            });
        }
    );
}