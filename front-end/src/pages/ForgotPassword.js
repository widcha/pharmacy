import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  securityQuestionAction,
  sendResetEmailAction,
  verifiedCheckAction,
} from "../redux/actions";
import spinner from "../assets/spinner/oval.svg";

const ForgotPassword = () => {
  const [form, setForm] = useState(true);
  const [email, setEmail] = useState("");
  const [answer, setAnswer] = useState("");
  const [verified, setVerified] = useState("");
  const [answerResponse, setAnswerResponse] = useState("");
  const [sent, setSent] = useState("");
  const dispatch = useDispatch();
  const url = "http://localhost:3000";
  const user = useSelector((state) => state.user);

  const changeForm = async () => {
    if (email.length === 0) {
      setVerified("Please insert your email");
    } else {
      const response = await dispatch(verifiedCheckAction({ email }));
      if (response === "User is verified") {
        setAnswerResponse("");
        setForm(!form);
      } else {
        setVerified(response);
      }
    }
  };

  const resetBtn = async () => {
    setVerified("");
    setSent("");
    if (email.length !== 0) {
      const response = await dispatch(verifiedCheckAction({ email }));
      if (
        response === "User is verified" ||
        response === "User is not verified"
      ) {
        await dispatch(sendResetEmailAction(email));
        setSent("Email sent!");
      } else {
        setVerified(response);
      }
    } else {
      setVerified("Please insert your email");
    }
  };

  const backBtn = () => {
    setVerified("");
    setForm(!form);
  };

  const continueBtn = async () => {
    setAnswerResponse("");
    const response = await dispatch(securityQuestionAction({ email, answer }));
    if (response.length > 20) {
      window.location.href = `${url}/change-password?token=${response}`;
    } else {
      setAnswerResponse(response);
    }
  };

  const sendEmail = () => {
    return (
      <div className="flex flex-col space-y-5">
        <p className="text-gray-600 font-semibold text-left text-sm">
          Enter the email address associated with your account and we'll send
          you a link to reset your password or if your account already verified,
          you can answer the security question to reset your password
        </p>
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
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            autofocus
            className="px-4 py-2 transition duration-300 border border-gray-300 rounded focus:border-transparent focus:outline-none focus:ring-4 focus:ring-blue-200"
          />
        </div>
        {user.loading ? (
          <button
            disabled="true"
            className="w-full px-72 py-2 cursor-not-allowed text-white transition-colors duration-300 bg-blue-400 rounded-md shadow hover:bg-blue-400 focus:outline-none focus:ring-blue-200 focus:ring-4"
          >
            <img src={spinner} alt="" className="w-7 h-7 object-center" />
          </button>
        ) : (
          <button
            onClick={resetBtn}
            className="w-full px-4 py-2 text-lg font-semibold text-white transition-colors duration-300 bg-blue-500 rounded-md shadow hover:bg-blue-600 focus:outline-none focus:ring-blue-200 focus:ring-4"
          >
            Reset Password
          </button>
        )}
        <div className="flex-row">
          <p className="text-green-500 italic font-semibold text-center">
            {sent}
          </p>
          <h4
            className="text-gray-600 font-semibold text-left text-sm cursor-pointer hover:text-blue-300 transition duration-300"
            onClick={changeForm}
          >
            Security Question
          </h4>
          <p className="text-red-500 italic font-semibold text-center">
            {verified}
          </p>
        </div>
      </div>
    );
  };

  const securityQuestion = () => {
    return (
      <div className="flex flex-col space-y-5">
        <div className="flex flex-col space-y-1">
          <label
            for="answer"
            className="text-sm font-semibold text-gray-500 self-start"
          >
            Security Question: What is your favorite animal?
          </label>
          <input
            type="text"
            id="answer"
            value={answer}
            onChange={(e) => setAnswer(e.target.value)}
            autofocus
            className="px-4 py-2 transition duration-300 border border-gray-300 rounded focus:border-transparent focus:outline-none focus:ring-4 focus:ring-blue-200"
          />
        </div>
        {user.loading ? (
          <button
            disabled="true"
            className="w-full px-72 py-2 cursor-not-allowed text-white transition-colors duration-300 bg-blue-400 rounded-md shadow hover:bg-blue-400 focus:outline-none focus:ring-blue-200 focus:ring-4"
          >
            <img src={spinner} alt="" className="w-7 h-7 object-center" />
          </button>
        ) : (
          <button
            type="submit"
            onClick={continueBtn}
            className="w-full px-4 py-2 text-lg font-semibold text-white transition-colors duration-300 bg-blue-500 rounded-md shadow hover:bg-blue-600 focus:outline-none focus:ring-blue-200 focus:ring-4"
          >
            Continue
          </button>
        )}

        <div>
          <p className="text-red-500 italic font-semibold text-center">
            {answerResponse}
          </p>
          <h2
            className="text-gray-600 font-semibold text-left text-md cursor-pointer hover:text-blue-300 transition duration-300"
            onClick={backBtn}
          >
            Back
          </h2>
        </div>
      </div>
    );
  };

  return (
    <div className="flex items-center min-h-screen p-4 bg-gray-100 lg:justify-center">
      <div className="flex flex-col overflow-hidden bg-white rounded-md shadow-lg max md:flex-row md:flex-1 lg:max-w-screen-sm">
        <div className="p-5 bg-white md:flex-1">
          <h5 className="mb-4 text-xl font-semibold text-gray-700 text-left">
            Forgot Password
          </h5>
          {form ? sendEmail() : securityQuestion()}
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;
