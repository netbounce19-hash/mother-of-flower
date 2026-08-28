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

export default function CatalogPage() {
  return (
    <>
      <h1 className="sr-only">Luxury flower collection — Las Vegas</h1>
      <CatalogBrowser />
    </>
  );
}
