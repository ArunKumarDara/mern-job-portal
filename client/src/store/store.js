import { combineReducers, configureStore } from "@reduxjs/toolkit";
import usersReducer from "./userSlice";
import loaderReducer from "./loaderSlice";
import watchListReducer from "./watchListSlice";
import { persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";

const persistConfig = {
  key: "root",
  version: 1,
  storage,
};

const rootReducer = combineReducers({
  users: usersReducer,
  loader: loaderReducer,
  watchList: watchListReducer,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

const store = configureStore({
  reducer: persistedReducer,
});

export default store;
