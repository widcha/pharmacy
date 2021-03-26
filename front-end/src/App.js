import "./App.css";
import React, {useEffect} from "react";
import {Route} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {nullifyErrorAction} from "./redux/actions";
import SideBar from "./components/SideBar";
import {Nav} from "./components/Navbar";
import {NavAdmin} from "./components/NavbarAdmin";
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
  ProductDetail,
  Landing,
  CustomOrder,
  Cart,
  ProductFlowDetail,
  CheckOut,
  CustomAdmin,
  Transaction,
  NotificationAdmin,
  TransactionAdmin,
} from "./pages";
import {ToastContainer, Zoom} from "react-toastify";

function App() {
  const dispatch = useDispatch();
  const {user_role_id} = useSelector((state) => state.user);

  useEffect(() => {
    dispatch(nullifyErrorAction());
  }, [dispatch]);

  if (user_role_id === 1) {
    return (
      <div className="container">
        <ToastContainer
          position="bottom-right"
          autoClose={2000}
          hideProgressBar
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          transition={Zoom}
          limit={3}
        />
        <div className="nav">
          <NavAdmin />
        </div>
        <div className="sidebar" style={{marginTop: "56px"}}>
          <SideBar />
        </div>
        <div
          style={{overflowY: "auto", marginLeft: "210px", marginTop: "45px"}}
        >
          <Route path="/" exact component={HomeAdmin} />
          <Route path="/product" component={ProductAdmin} />
          <Route path="/category" component={CategoriesAdmin} />
          <Route path="/recipe" component={RecipesAdmin} />
          <Route path="/payment-proof" component={PaymentAdmin} />
          <Route path="/product-flow" component={ProductFlowAdmin} />
          <Route path="/product-flow-detail" component={ProductFlowDetail} />
          <Route exact path="/custom-order" component={CustomAdmin} />
          <Route exact path="/transaction" component={TransactionAdmin} />
          <Route exact path="/notifs" component={NotificationAdmin} />
        </div>
      </div>
    );
  } else {
    return (
      <div>
        <ToastContainer
          position="bottom-right"
          autoClose={2000}
          hideProgressBar
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          transition={Zoom}
          limit={3}
        />
        <Nav />
        <Route exact path="/" component={Landing} />
        <Route exact path="/signup" component={SignUp} />
        <Route exact path="/verification" component={Verification} />
        <Route exact path="/login" component={Login} />
        <Route exact path="/forgot-password" component={ForgotPassword} />
        <Route exact path="/change-password" component={ChangePassword} />
        <Route exact path="/product" component={Products} />
        <Route exact path="/product/detail" component={ProductDetail} />
        <Route exact path="/user/address" component={UserAddress} />
        <Route exact path="/custom-order" component={CustomOrder} />
        <Route exact path="/user/cart" component={Cart} />
        <Route exact path="/user/payment/checkout" component={CheckOut} />
        <Route exact path="/user/transaction" component={Transaction} />
      </div>
    );
  }
}

export default App;
