import { configureStore } from "@reduxjs/toolkit";
import personalDetailsReducer from "./Reducer/personalDetail";

export const store = configureStore({
  reducer: {
    personalDetails: personalDetailsReducer,
  },
});
