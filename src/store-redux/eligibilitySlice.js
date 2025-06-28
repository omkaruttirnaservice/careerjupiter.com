// src/redux/eligibilitySlice.js
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  collegeList: [],
  searchParams: {},
  showOtpPopup: false,
    selectedCollegeId: null,
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
     openOtpPopup: (state, action) => {
      state.showOtpPopup = true;
      state.selectedCollegeId = action.payload; // collegeId
    },
    closeOtpPopup: (state) => {
      state.showOtpPopup = false;
      state.selectedCollegeId = null;
    },
  },
});

export const {
  setCollegeList,
  setSearchParams,
  resetEligibility,
  openOtpPopup, 
  closeOtpPopup,
} = eligibilitySlice.actions;

export default eligibilitySlice.reducer;
