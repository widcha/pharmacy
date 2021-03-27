import axios from "axios";
import { api_url } from "../../helpers";
import { fetchUserCartByIdAction } from "./cartAction";

const url = api_url + "/custom-product";

export const addCustomProductAction = (product) => {
  return async (dispatch) => {
    try {
      dispatch({ type: "API_CUSTOM_START" });
      dispatch({ type: "ADD_CUSTOM_PRODUCT", payload: product });
      dispatch({ type: "API_CUSTOM_SUCCESS" });
    } catch (err) {
      dispatch({ type: "API_CUSTOM_FAILED", payload: err.message });
    }
  };
};

export const customQtyAction = (newState) => {
  return async (dispatch) => {
    try {
      dispatch({ type: "API_CUSTOM_START" });
      dispatch({ type: "CHANGE_QTY", payload: newState });
      dispatch({ type: "API_CUSTOM_SUCCESS" });
    } catch (err) {
      dispatch({ type: "API_CUSTOM_FAILED", payload: err.message });
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
    try {
      const token = localStorage.getItem("token");
      const headers = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };
      dispatch({ type: "API_CUSTOM_START" });
      await axios.post(
        `${url}`,
        {
          totalQty,
          totalPrice,
          capsule,
          user_id,
          notes: notes ? notes : "",
        },
        headers
      );
      dispatch({ type: "API_CUSTOM_SUCCESS" });
      dispatch(fetchUserCartByIdAction(user_id));
    } catch (err) {
      dispatch({ type: "API_CUSTOM_FAILED", payload: err.message });
    }
  };
};

export const nullifyCustomAction = () => {
  return async (dispatch) => {
    dispatch({ type: "NULLIFY_CUSTOM_PRODUCT" });
  };
};
