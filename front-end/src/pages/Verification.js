import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Redirect } from "react-router";
import { verificationAction } from "../redux/actions";

const Verification = (props) => {
  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();

  useEffect(() => {
    const token = props.location.search.split("=").pop();
    dispatch(verificationAction(token));
    console.log(token);
  }, [props, dispatch]);

  if (user.user_isverified === 1 || user.user_id === 0) {
    return <Redirect to="/" />;
  }
  return (
    <div>
      <h2>Thank You!</h2>
    </div>
  );
};

export default Verification;
