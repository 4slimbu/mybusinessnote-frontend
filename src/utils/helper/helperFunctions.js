import {filter, find, findIndex, has, indexOf, map} from "lodash";
import {MESSAGES} from "../../constants/messages";
import Cookies from 'universal-cookie';

/*
==========================================================================
App Helper Functions
==========================================================================
 */
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
 * Transform 'slug_string' or 'camelCaseString' or 'any type of string' to 'Capitalized Words'
 *
 * @param string
 * @returns {string}
 */
export function toCapitalizedWords(string) {
    const newString = string.replace(/([A-Z])/g, ' $1')
        .replace(/([_])/g, ' ');

    return firstOfEachWordToUppercase(newString);
}

/**
 * Capitalize first letter of each words in a string
 *
 * @param str
 * @returns {string}
 */
export function firstOfEachWordToUppercase(str) {
    let array = str.split(' ');
    let newArray = [];

    for (let x = 0; x < array.length; x++) {
        newArray.push(array[x].charAt(0).toUpperCase() + array[x].slice(1));
    }

    return newArray.join(' ');
}

/**
 * Format Date to user friendly string
 *
 * @param dateString
 * @returns {string}
 */
export function formatDate(dateString) {
    let options = {day: 'numeric', month: 'long', year: 'numeric'};
    let date = new Date(dateString.replace(' ', 'T'));

    // return dateString;
    return date.toLocaleString("en-US", options);
}

/*
==========================================================================
Form Handling Helper Functions
==========================================================================
 */
export function getAllFields(stateObject) {
    const fields = {};

    map(stateObject, (item, key) => {
        if (item.value) {
            fields[key] = item.value;
        }
    });

    return fields;
}

export function getChangedFields(stateObject) {
    const fields = {};

    map(stateObject, (item, key) => {
        if (item.isChanged) {
            fields[key] = item.value;
        }
    });

    return fields;
}

export function getRulesForChangedFields(rules, fields) {
    const filteredRules = {};

    map(rules, (rule, key) => {
        if (has(fields, key)) {
            filteredRules[key] = rule;
        }
    });

    return filteredRules;
}


/*
==========================================================================
Data Handling Helper Functions
==========================================================================
 */
/**
 * Use error code to get error message
 *
 * @param errorCode
 * @return {string}
 */
export function getCodeMessage(errorCode) {
    return MESSAGES[errorCode] ? MESSAGES[errorCode] : MESSAGES.ERR_UNKNOWN;
}

