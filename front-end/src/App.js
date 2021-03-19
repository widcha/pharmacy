import "./App.css";
import React, { useEffect } from "react";
import { Route } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { nullifyErrorAction } from "./redux/actions";
import SideBar from "./components/SideBar";
import { Nav } from "./components/Navbar";
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
  Products,
  UserAddress,
  Landing,
} from "./pages";
// import { useDispatch } from "react-redux";
// import { nullifyErrorAction } from "./redux/actions";

function App() {
  const dispatch = useDispatch();
  const { user_role_id } = useSelector((state) => state.user);

  useEffect(() => {
    dispatch(nullifyErrorAction());
  }, [dispatch]);

  if (user_role_id === 1) {
    return (
      <div className="container">
        <div className="sidebar">
          <SideBar />
        </div>
        <div style={{ overflowY: "auto", marginLeft: "210px" }}>
          <Route path="/" exact component={HomeAdmin} />
          <Route path="/product" component={ProductAdmin} />
          <Route path="/category" component={CategoriesAdmin} />
          <Route path="/recipe" component={RecipesAdmin} />
          <Route path="/payment-proof" component={PaymentAdmin} />
          <Route path="/product-flow" component={ProductFlowAdmin} />
        </div>
      </div>
    );
  } else {
    return (
      <div>
        <Nav />
        <Route exact path="/" component={Landing} />
        <Route exact path="/signup" component={SignUp} />
        <Route exact path="/verification" component={Verification} />
        <Route exact path="/login" component={Login} />
        <Route exact path="/forgot-password" component={ForgotPassword} />
        <Route exact path="/change-password" component={ChangePassword} />
        <Route exact path="/product" component={Products} />
        <Route exact path="/user/address" component={UserAddress} />
      </div>
    );
  }
}

export default App;
