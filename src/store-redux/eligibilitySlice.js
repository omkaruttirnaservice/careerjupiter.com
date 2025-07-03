// src/redux/eligibilitySlice.js
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  collegeList: [],
  searchParams: {},
  showOtpPopup: false,
    selectedCollegeId: null,
     showWhatsAppPopup: false,
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
    showPopup: (state) => {
      state.showWhatsAppPopup = true;
    },
    hidePopup: (state) => {
      state.showWhatsAppPopup = false;
    },
  },
});

export const {
  setCollegeList,
  setSearchParams,
  resetEligibility,
  openOtpPopup, 
  closeOtpPopup,
    showPopup,       // ✅ newly added in export
  hidePopup,       // ✅ newly added in export
} = eligibilitySlice.actions;

export default eligibilitySlice.reducer;
