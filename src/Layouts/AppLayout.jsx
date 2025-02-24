import Nav from "./Nav";

import { Outlet } from "react-router-dom";
import Footer from "../components/Footer";
import SearchComponent from "../components/SearchComp/Search";
import SearchContextProvider from "../store/SearchContext";

const AppLayout = () => {
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
