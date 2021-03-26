import axios from "axios";
import {api_url} from "../../helpers";

const url = `${api_url}/admin`;

export const fetchNotifAdmin = (data) => {
  return async (dispatch) => {
    try {
      dispatch({type: "FETCH_DATA_START"});
      const response = await axios.get(`${url}/get-notif?select=${data}`);
      dispatch({type: "FETCH_NOTIF_SUCCESS", payload: response.data});
    } catch (err) {
      dispatch({type: "FETCH_DATA_FAILED", payload: err.message});
    }
  };
};

export const getStockFlowAction = (data) => {
  return async (dispatch) => {
    try {
      dispatch({type: "FETCH_DATA_START"});
      let response;
      if (data) {
        const {sort} = data;
        response = await axios.get(`${url}/get/stock-flow?sort=${sort}`);
      } else {
        response = await axios.get(`${url}/get/stock-flow`);
      }
      dispatch({type: "FETCH_FLOW_SUCCESS", payload: response.data});
    } catch (err) {
      dispatch({type: "FETCH_DATA_FAILED", payload: err.message});
    }
  };
};

export const fetchRecipeAction = (data) => {
  return async (dispatch) => {
    try {
      dispatch({type: "FETCH_DATA_START"});
      let response;
      if (data) {
        const {sort, searchWord, sortStatus} = data;
        response = await axios.get(
          `${url}/get/recipe?sort=${sort}&search=${searchWord}&status=${sortStatus}`
        );
      } else {
        response = await axios.get(`${url}/get/recipe`);
      }
      dispatch({type: "FETCH_RECIPE_SUCCESS", payload: response.data});
    } catch (err) {
      dispatch({type: "FETCH_DATA_FAILED", payload: err.message});
    }
  };
};

export const changeRecipeStatus = ({id, recipes_status}) => {
  return async (dispatch) => {
    try {
      dispatch({type: "FETCH_DATA_START"});
      await axios.patch(`${url}/change/recipe/${id}`, {recipes_status});
      dispatch(fetchRecipeAction());
    } catch (err) {
      dispatch({type: "FETCH_DATA_FAILED", payload: err.message});
    }
  };
};

export const fetchPaymentProofAction = (data) => {
  return async (dispatch) => {
    try {
      dispatch({type: "FETCH_DATA_START"});
      let response;
      if (data) {
        const {sort, sortStatus, searchWord} = data;
        response = await axios.get(
          `${url}/get/payment-proof?search=${searchWord}&sort=${sort}&sortStatus=${sortStatus}`
        );
      } else {
        response = await axios.get(`${url}/get/payment-proof`);
      }
      dispatch({type: "FETCH_PAY_IMG_SUCCESS", payload: response.data});
    } catch (err) {
      dispatch({type: "FETCH_DATA_FAILED", payload: err.message});
    }
  };
};

export const changeOrderStatusAction = ({id, order_status_id, reason}) => {
  return async (dispatch) => {
    try {
      dispatch({type: "FETCH_DATA_START"});
      console.log(id);
      await axios.patch(`${url}/change/transaction?id=${id}`, {
        order_status_id,
        reason,
      });
      dispatch(fetchPaymentProofAction());
    } catch (err) {
      dispatch({type: "FETCH_DATA_FAILED", payload: err.message});
    }
  };
};

export const fetchStockFlowByIdAction = (id) => {
  return async (dispatch) => {
    try {
      dispatch({type: "FETCH_DATA_START"});
      const response = await axios.get(`${url}/get/flow/${id}`);
      dispatch({type: "FETCH_FLOW_SUCCESS", payload: response.data});
    } catch (err) {
      dispatch({type: "FETCH_DATA_FAILED", payload: err.message});
    }
  };
};
