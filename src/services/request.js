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
        requests('POST', apiBaseUrl("/user/login"), data.credentials),
    logout: () =>
        requests('POST', apiBaseUrl("/user/logout")),
    register: (data) =>
        requests('POST', apiBaseUrl("/user"), data.user),
    save: (data) =>
        requests('PUT', apiBaseUrl("/user"), data.user),
    forgotPassword: (data) =>
        requests('POST', apiBaseUrl("/user/send-forgot-password-email"), data.email),
    updatePassword: (data) =>
        requests('POST', apiBaseUrl("/user/update-password"), data.input),
    checkIfExists: (data) =>
        requests('POST', apiBaseUrl("/user/check-if-exists"), data.email),
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
        requests('PUT', apiBaseUrl("/user/business"), data.business),
};

/**
 * Handles all Business Category related requests
 */
const BusinessCategory = {
    all: () =>
        requests('GET', '/business-categories'),
};

/**
 * Handles all Level related requests
 */
const Level = {
    all: () =>
        requests('GET', '/levels'),
};

/**
 * Handle all Business Option related requests
 */
const BusinessOption = {
    get: (data) =>
        requests('GET', `/business-options/${data.id}`),
    save: (data) =>
        requests('POST', `/business-options/${data.id}`, data.businessOption)
};

/**
 * Handle all News related requests
 */
const News = {
    all: () =>
        requests('GET', newsFeedApiBaseUrl("/wp-json/mbj-feed/v1/posts")),
    byTag: (data) =>
        requests('GET', newsFeedApiBaseUrl(`/wp-json/mbj-feed/v1/posts?tag=${data.tag}`))
};

export default {
    Auth,
    Business,
    BusinessCategory,
    Level,
    BusinessOption,
    News
};
