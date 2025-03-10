import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  currentEducation: null, // Default state
};

const educationSlice = createSlice({
  name: "education",
  initialState,
  reducers: {
    setCurrentEducation: (state, action) => {
      state.currentEducation = action.payload;
    },
  },
});

export const { setCurrentEducation } = educationSlice.actions;
export default educationSlice.reducer;
