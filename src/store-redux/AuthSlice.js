// src/store/authSlice.js
import { createSlice } from '@reduxjs/toolkit';

function getCookie(name) {
  const cookies = document.cookie.split('; ');
  for (let cookie of cookies) {
    const [key, value] = cookie.split('=');
    if (key === name) {
      try {
        return JSON.parse(decodeURIComponent(value));
      } catch (error) {
        console.error('Error parsing cookie:', error);
      }
    }
  }
  return null;
}

function _isLoggedIn() {
  const userData = getCookie('userData'); // कूकीतून डेटा मिळवा
  return userData?.token ? true : false; // टोकन असल्यास लॉगिन मानू
}

const authSlice = createSlice({
  name: 'auth',
  initialState: {
    isLoggedIn: _isLoggedIn(),
    userData: getCookie('userData'), // userData कूकीतून मिळवा
  },
  reducers: {
    login: (state, action) => {
      state.isLoggedIn = true;
      state.userData = action.payload;

      // कूकीत डेटा स्टोअर करा
      document.cookie = `userData=${encodeURIComponent(
        JSON.stringify(action.payload)
      )}; path=/; max-age=3600`;
    },
    logout: (state) => {
      state.isLoggedIn = false;
      state.userData = null;

      // कूकी डिलीट करा
      document.cookie = 'userData=; path=/; expires=Thu, 01 Jan 1970 00:00:00 UTC';
    },
  },
});

export const { login, logout } = authSlice.actions;
export default authSlice.reducer;
