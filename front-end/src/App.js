import "./App.css";
import React, { useEffect } from "react";
import { Route } from "react-router-dom";
import SideBar from './components/SideBar';
import {
  Login,
  SignUp,
  Verification,
  ForgotPassword,
  ChangePassword,
  HomeAdmin,
  ProductAdmin,
  CategoriesAdmin,
  RecipesAdmin,
  PaymentAdmin,
  ProductFlowAdmin,
} from "./pages";
import { useDispatch } from "react-redux";
import { nullifyErrorAction } from "./redux/actions";

function App() {
  const dispatch = useDispatch();

  const userRole = 1;
  useEffect(() => {
    dispatch(nullifyErrorAction());
  }, [dispatch]);

  return (<>
    {
      userRole ?
      (<div className="App">
        <Route path="/signup" component={SignUp} />
        <Route path="/verification" component={Verification} />
        <Route path="/login" component={Login} />
        <Route path="/forgot-password" component={ForgotPassword} />
        <Route path="/change-password" component={ChangePassword} />
      </div>)
      :
      (<div className="container">
        <div className="sidebar">
          <SideBar/>
        </div>
        <div style={{ overflowY: 'auto', marginLeft: '210px'}}>
          <Route path="/" exact component={HomeAdmin} />
          <Route path="/manage-product" component={ProductAdmin} />
          <Route path="/category" component={CategoriesAdmin} />
          <Route path="/recipe" component={RecipesAdmin} />
          <Route path="/payment-proof" component={PaymentAdmin} />
          <Route path="/product-flow" component={ProductFlowAdmin} />
        </div>
      </div>
      )
    }
    </>
  );
}

export default App;
