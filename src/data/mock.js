const User = {
    user: {
        id: 1,
        first_name: 'first',
        last_name: 'user',
        email: 'firstuser@gmail.com',
        phone_number: '99 9999 9999',
        verified: false,
    },
    token: ''
};

const Business = {
    business: {
        id: 1,
        business_name: 'my business',
        business_category_id: 1,
        sell_goods: 0,
        website: 'mybusiness.com',
        abn: '8888 8888 8888'
    }
};

const BusinessStatus = {
    business_status: {
        level: [
            {
                id: 1,
                completed_percent: 100,
                completed_on: '2018-01-01T00:00:00'
            }
        ],
        section: [
            {
                id: 1,
                completed_percent: 25,
                completed_on: '2018-01-01T00:00:00'
            }
        ],
        businessOption: [
            {
                id: 1,
                status: 'not_touched'
            }
        ]
    }
};

const Level = {
    level: {
        id: 1,
        name: 'Level 1',
        slug: 'getting-started',
        icon: 'icon.jpg',
        tooltip: 'tooltip'
    }
};

const Section = {
    level: {
        id: 1,
        name: 'Business Categories',
        slug: 'business-categories',
        icon: 'icon.jpg',
        tooltip: 'tooltip'
    }
};

const BusinessOption = {
    businessOption: {
        id: 1,
        title: 'What do you want?',
        slug: 'what-do-you-want',
        content: 'content',
        element: 'element',
        partner: 'partner',
        businessMetas: [
            {
                id: 1,
                business_option_id: 1,
                business_id: 1,
                key: 'logo',
                value: 'logo.png'
            }
        ]
    }
};

const BusinessCategories = {
    id: 1,
    name: 'General',
    icon: 'whiteicon.png',
    hover_icon: 'redicon.png',
    tooltip: 'tooltip'
};

export default {
    User,
    Business,
    BusinessStatus,
    BusinessCategories,
    Level,
    Section,
    BusinessOption
}