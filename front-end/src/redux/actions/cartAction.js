import { TrackChanges } from "@material-ui/icons";
import axios from "axios";
import { toast, Zoom } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Swal from "sweetalert2";
import { api_url } from "../../helpers";
const api = `${api_url}/carts`;
export const userAddProductToCartAction = (obj, str) => {
	return async (dispatch) => {
		try {
			console.log(obj);
			dispatch({
				type: "API_CART_START",
			});
			const response = await axios.post(`${api}/add`, obj);
			dispatch({
				type: "USER_FETCH_CART",
				payload: response.data,
			});
			const filtered = await axios.get(`${api}/total?user_id=${obj.user_id}`);
			dispatch({
				type: "USER_FETCH_SUBTOTAL",
				payload: filtered.data,
			});
			if (!str) {
				toast("Product Added!", {
					position: "bottom-right",
					autoClose: 2000,
					hideProgressBar: true,
					closeOnClick: true,
					pauseOnHover: true,
					draggable: true,
					progress: undefined,
					transition: Zoom,
				});
			}
		} catch (err) {
			// console.log(err);
			dispatch({
				type: "API_CART_FAILED",
				payload: err.response.data.message,
			});
			toast.error(`${err.response.data.message}`, {
				position: "bottom-right",
				autoClose: 2000,
				hideProgressBar: false,
				closeOnClick: true,
				pauseOnHover: true,
				draggable: true,
				progress: undefined,
			});
		}
	};
};

export const fetchUserCartByIdAction = (idx) => {
	return async (dispatch) => {
		try {
			dispatch({
				type: "API_CART_START",
			});
			const response = await axios.get(`${api}/${idx}`);
			console.log(response.data);
			dispatch({
				type: "USER_FETCH_CART",
				payload: response.data,
			});
		} catch (err) {
			dispatch({
				type: "API_CART_FAILED",
				payload: err.response.data.message,
			});
		}
	};
};

export const userSubProductFromCartAction = (obj) => {
	return async (dispatch) => {
		try {
			dispatch({
				type: "API_CART_START",
			});

			const response = await axios.post(`${api}/sub`, obj);
			dispatch({
				type: "USER_FETCH_CART",
				payload: response.data,
			});

			const filtered = await axios.get(`${api}/total?user_id=${obj.user_id}`);
			dispatch({
				type: "USER_FETCH_SUBTOTAL",
				payload: filtered.data,
			});
		} catch (err) {
			dispatch({
				type: "API_CART_FAILED",
				payload: err.response.data.message,
			});
		}
	};
};
export const userDeleteProductInCart = (user_id, product_id) => {
	return async (dispatch) => {
		try {
			dispatch({
				type: "API_CART_START",
			});
			console.log(user_id, product_id);

			const response = await axios.delete(
				`${api}/remove?user_id=${user_id}&product_id=${product_id}`
			);
			dispatch({
				type: "USER_FETCH_CART",
				payload: response.data,
			});
			const filtered = await axios.get(`${api}/total?user_id=${user_id}`);
			dispatch({
				type: "USER_FETCH_SUBTOTAL",
				payload: filtered.data,
			});
		} catch (err) {
			dispatch({
				type: "API_CART_FAILED",
				payload: err.response.data.message,
			});
		}
	};
};

export const userGetSubTotal = (user_id) => {
	return async (dispatch) => {
		try {
			dispatch({
				type: "API_CART_START",
			});

			const response = await axios.get(`${api}/total?user_id=${user_id}`);

			dispatch({
				type: "USER_FETCH_SUBTOTAL",
				payload: response.data,
			});
			console.log(response.data);
		} catch (err) {
			dispatch({
				type: "API_CART_FAILED",
				payload: err.response.data.message,
			});
		}
	};
};

export const userCheckoutAction = (user_id, data, total, address) => {
	return async (dispatch) => {
		try {
			Swal.fire({
				title: "Process your order?",
				icon: "info",
				showCancelButton: true,
				confirmButtonColor: "#3085d6",
				cancelButtonColor: "#d33",
				confirmButtonText: "Yes!",
			}).then(async (result) => {
				if (result.isConfirmed) {
					await axios.post(`${api}/check-out`, {
						user_id,
						data,
						total,
						address,
					});
					dispatch(finishCheckoutAction());
					dispatch(fetchUserCartByIdAction(user_id));
					Swal.fire(
						"Thank You For Your Purchase!",
						"We'll notify you an order confirmation with details",
						"success"
					);
				}
			});
		} catch (err) {
			dispatch({
				type: "API_CART_FAILED",
				payload: err.response.data.message,
			});
		}
	};
};

export const redirectToCheckoutAction = () => {
	return {
		type: "USER_READY_CHECKOUT",
	};
};
export const finishCheckoutAction = () => {
	return {
		type: "USER_FINISH_CHECKOUT",
	};
};

export const userDeleteCustomProductInCart = (user_id, custom_product_id) => {
	return async (dispatch) => {
		try {
			dispatch({
				type: "API_CART_START",
			});
			console.log(user_id, custom_product_id);

			const response = await axios.delete(
				`${api}/remove?user_id=${user_id}&custom_product_id=${custom_product_id}`
			);
			dispatch({
				type: "USER_FETCH_CART",
				payload: response.data,
			});
			const filtered = await axios.get(`${api}/total?user_id=${user_id}`);
			dispatch({
				type: "USER_FETCH_SUBTOTAL",
				payload: filtered.data,
			});
		} catch (err) {
			dispatch({
				type: "API_CART_FAILED",
				payload: err.response.data.message,
			});
		}
	};
};
