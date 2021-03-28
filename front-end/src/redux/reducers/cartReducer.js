const INITIAL_STATE = {
  cart_list: [],
  loading: false,
  error: "",
  available_products: [],
  subTotal: 0,
  tax: 0,
  total: 0,
  checkout_ready: false,
};

export const cartReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case "API_CART_START":
      return {
        ...state,
        loading: true,
        error: "",
      };
    case "API_CART_FAILED":
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    case "API_CART_SUCCESS":
      return {
        ...state,
        loading: false,
        cart_list: [...state.cart_list, action.payload],
      };
    case "CLEAR_CART":
      return INITIAL_STATE;

    case "USER_FETCH_CART":
      return {
        ...state,
        cart_list: action.payload,
        loading: false,
      };

    case "USER_FETCH_SUBTOTAL":
      return {
        ...state,
        available_products: action.payload.data,
        subTotal: action.payload.subTotal,
        tax: action.payload.subTotal * 0.1,
        total: action.payload.subTotal + action.payload.subTotal * 0.1,
      };
    case "USER_READY_CHECKOUT":
      return {
        ...state,
        checkout_ready: true,
      };
    case "USER_FINISH_CHECKOUT":
      return {
        ...state,
        checkout_ready: false,
      };
    default:
      return state;
  }
};
