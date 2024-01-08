import { Outlet } from "react-router-dom";
import NavBar from "../components/NavBar";
import { useEffect } from "react";
import useCartStore, { Item } from "../useCartStore";
import { Toaster } from "@/components/ui/toaster";
import useAuthStore from "@/useAuthStore";

const Layout = () => {
  const addToCart = useCartStore((s) => s.addToCart);
  const items = useCartStore((s) => s.items);
  const loginUser = useAuthStore((s) => s.loginUser);

  useEffect(() => {
    const storedCart = localStorage.getItem("cart");

    if (storedCart) {
      const parsedCart = JSON.parse(storedCart);
      parsedCart.forEach((item: Item) => addToCart(item));
    }
  }, [addToCart]);

  useEffect(() => {
    const storedUser = localStorage.getItem("user");

    if (storedUser) {
      loginUser(JSON.parse(storedUser));
    }
  }, [loginUser]);

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
