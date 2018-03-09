import * as axios from "axios";
import {apiBaseUrl, getEnv, newsFeedApiBaseUrl} from "../utils/helper/helperFunctions";

/**
 * This handles all the api request. If REACT_APP_ENV = mock-api, then the data
 * is faked and returned as async promise object using mock data.
 *
 * To know what type of data is expected by the application, look at the mock data.
 *
 * @param type
 * @param url
 * @param userData
 */
const requests = (type, url, userData = {}) => {
    if (getEnv('ENV') === 'mock-api') {
        // return mockApi(type, url, userData = {});
    } else {
        return axios({
            method: type,
            url: url,
            data: userData,
            crossDomain: true,
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            // validateStatus: (status) => {
            //     return true;
            // },
        });
    }
};

/**
 * Handles all Auth related requests
 */
const Auth = {
    login: (data) =>
        requests('POST', apiBaseUrl("/user/login"), data),
    logout: (data) =>
        requests('POST', apiBaseUrl("/user/logout"), data),
    register: (data) =>
        requests('POST', apiBaseUrl("/user"), data),
    save: (data) =>
        requests('PUT', apiBaseUrl("/user"), data),
    forgotPassword: (data) =>
        requests('POST', apiBaseUrl("/user/send-forgot-password-email"), data),
    updatePassword: (data) =>
        requests('POST', apiBaseUrl("/user/update-password"), data),
    checkIfExists: (data) =>
        requests('POST', apiBaseUrl("/user/check-if-exists"), data),
};

/**
 * Handles all Business related requests
 */
const Business = {
    get: () =>
        requests('GET', apiBaseUrl("/user/business")),
    getStatus: () =>
        requests('GET', apiBaseUrl("/user/business/status")),
    save: (data) =>
        requests('PUT', apiBaseUrl("/user/business"), data),
};

/**
 * Handles all Business Category related requests
 */
const BusinessCategory = {
    all: () =>
        requests('GET', apiBaseUrl("/business-categories")),
};

/**
 * Handles all Level related requests
 */
const Level = {
    all: () =>
        requests('GET', apiBaseUrl("/levels")),
};

/**
 * Handle all Business Option related requests
 */
const BusinessOption = {
    get: (id) =>
        requests('GET', apiBaseUrl(`/business-option/${id}`)),
    save: (data) =>
        requests('POST', apiBaseUrl(`/business-option/${data.id}`), data.input)
};

/**
 * Handle all News related requests
 */
const News = {
    all: () =>
        requests('GET', newsFeedApiBaseUrl("/wp-json/mbj-feed/v1/posts")),
    byTag: (tag) =>
        requests('GET', newsFeedApiBaseUrl(`/wp-json/mbj-feed/v1/posts?tag=${tag}`))
};

export default {
    Auth,
    Business,
    BusinessCategory,
    Level,
    BusinessOption,
    News
};
