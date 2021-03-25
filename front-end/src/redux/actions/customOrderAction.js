import axios from "axios";
import {api_url} from "../../helpers";

const url = api_url + "/custom-product";

export const addCustomProductAction = (product) => {
  return async (dispatch) => {
    // console.log(product);
    try {
      dispatch({type: "API_CUSTOM_START"});
      dispatch({type: "ADD_CUSTOM_PRODUCT", payload: product});
      dispatch({type: "API_CUSTOM_SUCCESS"});
    } catch (err) {
      dispatch({type: "API_CUSTOM_FAILED", payload: err.message});
    }
  };
};

export const customQtyAction = (newState) => {
  return async (dispatch) => {
    // console.log(newState);
    try {
      dispatch({type: "API_CUSTOM_START"});
      dispatch({type: "CHANGE_QTY", payload: newState});
      dispatch({type: "API_CUSTOM_SUCCESS"});
    } catch (err) {
      dispatch({type: "API_CUSTOM_FAILED", payload: err.message});
    }
  };
};

export const addProductToDatabaseAction = ({
  totalQty,
  totalPrice,
  capsule,
  user_id,
  notes,
}) => {
  return async (dispatch) => {
    console.log(capsule);
    try {
      dispatch({type: "API_CUSTOM_START"});
      const response = await axios.post(`${url}`, {
        totalQty,
        totalPrice,
        capsule,
        user_id,
        notes: notes ? notes : "",
      });
      console.log(response);
      // dispatch({
      //   type: "USER_FETCH_CART",
      //   payload: response.data,
      // });
      dispatch({type: "API_CUSTOM_SUCCESS"});
    } catch (err) {
      dispatch({type: "API_CUSTOM_FAILED", payload: err.message});
    }
  };
};

export const nullifyCustomAction = () => {
  return async (dispatch) => {
    dispatch({type: "NULLIFY_CUSTOM_PRODUCT"});
  };
};
