import "./App.css";
import React from "react";
import { Route } from "react-router";
import { Login, SignUp, Verification } from "./pages";

function App() {
  return (
    <div className="App">
      <Route exact path="/signup" component={SignUp} />
      <Route exact path="/verification" component={Verification} />
      <Route exact path="/login" component={Login} />
    </div>
  );
}

export default App;
