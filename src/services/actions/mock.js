import {POST_LOGIN_FORM_URL} from "../../constants/apiUrls";

export const mockApi = (URL) => {
    switch (URL) {
        case `${POST_LOGIN_FORM_URL}`:
            return true
    }
};