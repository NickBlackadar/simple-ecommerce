import useCartStore from "../useCartStore";

const CartItems = () => {
  const { items, removeFromCart, clearCart, updateQuantity } = useCartStore();
  const quantities = [
    {
      value: 0,
      label: "0 (Delete)",
    },
    {
      value: 1,
      label: "1",
    },
    {
      value: 2,
      label: "2",
    },
    {
      value: 3,
      label: "3",
    },
    {
      value: 4,
      label: "4",
    },
  ];

  const handleChange = (id: number, value: number) => {
    if (value === 0) {
      removeFromCart(id);
    } else {
      updateQuantity(id, value);
    }
  };

  if (items.length > 0) {
    return (
      <>
        <ul>
          {items.map((item) => (
            <li key={item.id}>
              {item.description} - Total:{"  "}
              {item.price * item.quantity} <br /> Quantity:{" "}
              <select
                defaultValue={item.quantity}
                onChange={(e) =>
                  handleChange(item.id, parseInt(e.target.value))
                }
              >
                {quantities.map((quantity) => (
                  <option value={quantity.value} key={quantity.value}>
                    {quantity.label}
                  </option>
                ))}
              </select>
              <button onClick={() => removeFromCart(item.id)}>
                Remove Item
              </button>
            </li>
          ))}
        </ul>

        <button onClick={clearCart}>Clear Cart</button>
      </>
    );
  } else {
    return <div>Your cart is empty.</div>;
  }
};

export default CartItems;
