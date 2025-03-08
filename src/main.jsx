
import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import {
  MutationCache,
  QueryCache,
  QueryClient,
  QueryClientProvider,
} from "@tanstack/react-query";
import { Provider as OldStoreProvider } from "react-redux";

import { Provider as AuthProvider } from "react-redux";
import AuthStore from "./store-redux/store.js";
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

createRoot(document.getElementById("root")).render(
  // <StrictMode>
  <>
    {/* <OldStoreProvider store={store}> */}
      <AuthProvider store={AuthStore}>
        <QueryClientProvider client={queryClient}>
          <App />
        </QueryClientProvider>
      </AuthProvider>
    {/* </OldStoreProvider> */}
    <ToastContainer position="top-right" autoClose={3000} />
  </>
  // </StrictMode>
);
