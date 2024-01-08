import { createBrowserRouter, Navigate } from "react-router-dom";
import Layout from "./pages/Layout";
import ErrorPage from "./pages/ErrorPage";
import ProductDetailPage from "./pages/ProductDetailPage";
import CartItems from "./pages/CartItems";
import HomePage from "./pages/HomePage";
import ProductPage from "./pages/ProductPage";
import AddProduct from "./pages/Admin/AddProduct";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import { User } from "./types/User";
import Profile from "./pages/Profile";

const router = (user: User | null) =>
  createBrowserRouter([
    {
      path: "/",
      element: <Layout />,
      children: [
        { index: true, element: <HomePage /> },
        { path: "/products/", element: <ProductPage /> },
        { path: "/products/:id", element: <ProductDetailPage /> },
        { path: "/login", element: user ? <Navigate to="/" /> : <Login /> },
        { path: "/signup", element: user ? <Navigate to="/" /> : <Signup /> },
        { path: "/profile", element: user ? <Profile /> : <Navigate to="/" /> },
        { path: "/cart", element: <CartItems /> },
        { path: "*", element: <ErrorPage /> },
        {
          path: "/admin/addproduct",
          element: user ? <AddProduct /> : <Navigate to="/" />,
        },
      ],
    },
  ]);

export default router;
