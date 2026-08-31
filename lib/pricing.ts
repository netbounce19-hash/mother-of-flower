import { products } from '@/data/products';
import type { BoxColor, Product, SizeOption } from '@/types';
import type { OrderItem } from '@/lib/schemas';

/** Clark County, NV combined sales tax. */
export const TAX_RATE = 0.08375;
export const DELIVERY_FEE = 25;

/**
 * TODO(pricing): placeholder multipliers — every size currently costs the same
 * as the base price, so behaviour is unchanged until real coefficients land.
 * Replace with the studio's actual uplift (e.g. 1 / 1.35 / 1.8). A product may
 * override any of these via `Product.sizePricing`.
 */
export const SIZE_MULTIPLIERS: Record<SizeOption, number> = {
  Classic: 1.0,
  Voluminous: 1.0,
  Large: 1.0,
};

/**
 * TODO(pricing): placeholder surcharges in USD, added on top of the sized
 * price. All zero for now. A product may override via `Product.boxPricing`.
 */
export const BOX_SURCHARGES: Record<BoxColor, number> = {
  'Blush Pink': 0,
  'Warm White': 0,
  Black: 0,
};

const round = (n: number) => Math.round(n * 100) / 100;

export function sizeMultiplier(product: Product, size: SizeOption): number {
  return product.sizePricing?.[size] ?? SIZE_MULTIPLIERS[size] ?? 1;
}

export function boxSurcharge(product: Product, boxColor: BoxColor): number {
  return product.boxPricing?.[boxColor] ?? BOX_SURCHARGES[boxColor] ?? 0;
}

/** Price of one unit with the chosen size and box applied. */
export function unitPriceFor(
  product: Product,
  size: SizeOption,
  boxColor: BoxColor
): number {
  return round(product.price * sizeMultiplier(product, size) + boxSurcharge(product, boxColor));
}

export interface OrderTotals {
  subtotal: number;
  shipping: number;
  tax: number;
  total: number;
  /** Items re-priced from server-side product data. */
  items: (OrderItem & { lineTotal: number })[];
}

/**
 * Recomputes an order from trusted server-side product data.
 *
 * Prices arriving from the browser are treated as untrusted input — a client
 * can post any `unitPrice` it likes, so we look each item up by id and price
 * the chosen size and box ourselves, ignoring whatever it claimed.
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

    const size = (product.sizes.includes(item.size as SizeOption)
      ? item.size
      : product.sizes[0]) as SizeOption;
    const boxColor = (product.boxColors.includes(item.boxColor as BoxColor)
      ? item.boxColor
      : product.boxColors[0]) as BoxColor;

    const unitPrice = unitPriceFor(product, size, boxColor);
    return {
      ...item,
      name: product.name,
      size,
      boxColor,
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
