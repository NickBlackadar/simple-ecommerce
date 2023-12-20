import { Outlet } from "react-router-dom";
import NavBar from "../components/NavBar";
import { useEffect } from "react";
import useCartStore, { Item } from "../store";
import { Toaster } from "@/components/ui/toaster";

const Layout = () => {
  const { addToCart, items } = useCartStore();

  useEffect(() => {
    const storedCart = localStorage.getItem("cart");
    if (storedCart) {
      const parsedCart = JSON.parse(storedCart);
      parsedCart.forEach((item: Item) => addToCart(item));
    }
  }, [addToCart]);

  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(items));
  }, [items]);

  return (
    <>
      <NavBar />
      <Outlet />
      <Toaster />
    </>
  );
};

export default Layout;
