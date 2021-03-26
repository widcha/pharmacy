const INITIAL_STATE = {
  user_id: 0,
  user_username: "",
  user_email: "",
  user_role_id: null,
  user_isverified: null,
  user_address: [],
  notif: [],
  loading: false,
  error: "",
};

export const userReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case "API_USER_START":
      return {
        ...state,
        loading: true,
        error: "",
      };
    case "API_USER_FAILED":
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    case "API_USER_SUCCESS":
      return {
        ...state,
        loading: false,
      };
    case "API_GET_ADDRESS_SUCCESS":
      return {
        ...state,
        loading: false,
        user_address: action.payload,
      };
    case "LOGIN":
      return {
        ...state,
        ...action.payload,
      };
    case "LOGOUT":
      return INITIAL_STATE;
    case "NULLIFY_ERROR":
      return {
        ...state,
        error: "",
      };
    case "API_GET_NOTIF":
      return {
        ...state,
        notif: action.payload,
      };
    default:
      return state;
  }
};
