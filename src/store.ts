import { create } from "zustand";

export interface Item {
  id: number;
  description: string;
  price: number;
  quantity: number;
}

interface CartStore {
  items: Item[];
  addToCart: (product: Item) => void;
  clearCart: () => void;
  removeFromCart: (id: number) => void;
  updateQuantity: (id: number, quantity: number) => void;
}

const useCartStore = create<CartStore>((set) => ({
  items: [],
  addToCart: (product) =>
    set((store) => {
      const existingItem = store.items.find((item) => item.id === product.id);

      if (existingItem) {
        const updatedItems = store.items.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + product.quantity }
            : item
        );
        return { items: updatedItems };
      } else {
        return { items: [...store.items, product] };
      }
    }),
  clearCart: () => set({ items: [] }),
  removeFromCart: (productId) =>
    set((store) => ({
      items: store.items.filter((item) => item.id !== productId),
    })),
  updateQuantity: (productId, quantity) =>
    set((store) => ({
      items: store.items.map((item) =>
        item.id === productId ? { ...item, quantity: quantity } : item
      ),
    })),
}));

export default useCartStore;
