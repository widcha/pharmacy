import "./App.css";
import React from "react";
import { Route } from "react-router";
import { SignUp, Verification } from "./pages";

function App() {
  return (
    <div className="App">
      <Route exact path="/signup" component={SignUp} />
      <Route exact path="/verification" component={Verification} />
    </div>
  );
}

export default App;
