import "./App.css";
import React, { useEffect } from "react";
import { Route } from "react-router";
import {
  Login,
  SignUp,
  Verification,
  ForgotPassword,
  ChangePassword,
} from "./pages";
import { useDispatch } from "react-redux";
import { nullifyErrorAction } from "./redux/actions";

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(nullifyErrorAction());
  }, [dispatch]);

  return (
    <div className="App">
      <Route exact path="/signup" component={SignUp} />
      <Route exact path="/verification" component={Verification} />
      <Route exact path="/login" component={Login} />
      <Route exact path="/forgot-password" component={ForgotPassword} />
      <Route exact path="/change-password" component={ChangePassword} />
    </div>
  );
}

export default App;
