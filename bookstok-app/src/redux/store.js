import { configureStore } from "@reduxjs/toolkit";
import userSlice from "./userSlice";
import boardSlice from "./boardSlice";

const store = configureStore({
  reducer: {
    userStore: userSlice.reducer,
    boardStore: boardSlice.reducer
  }
});

export default store;