import { configureStore } from "@reduxjs/toolkit";
import thunk from "redux-thunk";
import logger from "redux-logger";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";

import rootReducer from ".";
const persistConfig = {
	key: "root",
	storage,
	whitelist: ["user", "cart", "customOrder", "product"],
};
const persistedReducer = persistReducer(persistConfig, rootReducer);
export const store = configureStore({
	reducer: persistedReducer,
	middleware: [thunk, logger],
});
export const persistor = persistStore(store);
