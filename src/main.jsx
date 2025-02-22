import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
 import { ToastContainer} from "react-toastify";
import {
  MutationCache,
  QueryCache,
  QueryClient,
  QueryClientProvider,
  useQuery,
} from "@tanstack/react-query";

const queryClient = new QueryClient(
  {queryCache: new QueryCache({
    onError(error){
      handleError(error);
    },
  }),
  mutationCache: new MutationCache({
    onError(error){
      handleError(error);
    }
  }),
});

function handleError(error){
  const data = error?.response?.data;
  toSafeInteger.error(data?.userMessage || "somthing want wrong");
}

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <App />
    </QueryClientProvider>
    <ToastContainer />
  </StrictMode>
);
