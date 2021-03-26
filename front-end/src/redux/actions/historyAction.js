import axios from "axios";
import { api_url } from "../../helpers";
import { toast, Zoom } from "react-toastify";
import Swal from "sweetalert2";
import { fetchUserCartByIdAction } from "./cartAction";

const apiCart = `${api_url}/carts`;
const api = `${api_url}/history`;

export const fetchHistoryAction = (user_id) => {
  return async (dispatch) => {
    try {
      dispatch({ type: "API_HISTORY_START" });
      const response = await axios.get(`${api}/get?user_id=${user_id}`);
      dispatch({ type: "API_HISTORY_SUCCESS", payload: response.data });
    } catch (err) {
      dispatch({ type: "API_HISTORY_FAILED", payload: err.message });
    }
  };
};

export const repurchaseProductAction = (obj, str) => {
  return async (dispatch) => {
    try {
      dispatch({
        type: "API_CART_START",
      });
      const response = await axios.post(`${apiCart}/add`, obj);
      dispatch({
        type: "USER_FETCH_CART",
        payload: response.data,
      });
      const filtered = await axios.get(
        `${apiCart}/total?user_id=${obj.user_id}`
      );
      dispatch({
        type: "USER_FETCH_SUBTOTAL",
        payload: filtered.data,
      });
    } catch (err) {
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

export const repurchaseCustomAction = ({
  totalQty,
  totalPrice,
  transaction,
  user_id,
}) => {
  return async (dispatch) => {
    console.log(transaction);
    try {
      dispatch({ type: "API_CUSTOM_START" });
      await axios.post(`${api}/repurchase`, {
        totalQty,
        totalPrice,
        transaction,
        user_id,
      });
      dispatch({ type: "API_CUSTOM_SUCCESS" });
      dispatch(fetchUserCartByIdAction(user_id));
    } catch (err) {
      dispatch({ type: "API_CUSTOM_FAILED", payload: err.message });
    }
  };
};
