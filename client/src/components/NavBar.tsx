import { Link } from "react-router-dom";
import useCartStore from "../store";
import { LuShoppingCart } from "react-icons/lu";
import MaxWidthWrapper from "./MaxWidthWrapper";
import { Separator } from "./ui/separator";
import MobileNav from "./MobileNav";

const NavBar = () => {
  const itemCount = useCartStore((s) => s.items.length);

  return (
    <div className="bg-white sticky z-50 top-0 inset-x-0 h-16">
      <header className="relative bg-white border-b-2">
        <MaxWidthWrapper>
          <div className="flex justify-between items-center h-16">
            <div className="flex">
              <MobileNav />
              <div className="flex-shrink-0 flex items-center">
                <Link to="/">Logo</Link>
              </div>
              <div className="hidden sm:ml-6 sm:flex sm:space-x-4">
                <Link
                  to="/"
                  className="border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300 inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium"
                >
                  Home
                </Link>
                <Link
                  to="/products"
                  className="border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300 inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium"
                >
                  Products
                </Link>
              </div>
            </div>
            <div className="flex items-center">
              <div className="hidden sm:mr-4 sm:flex sm:space-x-4">
                <Link
                  to="/login"
                  className="border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300 inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium"
                >
                  Login
                </Link>
                <Link
                  to="/signup"
                  className="border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300 inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium"
                >
                  Sign Up
                </Link>
              </div>
              <Separator
                orientation="vertical"
                className="hidden sm:block h-6 w-px bg-gray-200"
              />
              <div className="flex items-center">
                <Link
                  to="/cart"
                  className="inline-flex items-center mx-4 my-2 text-sm font-medium rounded-md text-gray-500 bg-white hover:text-gray-700 focus:outline-none"
                >
                  <LuShoppingCart className="h-6 w-6" />
                  <span className="ml-2">{itemCount}</span>
                </Link>
              </div>
            </div>
          </div>
        </MaxWidthWrapper>
      </header>
    </div>
  );
};

export default NavBar;
