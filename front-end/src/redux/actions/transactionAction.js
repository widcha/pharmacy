import axios from "axios";
import { api_url } from "../../helpers";
const api = `${api_url}/transaction`;
export const fetchUserTransactionDetails = (user_id) => {
	return async (dispatch) => {
		try {
			dispatch({
				type: "API_TRANSACTION_START",
			});
			const response = await axios.get(`${api}/get?user_id=${user_id}`);

			dispatch({
				type: "USER_FETCH_TRANSACTION",
				payload: response.data,
			});
		} catch (err) {
			dispatch({
				type: "API_TRANSACTION_FAILED",
				payload: err.message,
			});
		}
	};
};
