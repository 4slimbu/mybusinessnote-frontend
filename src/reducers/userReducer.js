const userReducer = (state = {
    name: "Sudip Limbu",
    age: 29,
}, action) => {
    switch (action.type) {
        case "SET_NAME_FULFILLED":
            state = {
                ...state,
                name: action.payload
            };
            break;
        case "SET_AGE":
            state = {
                ...state,
                result: action.payload
            };
            break;
        default:
    }
    return state
};

export default userReducer;