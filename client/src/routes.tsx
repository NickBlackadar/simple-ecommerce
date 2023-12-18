import { createBrowserRouter } from "react-router-dom";
import Layout from "./pages/Layout";
import ErrorPage from "./pages/ErrorPage";
import ProductDetailPage from "./pages/ProductDetailPage";
import CartItems from "./pages/CartItems";
import HomePage from "./pages/HomePage";
import ProductPage from "./pages/ProductPage";
import AddProduct from "./pages/Admin/AddProduct";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      { index: true, element: <HomePage /> },
      { path: "/products/", element: <ProductPage /> },
      { path: "/products/:id", element: <ProductDetailPage /> },
      { path: "/cart", element: <CartItems /> },
      { path: "*", element: <ErrorPage /> },
      { path: "/admin/addproduct", element: <AddProduct /> },
    ],
  },
]);

export default router;
