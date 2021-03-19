import { TrackChanges } from "@material-ui/icons";
import axios from "axios";
import { toast, Zoom } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { api_url } from "../../helpers";
const api = `${api_url}/carts`;
export const userAddProductToCartAction = (obj) => {
	return async (dispatch) => {
		try {
			console.log(obj);
			dispatch({
				type: "API_CART_START",
			});
			const response = await axios.post(`${api}/add`, obj);
			console.log(response);
			dispatch({
				type: "USER_FETCH_CART",
				payload: response.data,
			});
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
		} catch (err) {
			dispatch({
				type: "API_CART_FAILED",
				payload: err.response.data.message,
			});
		}
	};
};
