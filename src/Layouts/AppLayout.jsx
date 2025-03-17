// import Nav from "./Nav";

// import { Navigate, Outlet, useNavigate } from "react-router-dom";
// import Footer from "../components/Footer";
// import SearchComponent from "../components/SearchComp/Search";
// import SearchContextProvider from "../store/SearchContext";
// import { useEffect, useLayoutEffect } from "react";
// import { useSelector } from "react-redux";
// import SignupPopup from "./../Pages/SignIn/SignupPopup";

// const AppLayout = () => {
//   const authState = useSelector((state) => state.auth);

//   useEffect(() => {
//     window.addEventListener('scroll', ()=>{

//     })
//   }, [authState.isLoggedIn]);

//   return (
//     <>
//       <SearchContextProvider>
//         <Nav />
//         <SearchComponent />
//         <Outlet />
//         <Footer />
//       </SearchContextProvider>
//     </>
//   );
// };

// export default AppLayout;

import { useEffect } from "react";
import { Outlet, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";
import Nav from "./Nav";
import Footer from "../components/Footer";
import SearchComponent from "../components/SearchComp/Search";
import SearchContextProvider from "../store/SearchContext";

const ScrollToTop = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "instant" }); // Change to "instant" for faster results
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
        <ScrollToTop />  {/* ✅ Added here */}
        <Outlet />
        <Footer />
      </SearchContextProvider>
    </>
  );
};

export default AppLayout;
