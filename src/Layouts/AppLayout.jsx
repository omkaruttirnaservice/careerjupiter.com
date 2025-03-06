import Nav from './Nav';

import { Navigate, Outlet, useNavigate } from 'react-router-dom';
import Footer from '../components/Footer';
import SearchComponent from '../components/SearchComp/Search';
import SearchContextProvider from '../store/SearchContext';
import { useLayoutEffect } from 'react';
import { useSelector } from 'react-redux';

const AppLayout = () => {
	const authState = useSelector((state) => state.auth);

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
