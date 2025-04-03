import { createRoot } from "react-dom/client";
import App from "./App.jsx";

// tanstack
import {
  MutationCache,
  QueryCache,
  QueryClient,
  QueryClientProvider,
} from "@tanstack/react-query";

// Redux
import { Provider } from "react-redux";
import reduxStore from "./store-redux/store.js";

// axios
import { AxiosError } from "axios";

// toastify
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import SignupPopup from "./Pages/SignIn/SignupPopup.jsx";
import ScrollToTop from "./Layouts/ScrollToTop.jsx";

import { RouterProvider } from "react-router-dom";
import { router } from "./components/router.jsx";

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
  console.log({error});
  const data = error?.response?.data

  const usrmessage =error.response?.data?.message

  toast.warning(data?.usrMsg || "Please try again later !")
  // toast.info(usrmessage || "Please try again later.... !")
  console.log(usrmessage , '----------error message')


  console.log(error,'-error')
  
}

createRoot(document.getElementById("root")).render(
  <>
    <QueryClientProvider client={queryClient}>
      <Provider store={reduxStore}>
      
        <RouterProvider router={router}/>
         
      </Provider> 
    </QueryClientProvider>
    <ToastContainer position="top-right" autoClose={2000} />
  </>
);
