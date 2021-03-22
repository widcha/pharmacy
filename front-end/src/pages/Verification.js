import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { verificationAction } from "../redux/actions";

const Verification = (props) => {
  const dispatch = useDispatch();

  useEffect(() => {
    const token = props.location.search.split("=").pop();
    dispatch(verificationAction(token));
  }, [props, dispatch]);

  return (
    <div className="flex flex-col justify-items-center justify-center items-center h-screen space-y-3">
      <img
        src="https://img.icons8.com/clouds/100/000000/handshake.png"
        alt="handshake.png"
        className="h-30 w-30"
      />
      <h2 className="font-semibold text-gray-600 text-2xl">
        Your account has been verified. Thank you!
      </h2>
      <div className="flex">
        <a href="/" className="font-semibold text-gray-600 underline">
          Go to Home
        </a>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          className="mt-1 mx-2 h-5 w-5 text-gray-600"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M17 8l4 4m0 0l-4 4m4-4H3"
          />
        </svg>
      </div>
    </div>
  );
};

export default Verification;
