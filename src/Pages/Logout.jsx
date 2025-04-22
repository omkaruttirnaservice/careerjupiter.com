import Cookies from 'js-cookie';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';
import { logout } from '../store-redux/AuthSlice.js';

function Logout() {
	const dispatch = useDispatch();
	const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);

	useEffect(() => {
		Cookies.remove('token');
		Cookies.remove('userId');

		dispatch(logout());
		window.location.reload();
	}, [isLoggedIn]);

	return <>{!isLoggedIn && <Navigate to="/" replace />}</>;
}

export default Logout;
