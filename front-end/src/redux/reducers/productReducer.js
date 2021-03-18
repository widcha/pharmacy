const INITIAL_STATE = {
	product_list: [],
	category: [],
	product: {},
	loading: false,
	error: "",
	product_price_highest: 0,
};

export const productReducer = (state = INITIAL_STATE, action) => {
	switch (action.type) {
		case "FETCH_PRODUCT_START":
			return {
				...state,
				loading: true,
			};
		case "FETCH_PRODUCT_SUCCESS":
			return {
				...state,
				loading: false,
				product_list: action.payload,
			};
		case "FETCH_PRODUCT_BY_ID_SUCCESS":
			return {
				...state,
				loading: false,
				product: action.payload,
			};
		case "FETCH_PRODUCT_FAILED":
			return {
				...state,
				loading: false,
				error: action.payload,
			};
		case "FETCH_CATEGORY":
			return {
				...state,
				category: action.payload,
			};
		case "NULLIFY_ERROR":
			return {
				...state,
				error: "",
			};
		case "FETCH_PRODUCT_MAXPRICE":
			return {
				...state,
				product_price_highest: action.payload,
				loading: false,
			};
		default:
			return state;
	}
};
