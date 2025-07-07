import Cookie from "js-cookie";
// src/store/authSlice.js
import { createSlice } from "@reduxjs/toolkit";

function _isLoggedIn() {
  const _token = Cookie.get("token");
  const _userId = Cookie.get("userId");
  if (!_token || !_userId) return false;

  console.log("User Id from cookie",_userId);

  return true;
}

// const authSlice = createSlice({
//   name: "auth",
//   initialState: {
//     isLoggedIn: _isLoggedIn(),
//     userId: Cookie.get("userId") || null,
//   },
//   reducers: {
//     login: (state, action) => {
//       state.isLoggedIn = true;
//       state.userId = action.payload;
//     },
//     logout: (state, action) => {
//       state.isLoggedIn = false;
//       state.userData = null;
//     },
//     updateUserId: (state, action) => {
//       state.userId = action.payload;
//     },
//   },
// });

const authSlice = createSlice({
  name: "auth",
  initialState: {
    isLoggedIn: _isLoggedIn(),
    userId: Cookie.get("userId") || null,
    userData: null, // ✅ NEW
  },
  reducers: {
    login: (state, action) => {
      state.isLoggedIn = true;
      state.userId = action.payload?.userId || null;
      state.userData = action.payload?.userData || null; // ✅ NEW
    },
    logout: (state) => {
      state.isLoggedIn = false;
      state.userId = null;
      state.userData = null;
    },
    updateUserId: (state, action) => {
      state.userId = action.payload;
    },
    setUserData: (state, action) => { // ✅ NEW
      state.userData = action.payload;
    },
  },
});


export const { login,updateUserId, logout, setUserData } = authSlice.actions;
export default authSlice.reducer;
