import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { CartItem } from '@/types/cart.types';

type CartState = {
  items: CartItem[];
  totalItems: number;
  totalPrice: number;
  addToCart: (product: CartItem) => void;
  removeFromCart: (id: number) => void;
  updateQuantity: (id: number, quantity: number) => void;
  clearCart: () => void;
};

export const useCartStore = create<CartState>()(
  persist(
    (set, get) => ({
      items: [],
      totalItems: 0,
      totalPrice: 0,
      addToCart: (product) => {
        const addQty = product.quantity ?? 1;
        const existing = get().items.find((i) => i.id === product.id);
        const newItems = existing
          ? get().items.map((i) =>
              i.id === product.id ? { ...i, quantity: i.quantity + addQty } : i
            )
          : [...get().items, { ...product, quantity: addQty }];
        set({
          items: newItems,
          totalItems: newItems.reduce((sum, i) => sum + i.quantity, 0),
          totalPrice: newItems.reduce((sum, i) => sum + i.price * i.quantity, 0),
        });
      },
      removeFromCart: (id) => {
        const newItems = get().items.filter((i) => i.id !== id);
        set({
          items: newItems,
          totalItems: newItems.reduce((sum, i) => sum + i.quantity, 0),
          totalPrice: newItems.reduce((sum, i) => sum + i.price * i.quantity, 0),
        });
      },
      updateQuantity: (id, quantity) => {
        const newItems = get().items.map((i) => (i.id === id ? { ...i, quantity } : i));
        set({
          items: newItems,
          totalItems: newItems.reduce((sum, i) => sum + i.quantity, 0),
          totalPrice: newItems.reduce((sum, i) => sum + i.price * i.quantity, 0),
        });
      },
      clearCart: () => set({ items: [], totalItems: 0, totalPrice: 0 }),
    }),
    { name: 'cart-storage' }
  )
);
