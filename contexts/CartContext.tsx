'use client';

import React, { createContext, useContext, useEffect, useRef, useState } from 'react';
import { Product, SizeOption, BoxColor } from '@/types';

export interface CartItem {
  id: string; // unique ID for the cart item
  product: Product;
  size: SizeOption;
  boxColor: BoxColor;
  date: 'tomorrow' | 'calendar';
  quantity: number;
}

interface CartContextType {
  items: CartItem[];
  isCartOpen: boolean;
  setIsCartOpen: (isOpen: boolean) => void;
  addToCart: (item: Omit<CartItem, 'id'>) => void;
  removeFromCart: (id: string) => void;
  updateQuantity: (id: string, quantity: number) => void;
  clearCart: () => void;
  cartCount: number;
  cartTotal: number;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

const STORAGE_KEY = 'mof_cart';

function readStoredCart(): CartItem[] {
  if (typeof window === 'undefined') return [];
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    return stored ? (JSON.parse(stored) as CartItem[]) : [];
  } catch (e) {
    console.error('Failed to parse cart from local storage', e);
    return [];
  }
}

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const hydrated = useRef(false);

  // The stored cart has to be read *after* mount, not in the state
  // initialiser: the server always renders an empty bag, so seeding state
  // synchronously would make the hydrated markup disagree with the HTML
  // (visibly, via the cart-count badge). react-hooks/set-state-in-effect
  // flags this shape, but for a localStorage-backed store it is the correct
  // one — the alternative is a hydration mismatch.
  // eslint-disable-next-line react-hooks/set-state-in-effect
  useEffect(() => setItems(readStoredCart()), []);

  // Persist on change, skipping the first pass so the initial empty state
  // never overwrites a real stored cart before it has been read back.
  useEffect(() => {
    if (!hydrated.current) {
      hydrated.current = true;
      return;
    }
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
    } catch (e) {
      console.error('Failed to persist cart', e);
    }
  }, [items]);

  const addToCart = (newItem: Omit<CartItem, 'id'>) => {
    setItems((prev) => {
      // Check if exact same product with same options exists
      const existing = prev.find(
        (i) =>
          i.product.id === newItem.product.id &&
          i.size === newItem.size &&
          i.boxColor === newItem.boxColor &&
          i.date === newItem.date
      );

      if (existing) {
        return prev.map((i) =>
          i.id === existing.id ? { ...i, quantity: i.quantity + newItem.quantity } : i
        );
      }

      return [...prev, { ...newItem, id: `cart_item_${Date.now()}_${Math.random().toString(36).substr(2, 9)}` }];
    });
    setIsCartOpen(true);
  };

  const removeFromCart = (id: string) => {
    setItems((prev) => prev.filter((i) => i.id !== id));
  };

  const updateQuantity = (id: string, quantity: number) => {
    if (quantity < 1) return;
    setItems((prev) => prev.map((i) => (i.id === id ? { ...i, quantity } : i)));
  };

  const clearCart = () => setItems([]);

  const cartCount = items.reduce((total, item) => total + item.quantity, 0);
  
  // Note: we might want to add size multipliers to price later, but for now we use base price.
  const cartTotal = items.reduce((total, item) => total + item.product.price * item.quantity, 0);

  return (
    <CartContext.Provider
      value={{
        items,
        isCartOpen,
        setIsCartOpen,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        cartCount,
        cartTotal,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
}
