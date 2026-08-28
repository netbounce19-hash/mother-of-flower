'use client';

import React, { createContext, useContext, useEffect, useRef, useState } from 'react';

interface WishlistContextType {
  /** Product ids the visitor has saved. */
  ids: string[];
  isSaved: (productId: string) => boolean;
  toggle: (productId: string) => void;
  count: number;
}

const WishlistContext = createContext<WishlistContextType | undefined>(undefined);

const STORAGE_KEY = 'mof_wishlist';

function readStored(): string[] {
  if (typeof window === 'undefined') return [];
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    const parsed = stored ? JSON.parse(stored) : [];
    return Array.isArray(parsed) ? parsed.filter((v) => typeof v === 'string') : [];
  } catch (e) {
    console.error('Failed to parse wishlist from local storage', e);
    return [];
  }
}

export function WishlistProvider({ children }: { children: React.ReactNode }) {
  const [ids, setIds] = useState<string[]>([]);
  const hydrated = useRef(false);

  // Read after mount, not in the state initialiser: the server renders an
  // empty wishlist, so seeding synchronously would make the hydrated markup
  // disagree with the HTML. Same trade-off as the cart.
  // eslint-disable-next-line react-hooks/set-state-in-effect
  useEffect(() => setIds(readStored()), []);

  useEffect(() => {
    if (!hydrated.current) {
      hydrated.current = true;
      return;
    }
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(ids));
    } catch (e) {
      console.error('Failed to persist wishlist', e);
    }
  }, [ids]);

  const toggle = (productId: string) =>
    setIds((prev) =>
      prev.includes(productId)
        ? prev.filter((id) => id !== productId)
        : [...prev, productId]
    );

  const isSaved = (productId: string) => ids.includes(productId);

  return (
    <WishlistContext.Provider value={{ ids, isSaved, toggle, count: ids.length }}>
      {children}
    </WishlistContext.Provider>
  );
}

export function useWishlist() {
  const context = useContext(WishlistContext);
  if (context === undefined) {
    throw new Error('useWishlist must be used within a WishlistProvider');
  }
  return context;
}
