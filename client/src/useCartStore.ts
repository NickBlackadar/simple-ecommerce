import { create } from "zustand";

export interface Item {
  id: number;
  description: string;
  price: number;
  quantity: number;
}

interface CartStore {
  items: Item[];
  itemCount: number;
  addToCart: (product: Item) => void;
  clearCart: () => void;
  removeFromCart: (id: number) => void;
  updateQuantity: (id: number, quantity: number) => void;
}

const useCartStore = create<CartStore>((set) => ({
  items: [],
  itemCount: 0,
  addToCart: (product) =>
    set((store) => {
      const existingItem = store.items.find((item) => item.id === product.id);

      if (existingItem) {
        const updatedItems = store.items.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + product.quantity }
            : item
        );
        return {
          items: updatedItems,
          itemCount: store.itemCount + product.quantity,
        };
      } else {
        return {
          items: [...store.items, product],
          itemCount: store.itemCount + product.quantity,
        };
      }
    }),
  clearCart: () =>
    set(() => {
      return {
        items: [],
        itemCount: 0,
      };
    }),
  removeFromCart: (productId) =>
    set((store) => ({
      items: store.items.filter((item) => item.id !== productId),
      itemCount:
        store.itemCount -
        store.items.find((item) => item.id === productId)!.quantity,
    })),
  updateQuantity: (productId, quantity) =>
    set((store) => ({
      itemCount:
        store.itemCount +
        quantity -
        store.items.find((item) => item.id === productId)!.quantity,
      items: store.items.map((item) =>
        item.id === productId ? { ...item, quantity: quantity } : item
      ),
    })),
}));

export default useCartStore;
