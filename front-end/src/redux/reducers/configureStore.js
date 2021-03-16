import { configureStore } from "@reduxjs/toolkit";
// import { createStore } from "redux";
import thunk from "redux-thunk";
import logger from "redux-logger";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";

// KEEP LOGIN USING REDUX PERSIST
import rootReducer from ".";
const persistConfig = {
  key: "root",
  storage,
  whitelist: ["user"],
};
const persistedReducer = persistReducer(persistConfig, rootReducer);
export const store = configureStore({
  reducer: persistedReducer,
  middleware: [thunk, logger],
});
export const persistor = persistStore(store);
