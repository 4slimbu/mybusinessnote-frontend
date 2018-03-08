import {filter, find} from "lodash";
import {MESSAGES} from "../../constants/messages";

/**
 * Return url relative to the PUBLIC_URL set in package.json "homepage" key
 *
 * @return {string}
 */
export function publicUrl(url = null) {
    if (url) {
        return process.env.PUBLIC_URL + url;
    }
    return process.env.PUBLIC_URL;
}

/**
 * Return url relative to the API_BASE_URL
 *
 * @return {string}
 */
export function apiBaseUrl(url = null) {
    if (url) {
        return process.env.REACT_APP_API_BASE_URL + url;
    }
    return process.env.REACT_APP_API_BASE_URL;
}

/**
 * Return url relative to NEWS_FEED_API_BASE_URL
 */
export function newsFeedApiBaseUrl(url = null) {
    if (url) {
        return process.env.REACT_APP_NEWS_FEED_API_BASE_URL + url;
    }
    return process.env.REACT_APP_NEWS_FEED_API_BASE_URL;
}

/**
 * Gets the dashboard Url of current logged in user
 */
export function dashboardUrl() {
    if (localStorage.getItem("jwtToken")) {
        return getEnv('DASHBOARD_URL') + '/?token=' + localStorage.getItem("jwtToken");
    }
    return '#';
}

/**
 * This is a wrapper function to get the env variable without using the
 * prefix REACT_APP_
 *
 * @param key
 * @return {string}
 */
export function getEnv(key) {
    return process.env['REACT_APP_' + key];
}

/**
 * Use error code to get error message
 *
 * @param errorCode
 * @return {string}
 */
export function getCodeMessage(errorCode) {
    return MESSAGES[errorCode] ? MESSAGES[errorCode] : MESSAGES.ERR_UNKNOWN;
}

/**
 * mbjLog is a custom logging wrapper function for managing console.log
 *
 * @param name : any text to identify particular log. required
 * @param data : log data. default is 'null'
 * @param level : string log type default is 'info'
 */
export function mbjLog(name, data = null, level = 'info') {
    //log only if debug mode is on
    if (getEnv('ENV') === 'debug') {
        //multiple log type is supported: e.g: 'info debug my_special_log_name';
        const allowedLevels = getEnv('DEBUG_LEVEL').split(' ');

        //loop through the allowed log type and log only the one that matches the criteria
        for (let i = 0; i < allowedLevels.length; i++) {
            if (allowedLevels[i] === level) {
                console.log(level + ':' + name, data);
            }
        }

        //if log type is all: log everything
        if (getEnv('DEBUG_LEVEL') === 'all') {
            console.log(level + ':' + name, data);
        }
    }
}

/**
 * Parse url string and return list of query string key-pair
 *
 * @param url
 * @return {{}}
 */
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

    let splittedArray = url.split(/\/|\?|&|=|\./g);


    if (splittedArray && splittedArray[2]) {
        let currentLevel = filter(levels, (level) => {
            return level.slug == splittedArray[2];
        });

        return (currentLevel && currentLevel[0]) ? currentLevel[0] : false;
    }

    return false;
}

export function getCurrentSectionByUrl(sections, url) {

    let splittedArray = url.split(/\/|\?|&|=|\./g);


    if (splittedArray && splittedArray[4]) {
        let currentSection = filter(sections, (section) => {
            return section.slug == splittedArray[4];
        });

        return (currentSection && currentSection[0]) ? currentSection[0] : false;
    }

    return false;
}

export function generateLevelCompletedPercent(levels, currentLevel) {
    return (levels && currentLevel && levels[currentLevel.id -1]) ? levels[currentLevel.id -1].completed_percent : false;
}

export function saveBusinessOption(currentObject, data) {
    currentObject.props.saveBusinessOptionFormRequest(data).then(
        (response) => {
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

export function formatDate(dateString) {
    let options = { day: 'numeric', month: 'long', year: 'numeric' };
    let date = new Date(dateString.replace(' ', 'T'));

    return date.toLocaleString("en-US", options);
}

export function isLevelLocked(levelStatuses, level) {
    // all levels are open
    return false;
}

export function isSectionLocked(businessOptionStatuses, section) {
    // some sections are open by default
    if (section.id === 1 || section.id === 2) {
        return false;
    }
    let statusObject = find(businessOptionStatuses, (item) => {
        if (! item) {
            debugger;
        }
        return item.section_id === section.id && item.status !== 'locked';
    });

    return !statusObject;
}

export function isBusinessOptionLocked(businessOptionStatuses, businessOption) {
    //some business options are open by default
    if (businessOption.id === 1 || businessOption.id === 2 || businessOption.id === 3) {
        return false;
    }

    let statusObject = find(businessOptionStatuses, (item) => {
        return item.id === businessOption.id && item.status !== 'locked';
    });

    return !statusObject;
}

export function findStatus(statusCollection, levelId) {
    let statusObject = find(statusCollection, {id: levelId});

    return statusObject ? statusObject : {};
}

export function findLevelById(levels, id) {
    let level = find(levels, {id: id});

    return level ? level : {};
}

export function findLevelBySlug(levels, slug) {
    let level = find(levels, {slug: slug});

    return level ? level : {};
}

export function findSectionById(sections, id) {
    let section = find(sections, {id: id});

    return section ? section : {};
}

export function findSectionBySlug(sections, slug) {
    let section = find(sections, {slug: slug});

    return section ? section : {};
}

export function findBusinessOptionById(businessOptions, id) {
    let businessOption = find(businessOptions, {id: id});

    return businessOption ? businessOption : {};
}

export function findBusinessOptionBySlug(businessOptions, slug) {
    let businessOption = find(businessOptions, {slug: slug});

    return businessOption ? businessOption : {};
}

export function getPreviousLevel(levels, level) {

}

export function getNextLevel() {

}

export function getPreviousSection() {
}

export function getNextSection() {

}

export function getPreviousBusinessOption() {
}

export function getNextBusinessOption() {
}