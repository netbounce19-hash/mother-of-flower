import type { Metadata } from 'next';
import CatalogBrowser from '@/components/catalog/CatalogBrowser';
import { site } from '@/lib/site';

export const metadata: Metadata = {
  title: `Shop Luxury Bouquets — ${site.name}`,
  description:
    'Browse the full Mother of Flower collection: signature boxed roses, peonies, hydrangeas and seasonal bouquets, hand-composed in Las Vegas with same-day delivery.',
  alternates: { canonical: '/catalog' },
  openGraph: {
    title: `Shop Luxury Bouquets — ${site.name}`,
    description:
      'Signature boxed roses, peonies and seasonal bouquets, hand-composed in Las Vegas.',
    url: '/catalog',
  },
};

interface CatalogPageProps {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}

export default async function CatalogPage({ searchParams }: CatalogPageProps) {
  // Read the filters on the server so the first response already contains the
  // matching bouquets. Reading them only via useSearchParams put the whole
  // grid behind a Suspense boundary, and the HTML shipped with no products.
  const params = await searchParams;
  const one = (v: string | string[] | undefined) => (Array.isArray(v) ? v[0] : v) ?? null;

  const initial = {
    category: one(params.category),
    color: one(params.color),
    search: one(params.q) ?? '',
    sort: one(params.sort),
    from: one(params.from),
    to: one(params.to),
  };

  return (
    <>
      <h1 className="sr-only">Luxury flower collection — Las Vegas</h1>
      <CatalogBrowser initial={initial} />
    </>
  );
}
