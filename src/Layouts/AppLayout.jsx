import Nav from './Nav';

import { Outlet, useNavigate } from 'react-router-dom';
import Footer from '../components/Footer';
import SearchComponent from '../components/SearchComp/Search';
import SearchContextProvider from '../store/SearchContext';
import { useLayoutEffect } from 'react';
import { useSelector } from 'react-redux';

const AppLayout = () => {
	const authState = useSelector((state) => state.auth);
	const navigate = useNavigate();
	console.log(authState,'-authState')

	useLayoutEffect(() => {
		if (!authState.isLoggedIn) {
			navigate('/signin');
		}
	}, []);

	return (
		<>
			<SearchContextProvider>
				<Nav />
				<SearchComponent />
				<Outlet />
				<Footer />
			</SearchContextProvider>
		</>
	);
};

export default AppLayout;
