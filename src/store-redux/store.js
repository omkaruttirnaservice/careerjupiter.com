// src/store/store.js
import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./AuthSlice";
import testResultSlice from "./testResultSlice";
import educationSlice from "./educationSlice";
import iqTestSlice from "./iqTestSlice";

const store = configureStore({
  reducer: {
    auth: authReducer,
    testResult: testResultSlice,
    education: educationSlice,
    iqTest: iqTestSlice,
  },
});

export default store;
