const INITIAL_STATE = {
  recipe: [],
  notif: [],
  material_flow: [],
  payment_img: [],
  loading: false,
  error: "",
};

export const adminReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case "FETCH_DATA_START":
      return {
        ...state,
        loading: true,
      };
    case "FETCH_RECIPE_SUCCESS":
      return {
        ...state,
        loading: false,
        recipe: action.payload,
      };
    case "FETCH_FLOW_SUCCESS":
      return {
        ...state,
        loading: false,
        material_flow: action.payload,
      };
    case "FETCH_PAY_IMG_SUCCESS":
      return {
        ...state,
        loading: false,
        payment_img: action.payload,
      };
    case "FETCH_NOTIF_SUCCESS":
      return {
        ...state,
        loading: false,
        notif: action.payload,
      };
    case "FETCH_DATA_FAILED":
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    default:
      return state;
  }
};
