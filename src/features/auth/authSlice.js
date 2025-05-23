// import { createSlice } from '@reduxjs/toolkit';

// const initialState = {
// 	user: localStorage.getItem('user') ? localStorage.getItem('user') : null,
// 	token: localStorage.getItem('token') || null,
// };

// const authSlice = createSlice({
// 	name: 'auth',
// 	initialState,
// 	reducers: {
// 		login: (state, action) => {
// 			state.user = action.payload.user;
// 			state.token = action.payload.token;

// 			// ✅ Store in Local Storage
// 			localStorage.setItem('user', JSON.stringify(action.payload.user));
// 			localStorage.setItem('token', action.payload.token);
// 		},

// 		logout: (state) => {
// 			state.user = null;
// 			state.token = null;

// 			// ✅ Remove from Local Storage
// 			localStorage.removeItem('user');
// 			localStorage.removeItem('token');
// 		},
// 	},
// });

// export const { login, logout } = authSlice.actions;
// export default authSlice.reducer;
