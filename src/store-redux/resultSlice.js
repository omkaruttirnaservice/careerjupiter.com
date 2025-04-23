import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  resultsId: null,
};

const resultSlice = createSlice({
  name: "result",
  initialState,
  reducers: {
    setResultsId: (state, action) => {

      state.resultsId = action.payload;
    },
    clearResultId: (state) => {
      state.resultsId = null;
    },
  },
});

export const { setResultsId, clearResultId } = resultSlice.actions;
export default resultSlice.reducer;
