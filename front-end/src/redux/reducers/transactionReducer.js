const INITIAL_STATE = {
	transaction_list: [],
	loading: false,
	error: "",
};

export const transactionReducer = (state = INITIAL_STATE, action) => {
	switch (action.type) {
		case "API_TRANSACTION_START":
			return {
				...state,
				loading: true,
			};
		case "API_TRANSACTION_FAILED":
			return {
				...state,
				loading: false,
				error: action.payload,
			};
		case "USER_FETCH_TRANSACTION":
			return {
				...state,
				loading: false,
				transaction_list: action.payload,
			};
		default:
			return state;
	}
};
