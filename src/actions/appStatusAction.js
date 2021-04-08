import {
    SET_APP_SETTINGS,
    SET_BUSINESS,
    SET_BUSINESS_CATEGORIES,
    SET_BUSINESS_CATEGORY_ID,
    SET_BUSINESS_META,
    SET_BUSINESS_OPTION,
    SET_BUSINESS_OPTIONS,
    SET_BUSINESS_STATUS,
    SET_CURRENT,
    SET_CURRENT_TIP_CATEGORY, SET_EVENTS,
    SET_LEVEL,
    SET_LEVELS,
    SET_SECTION,
    SET_SECTIONS,
    SET_SELL_GOODS,
    SET_TOOLTIP_CONTENT, SYNC_BUSINESS_STATUS
} from "../constants/actionTypes";

export function setLevels(levels) {
    return {
        type: SET_LEVELS,
        levels
    }
}

export function setSections(sections) {
    return {
        type: SET_SECTIONS,
        sections
    }
}

export function setBusinessOptions(businessOptions) {
    return {
        type: SET_BUSINESS_OPTIONS,
        businessOptions
    }
}

export function setLevel(level) {
    return {
        type: SET_LEVEL,
        level
    }
}

export function setSection(section) {
    return {
        type: SET_SECTION,
        section
    }
}

export function setBusinessOption(businessOption) {
    return {
        type: SET_BUSINESS_OPTION,
        businessOption
    }
}

export function setBusiness(business) {
    return {
        type: SET_BUSINESS,
        business
    }
}

export function setBusinessStatus(businessStatus) {
    return {
        type: SET_BUSINESS_STATUS,
        businessStatus
    }
}

export function syncBusinessStatus(businessStatus) {
    return {
        type: SYNC_BUSINESS_STATUS,
        businessStatus
    }
}

export function setBusinessCategories(businessCategories) {
    return {
        type: SET_BUSINESS_CATEGORIES,
        businessCategories
    }
}

export function setCurrent(level = {}, section = {}, businessOption = {}) {
    return {
        type: SET_CURRENT,
        current: {
            level: level,
            section: section,
            businessOption: businessOption
        }
    }
}

export function setBusinessCategoryId(id) {
    return {
        type: SET_BUSINESS_CATEGORY_ID,
        business_category_id: id
    }
}

export function setSellGoods(bool) {
    return {
        type: SET_SELL_GOODS,
        sell_goods: bool
    }
}

export function setCurrentTipCategory(id) {
    return {
        type: SET_CURRENT_TIP_CATEGORY,
        currentTipCategoryId: id
    }
}

export function setBusinessMeta(metaData) {
    return {
        type: SET_BUSINESS_META,
        metaData
    }
}

export function setToolTipContent(toolTip) {
    return {
        type: SET_TOOLTIP_CONTENT,
        toolTip
    }
}

export function setEvents(events) {
    return {
        type: SET_EVENTS,
        events
    }
}

export function setAppSettings(settings) {
    return {
        type: SET_APP_SETTINGS,
        settings
    }
}