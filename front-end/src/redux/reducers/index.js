import {userReducer} from "./userReducer";
import {cartReducer} from "./cartReducer";
import {productReducer} from "./productReducer";
import {transactionReducer} from "./transactionReducer";
import {combineReducers} from "@reduxjs/toolkit";
import {adminReducer} from "./adminReducer";
import {customOrderReducer} from "./customOrderReducer";

export default combineReducers({
  user: userReducer,
  cart: cartReducer,
  product: productReducer,
  transaction: transactionReducer,
  admin: adminReducer,
  customOrder: customOrderReducer,
});
