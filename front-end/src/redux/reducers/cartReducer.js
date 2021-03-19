const INITIAL_STATE = {
	cart_list: [],
	loading: false,
	error: "",
};

export const cartReducer = (state = INITIAL_STATE, action) => {
	switch (action.type) {
		case "API_CART_START":
			return {
				...state,
				loading: true,
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
		default:
			return state;
	}
};
