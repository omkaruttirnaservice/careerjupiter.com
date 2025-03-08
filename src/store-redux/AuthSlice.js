import Cookie from 'js-cookie';
// src/store/authSlice.js
import { createSlice } from '@reduxjs/toolkit';

function _isLoggedIn() {
	const _token = Cookie.get('token');
	const _userId = Cookie.get('userId');
	if (!_token || !_userId) return false;

	return true;
}

const authSlice = createSlice({
	name: 'auth',
	initialState: {
		isLoggedIn: _isLoggedIn(),
		userId: Cookie.get('userId') || null,
	},
	reducers: {
		login: (state, action) => {
			state.isLoggedIn = true;
			state.userId = action.payload;
		},
		logout: (state, action) => {
			state.isLoggedIn = false;
			state.userData = null;
		},
	},
});

export const { login, logout } = authSlice.actions;
export default authSlice.reducer;
