import axios from "axios";
import { api_url } from "../../helpers";

const linkk = `${api_url}/product`;

export const fetchCategoryAction = () => {
  return async (dispatch) => {
    try {
      const response = await axios.get(`${api_url}/category`);
      dispatch({ type: "FETCH_CATEGORY", payload: response.data });
    } catch (err) {
      dispatch({ type: "FETCH_PRODUCT_FAILED", payload: err.message });
    }
  };
};

export const fetchProductByIdAction = (id) => {
  return async (dispatch) => {
    try {
      dispatch({ type: "FETCH_PRODUCT_START" });
      const response = await axios.get(`${linkk}/${id}`);
      dispatch({ type: "FETCH_PRODUCT_BY_ID_SUCCESS", payload: response.data });
    } catch (err) {
      dispatch({ type: "FETCH_PRODUCT_FAILED", payload: err.message });
    }
  };
};

export const fetchProductAction = () => {
  return async (dispatch) => {
    try {
      dispatch({ type: "FETCH_PRODUCT_START" });
      const response = await axios.get(linkk);
      console.log(response.data);
      dispatch({ type: "FETCH_PRODUCT_SUCCESS", payload: response.data });
    } catch (err) {
      dispatch({ type: "FETCH_PRODUCT_FAILED", payload: err });
    }
  };
};

export const addProductAction = ({
  newName,
  newPrice,
  newVol,
  stock,
  newDesc,
  selectedCategory,
  pict,
}) => {
  return async (dispatch) => {
    try {
      dispatch({ type: "FETCH_PRODUCT_START" });

      let formData = new FormData();
      const val = JSON.stringify({
        newName,
        newPrice,
        newVol,
        newDesc,
        selectedCategory,
        stock,
      });

      formData.append("image", pict);
      formData.append("data", val);

      const headers = {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      };

      await axios.post(`${linkk}`, formData, headers);
      dispatch(fetchProductAction());
    } catch (err) {
      dispatch({ type: "FETCH_PRODUCT_FAILED", payload: err });
    }
  };
};

export const addStock = ({ id, changeStock }) => {
  return async (dispatch) => {
    try {
      dispatch({ type: "FETCH_PRODUCT_START" });
      await axios.patch(`${linkk}/stock/${id}`, {
        product_stock: parseInt(changeStock),
      });
      dispatch(fetchProductAction());
    } catch (err) {
      dispatch({ type: "FETCH_PRODUCT_FAILED", payload: err });
    }
  };
};

export const editProductAction = ({
  id,
  newName,
  newPrice,
  newVol,
  newDesc,
  selectedCategory,
  pict,
}) => {
  return async (dispatch) => {
    try {
      dispatch({ type: "FETCH_PRODUCT_START" });

      let formData = new FormData();
      const val = JSON.stringify({
        newName,
        newPrice,
        newVol,
        newDesc,
        selectedCategory,
      });

      formData.append("image", pict);
      formData.append("data", val);

      const headers = {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      };
      await axios.patch(`${linkk}/${id}`, formData, headers);
      dispatch(fetchProductAction());
    } catch (err) {
      dispatch({ type: "FETCH_PRODUCT_FAILED", payload: err });
    }
  };
};

export const deleteProductAction = (id) => {
  return async (dispatch) => {
    try {
      dispatch({ type: "FETCH_PRODUCT_START" });
      console.log("cekcekDELETEE");
      await axios.delete(`${linkk}/${id}`);
      dispatch(fetchProductAction());
    } catch (err) {
      dispatch({ type: "FETCH_PRODUCT_FAILED", payload: err });
    }
  };
};

export const searchProductAction = (name) => {
  return async (dispatch) => {
    try {
      dispatch({ type: "FETCH_PRODUCT_START" });
      const response = await axios.get(`${linkk}/search?search=${name}`);
      dispatch({ type: "FETCH_PRODUCT_SUCCESS", payload: response.data });
    } catch (err) {
      dispatch({ type: "FETCH_PRODUCT_FAILED", payload: err });
    }
  };
};
