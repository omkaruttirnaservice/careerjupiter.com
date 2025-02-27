import Cookie from 'js-cookie';
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
		logout: (state) => {
			state.isLoggedIn = false;
			state.userData = null;
		},
	},
});

export const { login, logout } = authSlice.actions;
export default authSlice.reducer;
