import { createSlice } from "@reduxjs/toolkit";

const watchListSlice = createSlice({
  name: "watchList",
  initialState: {
    watchList: [],
  },
  reducers: {
    addToList: (state, action) => {
      const jobExists = state.watchList.some(
        (item) => item._id === action.payload._id
      );
      if (!jobExists) {
        state.watchList.push(action.payload);
      }
    },
    removeFromList: (state, action) => {
      state.watchList = state.watchList.filter(
        (item) => item._id !== action.payload._id
      );
    },
  },
});

export const { addToList, removeFromList } = watchListSlice.actions;
export default watchListSlice.reducer;
