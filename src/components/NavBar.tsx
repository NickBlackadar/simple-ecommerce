import { Link } from "react-router-dom";
import useCartStore from "../store";
import useCategories from "../hooks/useCategories";

const NavBar = () => {
  const itemCount = useCartStore((s) => s.items.length);

  const { data } = useCategories();

  return (
    <div className="nav-bar">
      <div className="nav-links">
        {data?.map((category, index) => (
          <Link key={index} to="/">
            {String(category)}
          </Link>
        ))}
      </div>
      {/* <div>
        <Link to="/">Home</Link>
        <Link to="/products">Products</Link>
      </div> */}
      <Link to="/cart">Cart: {itemCount}</Link>
    </div>
  );
};

export default NavBar;
