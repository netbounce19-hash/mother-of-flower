import { products } from '@/data/products';
import type { OrderItem } from '@/lib/schemas';

/** Clark County, NV combined sales tax. */
export const TAX_RATE = 0.08375;
export const DELIVERY_FEE = 25;

export interface OrderTotals {
  subtotal: number;
  shipping: number;
  tax: number;
  total: number;
  /** Items re-priced from server-side product data. */
  items: (OrderItem & { lineTotal: number })[];
}

const round = (n: number) => Math.round(n * 100) / 100;

/**
 * Recomputes an order from trusted server-side product data.
 *
 * Prices arriving from the browser are treated as untrusted input — a client
 * can post any `unitPrice` it likes, so we look each item up by id and ignore
 * whatever it claimed.
 */
export function priceOrder(
  rawItems: OrderItem[],
  shippingMethod: 'delivery' | 'pickup'
): OrderTotals {
  const items = rawItems.map((item) => {
    const product = products.find((p) => p.id === item.productId);
    if (!product) {
      throw new Error(`Unknown product: ${item.productId}`);
    }
    const unitPrice = product.price;
    return {
      ...item,
      name: product.name,
      unitPrice,
      lineTotal: round(unitPrice * item.quantity),
    };
  });

  const subtotal = round(items.reduce((sum, i) => sum + i.lineTotal, 0));
  const shipping = shippingMethod === 'delivery' ? DELIVERY_FEE : 0;
  const tax = round(subtotal * TAX_RATE);

  return {
    items,
    subtotal,
    shipping,
    tax,
    total: round(subtotal + shipping + tax),
  };
}

export const formatUSD = (n: number) =>
  n.toLocaleString('en-US', { style: 'currency', currency: 'USD' });
