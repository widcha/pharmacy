const INITIAL_STATE = {
  history_list: [],
  loading: false,
  error: "",
};

export const historyReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case "API_HISTORY_START":
      return {
        ...state,
        loading: true,
      };
    case "API_HISTORY_SUCCESS":
      return {
        ...state,
        loading: false,
        history_list: action.payload,
      };
    case "API_HISTORY_FAILED":
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    default:
      return state;
  }
};
