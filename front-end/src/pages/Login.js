import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, Redirect } from "react-router-dom";
import { nullifyErrorAction, loginAction } from "../redux/actions";

// EMAIL DAN PASSWORD
let userData = {
  email: "",
  password: "",
};

const Login = () => {
  const [passwordShown, setPasswordShown] = useState(false);
  const [userInput, setUserInput] = useState(userData);
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);

  useEffect(() => {
    return () => {
      dispatch(nullifyErrorAction());
    };
  }, [dispatch]);

  const togglePasswordVisibility = () => {
    setPasswordShown(!passwordShown);
  };

  const handleInput = (e) => {
    const { id, value } = e.target;
    setUserInput((prevState) => ({
      ...prevState,
      [id]: value,
    }));
  };

  const loginForm = () => {
    return (
      <form action="#" className="flex flex-col space-y-5">
        <div className="flex flex-col space-y-1">
          <label
            for="email"
            className="text-sm font-semibold text-gray-500 self-start"
          >
            Email address
          </label>
          <input
            type="email"
            id="email"
            value={userInput.email}
            onChange={handleInput}
            autofocus
            className="px-4 py-2 transition duration-300 border border-gray-300 rounded focus:border-transparent focus:outline-none focus:ring-4 focus:ring-blue-200"
          />
        </div>
        <div className="flex flex-col space-y-1">
          <div className="flex items-center justify-between">
            <label
              for="password"
              className="text-sm font-semibold text-gray-500"
            >
              Password
            </label>
            <Link>
              <p className="text-sm text-blue-600 hover:underline focus:text-blue-800">
                Forgot Password?
              </p>
            </Link>
          </div>
          <input
            type={passwordShown ? "text" : "password"}
            id="password"
            value={userInput.password}
            onChange={handleInput}
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
          <label for="remember" className="text-sm font-semibold text-gray-500">
            Show password
          </label>
        </div>
        <div>
          <button
            type="submit"
            onClick={() => dispatch(loginAction(userInput))}
            className="w-full px-4 py-2 text-lg font-semibold text-white transition-colors duration-300 bg-blue-500 rounded-md shadow hover:bg-blue-600 focus:outline-none focus:ring-blue-200 focus:ring-4"
          >
            Log in
          </button>
          // ERROR MESSAGE WILL APPEAR HERE
          <p className="text-red-500 pt-2 italic">{user.error}</p>
        </div>
      </form>
    );
  };

  if (user.user_id !== 0) {
    return <Redirect to="/" />;
  }
  return (
    <div className="flex items-center min-h-screen p-4 bg-gray-100 lg:justify-center">
      <div className="flex flex-col overflow-hidden bg-white rounded-md shadow-lg max md:flex-row md:flex-1 lg:max-w-screen-md">
        <div className="p-4 py-6 text-white bg-blue-500 md:w-80 md:flex-shrink-0 md:flex md:flex-col md:items-center md:justify-evenly">
          <div className="my-3 text-4xl font-bold tracking-wider text-center">
            <Link to="/">
              <p>Pharma</p>
            </Link>
          </div>
          <p className="mt-6 font-normal text-center text-gray-300 md:mt-0">
            Pharma offers products and services to help you lead a healthy,
            happy life. Visit our online pharmacy, shop now, or find a store
            near you.
          </p>
          <p className="flex flex-col items-center justify-center mt-10 text-center">
            <span>Doesn't have an account??</span>
            <Link to="/signup">
              <p className="underline cursor-pointer">Register!</p>
            </Link>
          </p>
          <p className="mt-6 text-sm text-center text-gray-300">
            Read our{" "}
            <a href="localhost:3000" className="underline">
              terms
            </a>{" "}
            and{" "}
            <a href="localhost:3000" className="underline">
              conditions
            </a>
          </p>
        </div>
        <div className="p-5 bg-white md:flex-1">
          <h3 className="my-4 text-2xl font-semibold text-gray-700 text-left">
            Login
          </h3>
          {loginForm()}
        </div>
      </div>
    </div>
  );
};

export default Login;
