import { Link } from "react-router-dom";
import useProducts from "../hooks/useProducts";

const ProductPage = () => {
  const { data, isLoading, isError } = useProducts();

  if (isLoading) return <div>Loading...</div>;

  if (isError) return <div>Error loading data</div>;

  return (
    <div>
      <ul>
        {data?.map((product) => (
          <li key={product._id}>
            <Link to={`/products/${product._id}`}>{product.name}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ProductPage;
