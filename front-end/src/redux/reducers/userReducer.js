const INITIAL_STATE = {
    user_id: 0,
    user_username: "",
    user_email: "",
    user_role_id: null,
    user_isverified: null,
    user_address: [],
    loading: false,
    error: "",
}

export const userReducer = ( state = INITIAL_STATE, action ) => {
    switch (action.type) {
        default:
            return state
    }
};