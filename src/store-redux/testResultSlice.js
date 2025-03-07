import { createSlice } from "@reduxjs/toolkit";

const testResultSlice = createSlice({
  name: "testResult",
  initialState: {
    resultData: null,
  },
  reducers: {
    setTestResult: (state, action) => {
      state.resultData = action.payload;
    },
  },
});

export const { setTestResult } = testResultSlice.actions;
export default testResultSlice.reducer;
