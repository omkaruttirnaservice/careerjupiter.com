// import { createRoot } from "react-dom/client";
// import App from "./App.jsx";

// // tanstack
// import {
//   MutationCache,
//   QueryCache,
//   QueryClient,
//   QueryClientProvider,
// } from "@tanstack/react-query";

// // Redux
// import { Provider } from "react-redux";
// import reduxStore from "./store-redux/store.js";

// // axios
// import { AxiosError } from "axios";

// // toastify
// import { toast, ToastContainer } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";
// import SignupPopup from "./Pages/SignIn/SignupPopup.jsx";
// import ScrollToTop from "./Layouts/ScrollToTop.jsx";

// import { RouterProvider } from "react-router-dom";
// import { router } from "./components/router.jsx";

// const queryClient = new QueryClient({
//   queryCache: new QueryCache({
//     onError(error) {
//       handleError(error);
//     },
//   }),
//   mutationCache: new MutationCache({
//     onError(error) {
//       handleError(error);
//     },
//   }),
// });

// function handleError(error) {
//   // console.log(error, "-err");
//   const data = error?.response?.data;

//   toast.warning(data?.usrMsg || "Please try again later !");
//   // toast.info(usrmessage || "Please try again later.... !")
// }

// createRoot(document.getElementById("root")).render(
//   <>
//     <QueryClientProvider client={queryClient}>
//       <Provider store={reduxStore}>
//         <RouterProvider router={router} />
//       </Provider>
//     </QueryClientProvider>
//     <ToastContainer position="top-right" autoClose={2000} />
//   </>
// );


// main.jsx
import { createRoot } from "react-dom/client";
import { QueryClient, QueryClientProvider, QueryCache, MutationCache } from "@tanstack/react-query";
import { Provider } from "react-redux";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import App from "./App.jsx";

import reduxStore from "./store-redux/store.js";
import AppLoader from "./components/AppLoader.jsx";
import Swal from "sweetalert2";

const queryClient = new QueryClient({
  queryCache: new QueryCache({
    onError(error) {
      handleError(error);
    },
  }),
  mutationCache: new MutationCache({
    onError(error) {
      handleError(error);
    },
  }),
});

function handleError(error) {
  const data = error?.response?.data;
  if(error.message==="Network Error"){
    console.log("error.message+++++++++ 1",error.message);
    
    Swal.fire({
      icon: "info",
      title: " Oops!",
      text: "We're currently experiencing high traffic. Please try again in a few moments. Thank you for your patience!",
    });
  }else{
    console.log("error.message+++++++++ 2",error.message);
    toast.warning(data?.usrMsg || "Please try again later !");
  }
}


createRoot(document.getElementById("root")).render(
  <>
    <QueryClientProvider client={queryClient}>
      <Provider store={reduxStore}>
        <AppLoader /> {/* AppLoader will manage login / guest creation */}
      </Provider>
    </QueryClientProvider>
    <ToastContainer position="top-right" autoClose={2000} />
  </>
);
