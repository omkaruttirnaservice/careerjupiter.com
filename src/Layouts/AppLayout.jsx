import { useEffect } from "react";
import { Outlet, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";
import Nav from "./Nav";
import Footer from "../components/Footer";
import SearchComponent from "../components/SearchComp/Search";
import SearchContextProvider from "../store/SearchContext";
import Flotingbutton from './Flotingbutton';

const ScrollToTop = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "instant" });
  }, [pathname]);

  return null;
};

const AppLayout = () => {
  const authState = useSelector((state) => state.auth);

  return (
    <>
      <SearchContextProvider>
        <Nav />
        <SearchComponent />
        <Flotingbutton/>
        <Outlet />
        <Footer />
      </SearchContextProvider>
    </>
  );
};

export default AppLayout;
