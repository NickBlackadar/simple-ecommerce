import { Outlet } from "react-router-dom";
import NavBar from "../components/NavBar";
import { useEffect } from "react";
import useCartStore, { Item } from "../useCartStore";
import { Toaster } from "@/components/ui/toaster";
import useAuthStore from "@/useAuthStore";

const Layout = () => {
  const addToCart = useCartStore((s) => s.addToCart);
  const items = useCartStore((s) => s.items);
  const setUser = useAuthStore((s) => s.setUser);

  useEffect(() => {
    const storedCart = localStorage.getItem("cart");
    const storedUser = localStorage.getItem("user");

    if (storedCart) {
      const parsedCart = JSON.parse(storedCart);
      parsedCart.forEach((item: Item) => addToCart(item));
    }

    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, [addToCart, setUser]);

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
