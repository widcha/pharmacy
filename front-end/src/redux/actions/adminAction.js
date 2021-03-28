import axios from "axios";
import {api_url} from "../../helpers";

const url = `${api_url}/admin`;

export const fetchNotifAdmin = (query) => {
  return async (dispatch) => {
    try {
      dispatch({type: "FETCH_DATA_START"});
      let response;
      if (query) {
        response = await axios.get(`${url}/get-notif${query}`);
      }
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

      const token = localStorage.getItem("token");
      const headers = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };

      let response;
      if (data) {
        response = await axios.get(`${url}/get/stock-flow${data}`, headers);
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

      const token = localStorage.getItem("token");
      const headers = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };

      let response;
      if (data) {
        response = await axios.get(`${url}/get/recipe${data}`, headers);
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

      const token = localStorage.getItem("token");
      const headers = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };

      await axios.patch(
        `${url}/change/recipe/${id}`,
        {recipes_status},
        headers
      );
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

      const token = localStorage.getItem("token");
      const headers = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };

      let response;
      if (data) {
        response = await axios.get(`${url}/get/payment-proof${data}`, headers);
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

      const token = localStorage.getItem("token");
      const headers = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };

      console.log(id);
      await axios.patch(
        `${url}/change/transaction?id=${id}`,
        {
          order_status_id,
          reason,
        },
        headers
      );
      if (order_status_id === 3) {
        await axios.post(
          `${api_url}/admin/create-report`,
          {
            invoice: id,
          },
          headers
        );
      }
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

      const token = localStorage.getItem("token");
      const headers = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };

      const response = await axios.get(`${url}/get/flow/${id}`, headers);
      dispatch({type: "FETCH_FLOW_SUCCESS", payload: response.data});
    } catch (err) {
      dispatch({type: "FETCH_DATA_FAILED", payload: err.message});
    }
  };
};

export const getItemLength = () => {
  return async (dispatch) => {
    try {
      dispatch({type: "FETCH_DATA_START"});

      const token = localStorage.getItem("token");
      const headers = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };

      const response = await axios.get(`${url}/get-all-length`, headers);
      dispatch({type: "FETCH_LENGTH_SUCCESS", payload: response.data});
    } catch (err) {
      dispatch({type: "FETCH_DATA_FAILED", payload: err.message});
    }
  };
};

export const getFinancialReports = (query) => {
  return async (dispatch) => {
    try {
      dispatch({type: "FETCH_DATA_START"});

      const token = localStorage.getItem("token");
      const headers = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };

      const response = await axios.get(
        `${url}/finance-report${query ? query : ""}`,
        headers
      );
      dispatch({type: "FETCH_FINREP_SUCCESS", payload: response.data});
    } catch (err) {
      dispatch({type: "FETCH_DATA_FAILED", payload: err.message});
    }
  };
};

export const fetchUserData = (query) => {
  return async (dispatch) => {
    try {
      dispatch({type: "FETCH_DATA_START"});

      const token = localStorage.getItem("token");
      const headers = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };

      if (query) {
        const response = await axios.get(
          `${url}/users-data${query ? query : ""}`,
          headers
        );
        console.log("MASUK");
        dispatch({type: "FETCH_USER_INFO_SUCCESS", payload: response.data});
      }
    } catch (err) {
      dispatch({type: "FETCH_DATA_FAILED", payload: err.message});
    }
  };
};

export const banUserAction = ({user_id}) => {
  return async (dispatch) => {
    try {
      dispatch({type: "FETCH_DATA_START"});

      const token = localStorage.getItem("token");
      const headers = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };

      await axios.patch(`${url}/ban-user`, {user_id}, headers);
      dispatch(fetchUserData());
    } catch (err) {
      dispatch({type: "FETCH_DATA_FAILED", payload: err.message});
    }
  };
};

export const changeNotifAdmin = (query) => {
  return async (dispatch) => {
    try {
      dispatch({type: "FETCH_DATA_START"});

      const token = localStorage.getItem("token");
      const headers = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };

      const {id, markAll} = query;
      if (id) {
        await axios.patch(
          `${url}/read-notif`,
          {admin_notif_status: 1, admin_notif_id: id},
          headers
        );
      } else if (markAll) {
        await axios.patch(
          `${url}/read-notif`,
          {admin_notif_status: 1, markAll},
          headers
        );
      } else {
        await axios.patch(
          `${url}/read-notif`,
          {admin_notif_status: 1},
          headers
        );
      }
      dispatch(fetchNotifAdmin(`?page=1&limit10`));
    } catch (err) {
      dispatch({type: "FETCH_DATA_FAILED", payload: err.message});
    }
  };
};
