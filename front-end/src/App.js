import "./App.css";
import React, { useEffect } from "react";
import { Route } from "react-router-dom";
import {
  Login,
  SignUp,
  Verification,
  ForgotPassword,
  ChangePassword,
} from "./pages";
import { useDispatch } from "react-redux";
import { nullifyErrorAction } from "./redux/actions";
import { Nav } from "./components";

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(nullifyErrorAction());
  }, [dispatch]);

  return (
    <div className="App">
      <Nav />
      <Route exact path="/signup" component={SignUp} />
      <Route exact path="/verification" component={Verification} />
      <Route exact path="/login" component={Login} />
      <Route exact path="/forgot-password" component={ForgotPassword} />
      <Route exact path="/change-password" component={ChangePassword} />
    </div>
  );
}

export default App;
