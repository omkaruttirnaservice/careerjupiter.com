// import { useEffect } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import { useMutation } from "@tanstack/react-query";
// import { RouterProvider, useLocation } from "react-router-dom"; // ✅ useLocation
// import Cookies from "js-cookie";

// import { router } from "./router.jsx";
// import { createGuestUser } from "./TestComp/Api.js";
// import { login } from "../store-redux/AuthSlice.js";

// const AppLoader = () => {
//   const dispatch = useDispatch();
//   const authState = useSelector((state) => state.auth);
//   const location = useLocation(); // ✅ get current path

//   const mutation = useMutation({
//     mutationFn: createGuestUser,
//     onSuccess: (data) => {
//       const parsedData = data?.data?.data;
//       Cookies.set("token", parsedData.token, { expires: 1 });
//       Cookies.set("userId", parsedData.userId, { expires: 1 });
//       dispatch(login(parsedData.userId));
//       // window.location.href = "/"; ❌ remove this, no need to force refresh
//     },
//   });

//   useEffect(() => {
//     const currentPath = location.pathname;

//     // ✅ If route starts with /profile, and not logged in yet, then create guest
//     if (currentPath.startsWith("/profile") && !authState.isLoggedIn) {
//       mutation.mutate({
//         mobile_no: "0000000000",
//       });
//     }
//   }, [location.pathname, authState.isLoggedIn]); // ✅ add location.pathname as dependency

//   return (
//     <>
//       <RouterProvider router={router} />
//     </>
//   );
// };

// export default AppLoader;

// import { RouterProvider } from "react-router-dom";
// import { router } from "./router.jsx";
// import GuestHandler from "./GuestHandler.jsx"; // ✅ import new

// const AppLoader = () => {
//   return (
//     <>
//       <RouterProvider router={router} />
//       <GuestHandler /> {/* ✅ Move GuestHandler inside Router */}
//     </>
//   );
// };

// export default AppLoader;

import { RouterProvider } from "react-router-dom";
import { router } from "./router.jsx";
// import ScrollToTop from "../Layouts/ScrollToTop.jsx";

const AppLoader = () => {


  return (
  <>
   {/* <ScrollToTop />  */}
  <RouterProvider router={router} />;

  </>
  )
};

export default AppLoader;

