// src/store/store.js
import { configureStore } from '@reduxjs/toolkit';
import authReducer from './AuthSlice';
import testResultSlice from './testResultSlice';
import educationSlice from './educationSlice';

const store = configureStore({
  reducer: {
    auth: authReducer,
    testResult: testResultSlice,
    education: educationSlice,
  },
});

export default store;
