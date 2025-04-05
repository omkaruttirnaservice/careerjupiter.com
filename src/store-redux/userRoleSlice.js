import { createSlice } from "@reduxjs/toolkit";

// Define initial state
const initialState = {
  userRole: null, // Default state is null
};

// Create auth slice
const userRoleSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setUserRole: (state, action) => {
      state.userRole = action.payload; // Update userRole globally
    },
    clearUserRole: (state) => {
      state.userRole = null; // Clear userRole on logout
    },
  },
});

// Export actions
export const { setUserRole, clearUserRole } = userRoleSlice.actions;

// Export reducer
export default userRoleSlice.reducer;
