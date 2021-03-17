import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { Redirect } from "react-router";
import { changePasswordAction } from "../redux/actions";

const ChangePassword = (props) => {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [condition, setCondition] = useState("");
  const [token, setToken] = useState("");
  const [status, setStatus] = useState("");
  const [passwordShown, setPasswordShown] = useState(false);

  const dispatch = useDispatch();

  useEffect(() => {
    if (props.location.search.length !== 0) {
      setToken(props.location.search.split("=").pop());
    }
  }, [props]);

  const changeBtn = async () => {
    setStatus("");
    if (password === confirmPassword) {
      const response = await dispatch(
        changePasswordAction({ token, password })
      );
      setCondition(response);
    } else {
      setStatus("Password & confirm password doesn't match");
    }
  };

  const togglePasswordVisibility = () => {
    setPasswordShown(!passwordShown);
  };

  if (props.location.search.length === 0) {
    return <Redirect to="/" />;
  }
  if (condition.length !== 0) {
    return <Redirect to="/login" />;
  }
  return (
    <div className="flex items-center min-h-screen p-4 bg-gray-100 lg:justify-center">
      <div className="flex flex-col overflow-hidden bg-white rounded-md shadow-lg max md:flex-row md:flex-1 lg:max-w-screen-sm">
        <div className="p-5 bg-white md:flex-1">
          <h5 className="my-4 text-xl font-semibold text-gray-700 text-left">
            Change Password
          </h5>
          <p className="text-gray-600 font-semibold text-left text-sm pb-3">
            Password must have 6 or more characters and contain 1 number and 1
            special character
          </p>
          <div className="flex flex-col space-y-5">
            <div className="flex flex-col space-y-1">
              <label
                for="password"
                className="text-sm font-semibold text-gray-500 self-start"
              >
                New Password
              </label>
              <input
                type={passwordShown ? "text" : "password"}
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                autofocus
                className="px-4 py-2 transition duration-300 border border-gray-300 rounded focus:border-transparent focus:outline-none focus:ring-4 focus:ring-blue-200"
              />
            </div>
            <div className="flex items-center space-x-2">
              <input
                type="checkbox"
                id="remember"
                onClick={togglePasswordVisibility}
                className="w-4 h-4 transition duration-300 rounded focus:ring-2 focus:ring-offset-0 focus:outline-none focus:ring-blue-200"
              />
              <label
                for="remember"
                className="text-sm font-semibold text-gray-500"
              >
                Show password
              </label>
            </div>
            <div className="flex flex-col space-y-1">
              <label
                for="answer"
                className="text-sm font-semibold text-gray-500 self-start"
              >
                Confirm New Password
              </label>
              <input
                type="password"
                id="confirmPassword"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                autofocus
                className="px-4 py-2 transition duration-300 border border-gray-300 rounded focus:border-transparent focus:outline-none focus:ring-4 focus:ring-blue-200"
              />
            </div>
            <button
              onClick={changeBtn}
              className="w-full px-4 py-2 text-lg font-semibold text-white transition-colors duration-300 bg-blue-500 rounded-md shadow hover:bg-blue-600 focus:outline-none focus:ring-blue-200 focus:ring-4"
            >
              Set Password
            </button>
            <p className="text-red-500 italic">{status}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChangePassword;
