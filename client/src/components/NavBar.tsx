import { Link, useNavigate } from "react-router-dom";
import useCartStore from "../useCartStore";
import { LuShoppingCart, LuUser } from "react-icons/lu";
import MaxWidthWrapper from "./MaxWidthWrapper";
import { Separator } from "./ui/separator";
import MobileNav from "./MobileNav";
import useAuthStore from "@/useAuthStore";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const NavBar = () => {
  const itemCount = useCartStore((s) => s.itemCount);
  const user = useAuthStore((s) => s.user);
  const logoutUser = useAuthStore((s) => s.logoutUser);
  const navigate = useNavigate();

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
              {user ? (
                <>
                  <div className="hidden sm:mr-4 sm:flex sm:space-x-4">
                    <Link
                      to="/profile"
                      className="border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300 inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium"
                    >
                      {user.email}
                    </Link>
                    <button
                      onClick={logoutUser}
                      className="border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300 inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium"
                    >
                      Logout
                    </button>
                  </div>
                  <div className="flex sm:hidden">
                    <DropdownMenu>
                      <DropdownMenuTrigger>
                        <LuUser className="h-6 w-6 text-gray-500 hover:text-gray-700 focus:outline-none" />
                      </DropdownMenuTrigger>
                      <DropdownMenuContent className="">
                        <DropdownMenuItem onClick={() => navigate("/profile")}>
                          My Account
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => navigate("/orders")}>
                          Orders
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem onClick={logoutUser}>
                          Logout
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>
                </>
              ) : (
                <>
                  <div className="hidden sm:flex sm:space-x-4">
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
                  <div className="flex sm:hidden">
                    <Link to="/login" className="text-gray-500">
                      <LuUser className="h-6 w-6" />
                    </Link>
                  </div>
                </>
              )}
              <Separator
                orientation="vertical"
                className="block h-6 w-px bg-gray-200 mx-3 sm:mx-4"
              />
              <div className="flex items-center">
                <Link
                  to="/cart"
                  className="inline-flex items-center my-2 text-sm font-medium text-gray-500 bg-white hover:text-gray-700 focus:outline-none"
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
