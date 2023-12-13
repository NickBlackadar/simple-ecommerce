import { useParams } from "react-router-dom";
import useCartStore from "../store";
import { useState } from "react";
import useProduct from "../hooks/useProduct";

const ProductPage = () => {
  const { id } = useParams();
  const addToCart = useCartStore((s) => s.addToCart);
  const [quantity, setQuantity] = useState(1);

  const { data, isLoading, isError } = useProduct(id);

  if (isLoading) return <div>Loading...</div>;

  if (isError || !data) return <div>Error loading data</div>;

  return (
    <>
      <div>{data.title}</div>
      <div>Price: {data.price}</div>
      <img src={data.image} />
      <select
        name="quantity"
        onChange={(e) => setQuantity(parseInt(e.target.value))}
      >
        <option value="1">1</option>
        <option value="2">2</option>
        <option value="3">3</option>
      </select>
      <button
        onClick={() =>
          addToCart({
            id: data.id,
            description: data.description,
            price: data.price,
            quantity: quantity,
          })
        }
      >
        Add to Cart
      </button>
    </>
  );
};

export default ProductPage;
