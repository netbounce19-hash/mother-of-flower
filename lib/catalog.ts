import { products } from '@/data/products';
import type { Product } from '@/types';

/**
 * URL slug for a bouquet, derived from its name. Deliberately computed rather
 * than stored, so the product data stays as the studio maintains it.
 */
export function slugify(value: string): string {
  return value
    .toLowerCase()
    .normalize('NFKD')
    .replace(/[̀-ͯ]/g, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');
}

export function productSlug(product: Product): string {
  return slugify(product.name);
}

export function getProductBySlug(slug: string): Product | undefined {
  return products.find((p) => productSlug(p) === slug);
}

export function allProductSlugs(): string[] {
  return products.map(productSlug);
}

/** Bouquets sharing a category, excluding the one being viewed. */
export function relatedProducts(product: Product, limit = 3): Product[] {
  const sameCategory = products.filter(
    (p) => p.id !== product.id && p.category === product.category
  );
  const rest = products.filter(
    (p) => p.id !== product.id && p.category !== product.category
  );
  return [...sameCategory, ...rest].slice(0, limit);
}

export interface Facet {
  value: string;
  count: number;
}

export interface CatalogFacets {
  categories: Facet[];
  colors: Facet[];
  priceMin: number;
  priceMax: number;
}

/**
 * Filter options built from the actual catalogue.
 *
 * The sidebar used to hardcode 23 price buttons and 7 categories, so 13 prices,
 * 3 categories and one colour always returned "0 bouquets". Deriving them means
 * the filters stay correct whatever the assortment becomes.
 */
export function catalogFacets(list: Product[] = products): CatalogFacets {
  const countBy = (pick: (p: Product) => string | undefined): Facet[] => {
    const counts = new Map<string, number>();
    for (const p of list) {
      const value = pick(p);
      if (!value) continue;
      counts.set(value, (counts.get(value) ?? 0) + 1);
    }
    return [...counts.entries()]
      .map(([value, count]) => ({ value, count }))
      .sort((a, b) => a.value.localeCompare(b.value));
  };

  const prices = list.map((p) => p.price);
  // Round outwards to a tidy $10 step so the slider ends on round numbers.
  const floor10 = (n: number) => Math.floor(n / 10) * 10;
  const ceil10 = (n: number) => Math.ceil(n / 10) * 10;

  return {
    categories: countBy((p) => p.category),
    colors: countBy((p) => p.color),
    priceMin: prices.length ? floor10(Math.min(...prices)) : 0,
    priceMax: prices.length ? ceil10(Math.max(...prices)) : 1000,
  };
}

/** Does this category have anything in it right now? */
export function categoryHasProducts(category: string): boolean {
  return products.some((p) => p.category === category);
}