export function filterLevelsBySlug(levels, levelSlug) {
    let currentLevel = filter(levels, (level) => {
        return level.slug == levelSlug;
    });
    //get only the first value
    return currentLevel[0];
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
    let splittedArray = location.split(/\/|\?|&|=|\./g);

    let filteredIndexes = splittedArray.map(function (c, i) {
        if (c === 'bo') {
            return i + 1;
        }
    }).filter(function (v) {
        return v >= 0;
    });

    if (isItemLoaded(filteredIndexes)) {
        // return the last found
        return splittedArray[filteredIndexes[filteredIndexes.length - 1]] * 1;
    }

    return null;
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
    return (levels && currentLevel && levels[currentLevel.id - 1]) ? levels[currentLevel.id - 1].completed_percent : false;
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

export function isLevelLocked(appStatus, level) {
    // First level is always unlocked
    if (level.id === 1) {
        return false;
    }

    // If at least some thing is completed in this level, then it must have been unlocked
    let levelStatus = getStatus(appStatus.businessStatus.levelStatuses, level.id);
    let completedPercent = levelStatus.completed_percent ? levelStatus.completed_percent : 0;
    if (completedPercent > 0) {
        return false;
    }

    // If previous level is completed then this level must be unlocked
    let previousLevelStatus = getStatus(appStatus.businessStatus.levelStatuses, level.id - 1);
    let previousLevelCompletedPercent = previousLevelStatus.completed_percent ? previousLevelStatus.completed_percent : 0;
    if (previousLevelCompletedPercent >= 100) {
        return false;
    }

    let statusObject = find(appStatus.businessStatus.businessOptionStatuses, (item) => {
        return item.level_id === level.id && item.status !== 'locked'
    });

    return !statusObject;
}

export function isSectionLocked(businessOptionStatuses, section) {
    return false;
    // some sections are open by default
    if (section.id === 1 || section.id === 2) {
        return false;
    }
    let statusObject = find(businessOptionStatuses, (item) => {
        return item.section_id === section.id && item.status !== 'locked';
    });

    return !statusObject;
}

export function filterBusinessOptionsBySection(appStatus, sectionId) {
    let relevantBusinessOptions = filter(appStatus.businessOptions, function (item) {
        let statusObject = getStatus(appStatus.businessStatus.businessOptionStatuses, item.id);
        return item.section_id === sectionId && statusObject.status != 'irrelevant' && !item.parent_id;
    });

    return relevantBusinessOptions ? relevantBusinessOptions : [];
}

export function hasChildBusinessOptions(appStatus, currentBusinessOption) {
    let relevantBusinessOptions = filter(appStatus. businessOptions, function (item) {
        let statusObject = getStatus(appStatus.businessStatus.businessOptionStatuses, item.id);
        return item.parent_id === currentBusinessOption.id  && statusObject.status != 'irrelevant';
    });

    return isItemLoaded(relevantBusinessOptions);
}

export function hasInCompleteChildBusinessOptions(appStatus, currentBusinessOption) {
    let relevantBusinessOptions = filter(appStatus. businessOptions, function (item) {
        let statusObject = getStatus(appStatus.businessStatus.businessOptionStatuses, item.id);
        return item.parent_id === currentBusinessOption.id  && statusObject.status != 'irrelevant';
    });

    if (isItemLoaded(relevantBusinessOptions)) {
        let completedBusinessOptions = filter(relevantBusinessOptions, function (item) {
            let statusObject = getStatus(appStatus.businessStatus.businessOptionStatuses, item.id);
            return item.parent_id === currentBusinessOption.id  && statusObject.status != 'irrelevant' && statusObject.status === 'done';
        });

        if (relevantBusinessOptions.length === completedBusinessOptions.length) {
            return false;
        }
    }

    return true;
}

export function getChildBusinessOptions(appStatus, currentBusinessOption) {
    let relevantBusinessOptions = filter(appStatus. businessOptions, function (item) {
        let statusObject = getStatus(appStatus.businessStatus.businessOptionStatuses, item.id);
        return item.parent_id === currentBusinessOption.id  && statusObject.status != 'irrelevant';
    });

    return relevantBusinessOptions ? relevantBusinessOptions : [];
}

export function getSectionPosition(sectionIdentifierObjectCollection, sectionId) {
    for (let i = 0; i < sectionIdentifierObjectCollection.length; i++) {
        if (sectionIdentifierObjectCollection[i].id === sectionId) {
            return i;
        }
    }

    return -1;
}

export function getStatus(statusCollection, id) {
    let statusObject = find(statusCollection, {id: id});
    return statusObject ? statusObject : {};
}

export function getIndexOf(array, value) {
    return indexOf(array, value);
}

export function getByKey(collection, key, value) {
    let statusObject = find(collection, {[key]: value});
    return statusObject ? statusObject : {};
}

export function getById(collection, id) {
    let statusObject = find(collection, {id: id});
    return statusObject ? statusObject : null;
}

export function getBySlug(collection, slug) {
    let statusObject = find(collection, {slug: slug});
    return statusObject ? statusObject : {};
}

export function filterFirstInCollection(collection = [], filterObject = {}) {
    filterObject = find(collection, filterObject);
    return filterObject ? filterObject : {};
}

export function getByEventType(collection, type) {
    let eventObject = find(collection, {type: type});
    return eventObject ? eventObject : {};
}

export function getFirst(collection) {
    let item = isItemLoaded(collection) && collection[0];
    return item ? item : null;
}

export function getLast(collection) {
    let item = isItemLoaded(collection) && collection[collection.length - 1];
    return item ? item : null;
}

export function getPrevious(collection, id) {
    let index = findIndex(collection, function (item) {
        return item.id === id;
    });
    return collection[index - 1] ? collection[index - 1] : null;
}

export function getNext(collection, id) {
    let index = findIndex(collection, function (item) {
        return item.id === id;
    });
    return collection[index + 1] ? collection[index + 1] : null;
}

export function getCurrentLevelSections(sections, id) {
    let currentLevelSections = filter(sections, function (item) {
        return item.level_id === id;
    });
    return currentLevelSections;
}

export function getFirstDoableBusinessOption(collection) {
    let firstUnlocked = find(collection, {status: 'unlocked'});
    // return first unlocked business option
    if (isItemLoaded(firstUnlocked)) {
        return firstUnlocked;
    }

    let firstSkipped = find(collection, {status: 'skipped'});
    // return first skipped business option
    if (isItemLoaded(firstSkipped)) {
        return firstSkipped;
    }

    return {};
}

export function isItemLoaded(item) {
    if (typeof item === 'undefined' || item === null) {
        return false;
    }

    return !!(Object.keys(item).length > 0);
}

/*
==========================================================================
ROUTE Helper Functions
==========================================================================
 */
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

        for (let i = 0; i < arr.length; i++) {
            // separate the keys and the values
            let a = arr[i].split('=');

            // in case params look like: list[]=thing1&list[]=thing2
            let paramNum = undefined;
            let paramName = a[0].replace(/\[\d*\]/, function (v) {
                paramNum = v.slice(1, -1);
                return '';
            });

            // set parameter value (use 'true' if empty)
            let paramValue = typeof(a[1]) === 'undefined' ? true : a[1];

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
        return '/level/' + level + '/section/' + section + '/bo/' + businessOption;
    }
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

/*
==========================================================================
Extra Helper Functions
==========================================================================
 */

export function getCookie(name, options = {}) {
    const cookies = new Cookies();
    return cookies.get(name, options);
}

export function setCookie(name, value, options = {}) {
    const cookies = new Cookies();
    cookies.set(name, value, options);
}
