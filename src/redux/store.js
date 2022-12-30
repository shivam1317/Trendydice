import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./slice/userSlice";
// creating a store
const store = configureStore({
  // This is the same thing which we did in combining reducers
  reducer: {
    user: userReducer,
  },
});
export default store;
