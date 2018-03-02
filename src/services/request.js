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
        });
    }
};

/**
 * Handles all Auth related requests
 */
const Auth = {
    current: () =>
        requests('GET', '/user'),
    login: (loginData) =>
        requests('POST', apiBaseUrl("/user/login"), loginData),
    register: (username, email, password) =>
        requests('POST', '/user', {user: {username, email, password}}),
    save: (user) =>
        requests('PUT', '/user', {user}),
    forgotPassword: (email) =>
        requests('POST', '/user/forgot-password', {user: {email}}),
    resetPassword: (password, confirmPassword) => {
        requests('PUT', '/user/forgot-password', {user: {password, confirmPassword}})
    }
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
        requests('GET', '/news'),
    byTag: (tag) =>
        requests('GET', `/news?tag=${tag}`)
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
