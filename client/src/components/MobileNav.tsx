import { useEffect, useState } from "react";
import { GiHamburgerMenu } from "react-icons/gi";
import { LuX } from "react-icons/lu";
import { useMediaQuery } from "usehooks-ts";
import { Link } from "react-router-dom";

const MobileNav = () => {
  const [isOpen, setIsOpen] = useState(false);
  const matches = useMediaQuery("(min-width: 640px)");

  useEffect(() => {
    if (matches) setIsOpen(false);
  }, [matches]);

  return (
    <div className="flex items-center mr-8 sm:hidden">
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="inline-flex items-center justify-center p-2 rounded-md text-gray-500"
      >
        <GiHamburgerMenu
          className={`absolute h-6 w-6 ${
            !isOpen ? "opacity-1" : "opacity-0"
          } transition-opacity duration-200`}
        />
        <LuX
          className={`absolute h-6 w-6 ${
            isOpen ? "opacity-1" : "opacity-0"
          } transition-opacity duration-200`}
        />
      </button>
      {isOpen && (
        <div>
          <Link
            to="/"
            className="border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300 inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium"
          >
            Home
          </Link>
        </div>
      )}
    </div>
  );
};

export default MobileNav;
