import axios from "axios";
import { api_url } from "../../helpers";

const url = api_url + "/user";

// LOGIN ACTION
export const loginAction = (data) => {
  console.log("masuk login");
  return async (dispatch) => {
    dispatch({ type: "API_USER_START" });
    try {
      const response = await axios.post(`${url}/login`, data);
      const {
        user_id,
        user_email,
        user_username,
        user_role_id,
        user_isverified,
      } = response.data;
      dispatch({
        type: "LOGIN",
        payload: {
          user_id,
          user_email,
          user_username,
          user_role_id,
          user_isverified,
        },
      });
      dispatch({ type: "API_USER_SUCCESS" });
    } catch (err) {
      console.log(err);
      dispatch({ type: "API_USER_FAILED", payload: err.response.data.message });
    }
  };
};

// REGISTER ACTION
export const registerAction = (data) => {
  return async (dispatch) => {
    dispatch({ type: "API_USER_START" });
    try {
      await axios.post(`${url}/signup`, data);
      dispatch(loginAction(data));
    } catch (err) {
      console.log(err);
      dispatch({
        type: "API_USER_FAILED",
        payload: err.response.data.message,
      });
    }
  };
};

// VERIFICATION EMAIL ACTION
export const verificationAction = (token) => {
  return async (dispatch) => {
    await axios.post(`${url}/verification`, { token: token });
  };
};

// NULLIFY ERROR ACTION
export const nullifyErrorAction = () => {
  return async (dispatch) => {
    dispatch({ type: "NULLIFY_ERROR" });
  };
};