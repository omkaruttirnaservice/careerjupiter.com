import Nav from './Nav';

import { Navigate, Outlet, useNavigate } from 'react-router-dom';
import Footer from '../components/Footer';
import SearchComponent from '../components/SearchComp/Search';
import SearchContextProvider from '../store/SearchContext';
import { useLayoutEffect } from 'react';
import { useSelector } from 'react-redux';

const AppLayout = () => {
	const authState = useSelector((state) => state.auth);
<<<<<<< HEAD
	const navigate = useNavigate();
	console.log(authState,'-authState')

	useLayoutEffect(() => {
		if (!authState.isLoggedIn) {
			navigate('/signin');
		}
	}, []);
=======
>>>>>>> 4b6f12d5226801d729676450730f6cff33a3c491

	return (
		<>
			{authState.isLoggedIn ? (
				<SearchContextProvider>
					<Nav />
					<SearchComponent />
					<Outlet />
					<Footer />
				</SearchContextProvider>
			) : (
				<Navigate to="/signin" replace />
			)}
		</>
	);
};

export default AppLayout;
