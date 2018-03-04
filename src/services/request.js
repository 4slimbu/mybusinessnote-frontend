import * as axios from "axios";
import {apiBaseUrl, getEnv} from "../utils/helper/helperFunctions";

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
    current: () =>
        requests('GET', '/user'),
    login: (data) =>
        requests('POST', apiBaseUrl("/user/login"), data),
    register: (data) =>
        requests('POST', '/user', data),
    save: (data) =>
        requests('POST', '/user', data),
    forgotPassword: (data) =>
        requests('POST', apiBaseUrl("/user/send-forgot-password-email"), data),
    updatePassword: (data) =>
        requests('POST', apiBaseUrl("/user/update-password"), data),
};

/**
 * Handles all Business related requests
 */
const Business = {
    get: () =>
        requests('GET', '/business'),
    getStatus: () =>
        requests('GET', '/business/status'),
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
    allWithSections: () =>
        requests('GET', '/levels?sections=true'),
    get: (id) =>
        requests('GET', `/levels/${id}`),
    getWithSections: (id) =>
        requests('GET', `/levels/${id}?sections=true`)
};

/**
 * Handle all Section related requests
 */
const Section = {
    all: () =>
        requests('GET', '/sections'),
    allWithBusinessOptions: () =>
        requests('GET', '/sections?business-options=true')
};

/**
 * Handle all BusinessOption related requests
 */
const BusinessOption = {
    all: () =>
        requests('GET', '/business-options'),
    byBusiness: (businessId) =>
        requests('GET', `/business-options?business=${businessId}`),
    get: (id) =>
        requests('GET', `/business-options/${id}`),
    getWithBusinessMeta: (id) =>
        requests('GET', `/business-options/${id}?business-meta=true`)
};

/**
 * Handle all News related requests
 */
const News = {
    all: () =>
        requests('GET', 'http://staging.mybusinessjourney.com.au/wp-json/mbj-feed/v1/posts'),
    byTag: (tag) =>
        requests('GET', `http://staging.mybusinessjourney.com.au/wp-json/mbj-feed/v1/posts?tag=${tag}`)
};

export default {
    Auth,
    Business,
    BusinessCategory,
    Level,
    Section,
    BusinessOption,
    News
};
