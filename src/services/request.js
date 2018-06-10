import * as axios from "axios";
import {apiBaseUrl, getEnv, newsFeedApiBaseUrl} from "../utils/helper/helperFunctions";
import axiosRetry from 'axios-retry';

// axiosRetry(axios, { retries: 5 });
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
    login: (data) =>
        requests('POST', apiBaseUrl("/user/login"), data),
    logout: (data) =>
        requests('POST', apiBaseUrl("/user/logout"), data),
    register: (data) =>
        requests('POST', apiBaseUrl("/user/register"), data),
    save: (data) =>
        requests('PUT', apiBaseUrl("/user"), data),
    forgotPassword: (data) =>
        requests('POST', apiBaseUrl("/user/send-forgot-password-email"), data),
    updatePassword: (data) =>
        requests('POST', apiBaseUrl("/user/update-password"), data),
    sendVerificationEmail: () =>
        requests('GET', apiBaseUrl("/user/send-verification-email")),
    verifyEmail: (data) =>
        requests('POST', apiBaseUrl("/user/verify-email"), data),
    checkIfExists: (data) =>
        requests('POST', apiBaseUrl("/user/check-if-exists"), data),
    loginSocialUser: (url) =>
        requests('GET', apiBaseUrl(url)),
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
        requests('GET', apiBaseUrl("/levels?with=sections")),
};

/**
 * Handle all Business Option related requests
 */
const BusinessOption = {
    all: () =>
        requests('GET', apiBaseUrl(`/business-options`)),
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

/**
 * Handle all News related requests
 */
const Track = {
    click: (data) =>
        requests('GET', apiBaseUrl('/click?bo_id=' + data.boId + '&aff_id=' + data.affId)),
};

export default {
    Auth,
    Business,
    BusinessCategory,
    Level,
    BusinessOption,
    News,
    Track
};
