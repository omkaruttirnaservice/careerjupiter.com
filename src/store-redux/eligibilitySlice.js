// src/redux/eligibilitySlice.js
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  collegeList: [],
  searchParams: {},
};

const eligibilitySlice = createSlice({
  name: "eligibility",
  initialState,
  reducers: {
    setCollegeList: (state, action) => {
      state.collegeList = action.payload;
    },
    setSearchParams: (state, action) => {
      state.searchParams = action.payload;
    },
    resetEligibility: () => initialState,
  },
});

export const {
  setCollegeList,
  setSearchParams,
  resetEligibility,
} = eligibilitySlice.actions;

export default eligibilitySlice.reducer;
