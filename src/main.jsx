import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import { Provider } from "react-redux";
import store from "./redux/Store.js";
import {
  MutationCache,
  QueryCache,
  QueryClient,
  QueryClientProvider,
} from "@tanstack/react-query";
import { AxiosError } from "axios";

// Error handling function
function handleError(error) {
  const errorMessage = error instanceof AxiosError
    ? error.response?.data?.message || "Something went wrong"
    : error.message || "An unexpected error occurred";
  
  console.error("Query Error:", errorMessage);
}

// React Query Client setup
const queryClient = new QueryClient({
  queryCache: new QueryCache({
    onError: handleError,
  }),
  mutationCache: new MutationCache({
    onError: handleError,
  }),
});

// Render the app
createRoot(document.getElementById("root")).render(
  <StrictMode>
    <Provider store={store}> {/* Redux Provider add केला */}
      <QueryClientProvider client={queryClient}>
        <App />
      </QueryClientProvider>
    </Provider>
  </StrictMode>
);
