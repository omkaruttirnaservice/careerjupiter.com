import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  iqTestId: null, // Default state
  isOpen: false,
};

const iqTestSlice = createSlice({
  name: "iqTest",
  initialState,
  reducers: {
    setIqTestId: (state, action) => {
      state.iqTestId = action.payload;
    },
    clearIqTestId: (state) => {
      state.iqTestId = null;
    },
    setIsOpen: (state, action) => {
      state.isOpen = action.payload;
    },
  },
});

// Export actions
export const { setIqTestId, clearIqTestId, setIsOpen } = iqTestSlice.actions;

// Export reducer
export default iqTestSlice.reducer;
