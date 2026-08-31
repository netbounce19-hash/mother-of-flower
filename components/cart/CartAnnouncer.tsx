'use client';

import { useCart } from '@/contexts/CartContext';

/**
 * Visually hidden live region for cart changes.
 *
 * Sits in the layout rather than inside the drawer so the message is announced
 * even when the drawer itself is closed or being animated in.
 */
export default function CartAnnouncer() {
  const { announcement } = useCart();

  return (
    <div aria-live="polite" aria-atomic="true" className="sr-only">
      {announcement}
    </div>
  );
}
