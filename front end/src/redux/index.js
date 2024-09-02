import { configureStore } from "@reduxjs/toolkit";
import { combineReducers } from "redux";
import storage from "redux-persist/lib/storage";
import { persistReducer } from "redux-persist";

import loadingReducers from "./loadingSlice";
import productReducers from "./productSlice";
import userReducers from "./userSlice";

const persistConfig = {
	key: "root",
	storage,
};

const reducers = combineReducers({
	loadingData: loadingReducers,
	products: productReducers,
	user: userReducers,
});

const persistedReducer = persistReducer(persistConfig, reducers);

const store = configureStore({
	reducer: persistedReducer,
	devTools: process.env.NODE_ENV !== "production",
});

export default store;
