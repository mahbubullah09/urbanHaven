import * as React from "react";
import * as ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./index.css";
import Layout from "./Component/Layout/Layout";
import Home from "./Component/Home/Home";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import Login from "./Component/Authentication/Login";
import { Toaster } from "react-hot-toast";
import PrivateRoute from "./Component/PrivateRoute/PrivateRoute";

const queryClient = new QueryClient()

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    // errorElement: <ErrorPage />,
    children: [
      {
        path: "/",
        element: <PrivateRoute>
          <Home />
        </PrivateRoute>,
      },
    ],
  },
  {
    path:'login',
    element: <Login/>
    
  }
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
    <RouterProvider router={router} />
    </QueryClientProvider>
    <Toaster/>
  </React.StrictMode>
);
