import "./App.css";
import React, { useEffect } from "react";
import { Route } from "react-router-dom";
import { useDispatch } from "react-redux";
import { nullifyErrorAction } from "./redux/actions";
import SideBar from "./components/SideBar";
import {
  HomeAdmin,
  ProductAdmin,
  CategoriesAdmin,
  RecipesAdmin,
  PaymentAdmin,
  ProductFlowAdmin,
  Login,
  SignUp,
  Verification,
  ForgotPassword,
  ChangePassword,
} from "./pages";
import { useDispatch } from "react-redux";
import { nullifyErrorAction } from "./redux/actions";
import { Nav } from "./components";

const App = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(nullifyErrorAction());
  }, [dispatch]);
  return (
    <div className="container">
      <div className="sidebar">
        <SideBar />
      </div>
      <div style={{ overflowY: "auto", marginLeft: "210px" }}>
        <Route path="/" exact component={HomeAdmin} />
        <Route path="/manage-product" component={ProductAdmin} />
        <Route path="/category" component={CategoriesAdmin} />
        <Route path="/recipe" component={RecipesAdmin} />
        <Route path="/payment-proof" component={PaymentAdmin} />
        <Route path="/product-flow" component={ProductFlowAdmin} />
        <Route exact path="/signup" component={SignUp} />
        <Route exact path="/verification" component={Verification} />
        <Route exact path="/login" component={Login} />
        <Route exact path="/forgot-password" component={ForgotPassword} />
        <Route exact path="/change-password" component={ChangePassword} />
      </div>
    </div>
  );
};

export default App;
