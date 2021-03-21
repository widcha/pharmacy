export const addCustomProductAction = (product) => {
  return async (dispatch) => {
    console.log(product);
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
    console.log(newState);
    try {
      dispatch({ type: "API_CUSTOM_START" });
      dispatch({ type: "CHANGE_QTY", payload: newState });
      dispatch({ type: "API_CUSTOM_SUCCESS" });
    } catch (err) {
      dispatch({ type: "API_CUSTOM_FAILED", payload: err.message });
    }
  };
};
