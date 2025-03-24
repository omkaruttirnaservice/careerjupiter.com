import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  iqTestId: null, // Default state
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
  },
});

// Export actions
export const { setIqTestId, clearIqTestId } = iqTestSlice.actions;

// Export reducer
export default iqTestSlice.reducer;
