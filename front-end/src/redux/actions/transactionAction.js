import axios from "axios";
import {api_url} from "../../helpers";
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

export const adminFetchTransaction = (query) => {
  return async (dispatch) => {
    try {
      dispatch({
        type: "API_TRANSACTION_START",
      });
      const response = await axios.get(`${api}/admin-get${query}`);

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

      await axios.post(`${api}/payment-upload`, formData, headers);
      dispatch(fetchUserTransactionDetails(user_id));
    } catch (err) {
      dispatch({
        type: "API_TRANSACTION_FAILED",
        payload: err.message,
      });
    }
  };
};
