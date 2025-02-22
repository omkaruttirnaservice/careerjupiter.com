import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import {
  MutationCache,
  QueryCache,
  QueryClient,
  QueryClientProvider,
} from "@tanstack/react-query";
import { Provider } from "react-redux";
import store from "./redux/Store.js";
import { AxiosError } from "axios";

import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

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

  console.error("Query Error:", errorMessage);
}

// function handleError(error) {
//   const data = error?.response?.data;
//   toSafeInteger.error(data?.userMessage || "somthing want wrong");
// }

// Render the app
createRoot(document.getElementById("root")).render(
  <StrictMode>
    <Provider store={store}>
      <QueryClientProvider client={queryClient}>
        <App />
      </QueryClientProvider>
    </Provider>
    <ToastContainer position="top-right" autoClose={3000} />
  </StrictMode>
);
