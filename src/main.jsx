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
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import SignupPopup from "./Pages/SignIn/SignupPopup.jsx";
import ScrollToTop from "./Layouts/ScrollToTop.jsx";
import IQTestPopup from "./components/TestComp/IQTestPopup.jsx";
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
  const errorMessage =
    error instanceof AxiosError
      ? error.response?.data?.message || "Something went wrong"
      : error.message || "An unexpected error occurred";

  // console.error("Query Error:", errorMessage);
}

createRoot(document.getElementById("root")).render(
  <>
    <QueryClientProvider client={queryClient}>
      <Provider store={reduxStore}>
        <App />
        {/* <SignupPopup /> */}
        <IQTestPopup/> 
      </Provider> 
    </QueryClientProvider>
    <ToastContainer position="top-right" autoClose={3000} />
  </>
);
