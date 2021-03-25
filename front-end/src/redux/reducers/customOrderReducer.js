const INITIAL_STATE = {
  capsule: [],
  loading: false,
  error: "",
};

export const customOrderReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case "API_CUSTOM_START":
      return {
        ...state,
        loading: true,
        error: "",
      };
    case "API_CUSTOM_FAILED":
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    case "API_CUSTOM_SUCCESS":
      return {
        ...state,
        loading: false,
      };
    case "ADD_CUSTOM_PRODUCT":
      return {
        ...state,
        capsule: [...state.capsule, action.payload],
      };
    case "CHANGE_QTY":
      return {
        ...state,
        capsule: action.payload,
      };
    case "NULLIFY_CUSTOM_PRODUCT":
      return INITIAL_STATE;
    default:
      return state;
  }
};
