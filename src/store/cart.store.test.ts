import { describe, it, expect, beforeEach } from 'vitest';
import { useCartStore } from './cart.store';
import type { CartItem } from '@/types/cart.types';

describe('cart store', () => {
  beforeEach(() => useCartStore.getState().clearCart());

  it('add item', () => {
    const item: CartItem = {
      id: 1,
      title: 'A',
      price: 10,
      image: '',
      quantity: 1,
    };
    useCartStore.getState().addToCart(item);
    expect(useCartStore.getState().items).toHaveLength(1);
  });

  it('remove item', () => {
    const item: CartItem = {
      id: 2,
      title: 'B',
      price: 5,
      image: '',
      quantity: 1,
    };
    useCartStore.getState().addToCart(item);
    useCartStore.getState().removeFromCart(2);
    expect(useCartStore.getState().items).toHaveLength(0);
  });

  it('update quantity', () => {
    const item: CartItem = {
      id: 3,
      title: 'C',
      price: 7,
      image: '',
      quantity: 1,
    };
    useCartStore.getState().addToCart(item);
    useCartStore.getState().updateQuantity(3, 4);
    expect(useCartStore.getState().items[0].quantity).toBe(4);
  });

  it('total calculation', () => {
    const a: CartItem = {
      id: 1,
      title: 'A',
      price: 10,
      image: '',
      quantity: 1,
    };
    const b: CartItem = { id: 2, title: 'B', price: 5, image: '', quantity: 2 };
    useCartStore.getState().addToCart(a);
    useCartStore.getState().addToCart(b);
    expect(useCartStore.getState().totalItems).toBe(3);
    expect(useCartStore.getState().totalPrice).toBe(20);
  });
});
