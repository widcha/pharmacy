const INITIAL_STATE = {
  notif: [],
  lengths: {},
  recipe: [],
  payment_img: [],
  material_flow: [],
  finance_report: [],
  data: [],
  product_sold: [],
  userInfo: [],
  totalEarning: 0,
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
    case "FETCH_LENGTH_SUCCESS":
      return {
        ...state,
        loading: false,
        lengths: action.payload,
      };
    case "FETCH_USER_INFO_SUCCESS":
      return {
        ...state,
        loading: false,
        userInfo: action.payload,
      };
    case "FETCH_FINREP_SUCCESS":
      return {
        ...state,
        loading: false,
        finance_report: action.payload[1],
        totalEarning: action.payload[0],
        data: action.payload[2],
        product_sold: action.payload[3],
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
