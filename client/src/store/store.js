import { configureStore } from "@reduxjs/toolkit";
import usersReducer from "./userSlice";
import loaderReducer from "./loaderSlice";
import watchListReducer from "./watchListSlice";

const store = configureStore({
  reducer: {
    users: usersReducer,
    loader: loaderReducer,
    watchList: watchListReducer,
  },
});

export default store;
