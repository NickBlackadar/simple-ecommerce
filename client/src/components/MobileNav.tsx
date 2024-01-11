import { useState } from "react";
import { GiHamburgerMenu } from "react-icons/gi";
import { Link } from "react-router-dom";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import useAuthStore from "@/useAuthStore";

const MobileNav = () => {
  const user = useAuthStore((s) => s.user);
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="flex items-center mr-5 sm:hidden">
      <Sheet open={isOpen} onOpenChange={setIsOpen}>
        <SheetTrigger className="inline-flex items-center justify-center p-2 rounded-md text-gray-500">
          <GiHamburgerMenu className="absolute h-6 w-6" />
        </SheetTrigger>
        <SheetContent side="left" className="p-0 border-0">
          <div className="text-sm flex items-center pl-5 pt-3">
            <Link
              to={user ? "/profile" : "/login"}
              onClick={() => setIsOpen(!isOpen)}
            >
              {user ? "Your account" : "Sign in"}
            </Link>
          </div>
          <div className="flex flex-col p-5 items-center justify-center h-full gap-5 text-lg">
            <Link to="/" onClick={() => setIsOpen(!isOpen)}>
              Home
            </Link>
            <Link to="/products" onClick={() => setIsOpen(!isOpen)}>
              Products
            </Link>
            <Link to="/products" onClick={() => setIsOpen(!isOpen)}>
              Category 1
            </Link>
            <Link to="/products" onClick={() => setIsOpen(!isOpen)}>
              Category 2
            </Link>
            <Link to="/products" onClick={() => setIsOpen(!isOpen)}>
              Category 3
            </Link>
          </div>
        </SheetContent>
      </Sheet>
    </div>
  );
};

export default MobileNav;
