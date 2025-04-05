// src/store/store.js
import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./AuthSlice";
import testResultSlice from "./testResultSlice";
import educationSlice from "./educationSlice";
import iqTestSlice from "./iqTestSlice";
import userRoleSlice from "./userRoleSlice";

const store = configureStore({
  reducer: {
    auth: authReducer,
    testResult: testResultSlice,
    education: educationSlice,
    iqTest: iqTestSlice,
    userRole: userRoleSlice,
  },
});

export default store;
