import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import router from "./routes";
import { RouterProvider } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import useAuthStore from "./useAuthStore";

const queryClient = new QueryClient();

const Main = () => {
  const user = useAuthStore((s) => s.user);

  return (
    <React.StrictMode>
      <QueryClientProvider client={queryClient}>
        <RouterProvider router={router(user)} />
        <ReactQueryDevtools />
      </QueryClientProvider>
    </React.StrictMode>
  );
};

ReactDOM.createRoot(document.getElementById("root")!).render(<Main />);
