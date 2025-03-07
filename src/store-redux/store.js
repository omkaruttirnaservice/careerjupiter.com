// src/store/store.js
import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./AuthSlice";
import testResultSlice from "./testResultSlice";

const store = configureStore({
  reducer: {
    auth: authReducer,
    testResult: testResultSlice,
  },
});

export default store;
