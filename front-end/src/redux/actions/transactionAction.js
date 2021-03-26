import axios from "axios";
import { api_url } from "../../helpers";
const api = `${api_url}/transaction`;
export const fetchUserTransactionDetails = (user_id, query) => {
	return async (dispatch) => {
		try {
			dispatch({
				type: "API_TRANSACTION_START",
			});
			const response = await axios.get(
				`${api}/get?user_id=${user_id}&order_status=${query}`
			);

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

export const userUploadPaymentSlipAction = ({
	transaction_invoice_number,
	user_id,
	pict,
}) => {
	return async (dispatch) => {
		try {
			console.log(transaction_invoice_number);
			dispatch({
				type: "API_TRANSACTION_START",
			});
			let formData = new FormData();

			const val = JSON.stringify({
				transaction_invoice_number,
				user_id,
			});
			formData.append("image", pict);
			formData.append("data", val);
			const headers = {
				headers: {
					"Content-Type": "multipart/form-data",
				},
			};

			await axios.post(`${api}/payment_upload`, formData, headers);
			dispatch(fetchUserTransactionDetails(user_id));
		} catch (err) {
			dispatch({
				type: "API_TRANSACTION_FAILED",
				payload: err.message,
			});
		}
	};
};

export const userCancelOrderAction = (transaction_invoice_number, user_id) => {
	return async (dispatch) => {
		try {
			dispatch({
				type: "API_TRANSACTION_START",
			});
			await axios.patch(`${api}/cancel_order`, {
				transaction_invoice_number,
				user_id,
			});
			dispatch(fetchUserTransactionDetails(user_id));
		} catch (err) {
			dispatch({
				type: "API_TRANSACTION_FAILED",
				payload: err.message,
			});
		}
	};
};

export const userConfirmOrderAction = (transaction_invoice_number, user_id) => {
	return async (dispatch) => {
		try {
			dispatch({
				type: "API_TRANSACTION_START",
			});

			await axios.patch(`${api}/confirm_order`, {
				transaction_invoice_number,
				user_id,
			});
			dispatch(fetchUserTransactionDetails(user_id));
		} catch (err) {
			dispatch({
				type: "API_TRANSACTION_FAILED",
				payload: err.message,
			});
		}
	};
};

export const userComplainOrderAction = (
	transaction_invoice_number,
	user_id,
	message
) => {
	return async (dispatch) => {
		try {
			dispatch({
				type: "API_TRANSACTION_START",
			});
			await axios.patch(`${api}/complain_order`, {
				transaction_invoice_number,
				user_id,
				message,
			});
			dispatch(fetchUserTransactionDetails(user_id));
		} catch (err) {
			dispatch({
				type: "API_TRANSACTION_FAILED",
				payload: err.message,
			});
		}
	};
};
