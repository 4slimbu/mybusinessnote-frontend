// export  function getLevelUsingSlug(levelSlug, LevelsArray) {
//     return levelsArray[levelSlug];
// }

import {filter, map} from "lodash";

/**
 * mbjLog is a custom logging wrapper function for managing console.log
 *
 * @param name : any text to identify particular log. required
 * @param data : log data. default is 'null'
 * @param level : type of log. default is 'info'
 */
export function mbjLog(name, data = null, level = 'info') {
    //log only if debug mode is on
    if (process.env.REACT_APP_ENV === 'debug') {
        //multiple log type is supported: e.g: 'info debug my_special_log_name';
        const allowedLevels = process.env.REACT_APP_DEBUG_LEVEL.split(' ');

        //loop through the allowed log type and log only the one that matches the criteria
        for (let i = 0; i < allowedLevels.length; i++) {
            if (allowedLevels[i] === level) {
                console.log(level + ':' + name, data);
            }
        }

        //if log type is all: log everything
        if (process.env.REACT_APP_DEBUG_LEVEL === 'all') {
            console.log(level + ':' + name, data);
        }
    }
}

export function getAllUrlParams(url) {

    // get query string from url (optional) or window
    let queryString = url ? url.split('?')[1] : window.location.search.slice(1);

    // we'll store the parameters here
    let obj = {};

    // if query string exists
    if (queryString) {

        // stuff after # is not part of query string, so get rid of it
        queryString = queryString.split('#')[0];

        // split our query string into its component parts
        let arr = queryString.split('&');

        for (let i=0; i<arr.length; i++) {
            // separate the keys and the values
            let a = arr[i].split('=');

            // in case params look like: list[]=thing1&list[]=thing2
            let paramNum = undefined;
            let paramName = a[0].replace(/\[\d*\]/, function(v) {
                paramNum = v.slice(1,-1);
                return '';
            });

            // set parameter value (use 'true' if empty)
            let paramValue = typeof(a[1])==='undefined' ? true : a[1];

            // if parameter name already exists
            if (obj[paramName]) {
                // convert value to array (if still string)
                if (typeof obj[paramName] === 'string') {
                    obj[paramName] = [obj[paramName]];
                }
                // if no array index number specified...
                if (typeof paramNum === 'undefined') {
                    // put the value on the end of the array
                    obj[paramName].push(paramValue);
                }
                // if array index number specified...
                else {
                    // put the value at that index number
                    obj[paramName][paramNum] = paramValue;
                }
            }
            // if param name doesn't exist yet, set it
            else {
                obj[paramName] = paramValue;
            }
        }
    }

    return obj;
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