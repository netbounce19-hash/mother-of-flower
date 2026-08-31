import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import ProductDetail from '@/components/products/ProductDetail';
import { allProductSlugs, getProductBySlug, relatedProducts } from '@/lib/catalog';
import { unitPriceFor } from '@/lib/pricing';
import { site } from '@/lib/site';

interface PageProps {
  params: Promise<{ slug: string }>;
}

export function generateStaticParams() {
  return allProductSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const product = getProductBySlug(slug);
  if (!product) return { title: `Bouquet not found — ${site.name}` };

  const title = `${product.name} — ${product.currency} ${product.price} | ${site.name}`;
  const description = `${product.tagline}. ${product.description}`.slice(0, 300);

  return {
    title,
    description,
    alternates: { canonical: `/catalog/${slug}` },
    openGraph: {
      title,
      description,
      url: `/catalog/${slug}`,
      type: 'website',
      images: [{ url: product.images[0], width: 1400, height: 1400, alt: product.name }],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [product.images[0]],
    },
  };
}

export default async function ProductPage({ params }: PageProps) {
  const { slug } = await params;
  const product = getProductBySlug(slug);
  if (!product) notFound();

  const related = relatedProducts(product);
  const url = `${site.url}/catalog/${slug}`;

  const productJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: product.name,
    image: product.images.map((i) => `${site.url}${i}`),
    description: product.description,
    sku: product.sku,
    brand: { '@type': 'Brand', name: site.name },
    offers: {
      '@type': 'Offer',
      url,
      price: unitPriceFor(product, product.sizes[0], product.boxColors[0]).toFixed(2),
      priceCurrency: product.currency,
      availability: 'https://schema.org/InStock',
      seller: { '@type': 'Organization', name: site.name },
    },
  };

  const breadcrumbJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: site.url },
      { '@type': 'ListItem', position: 2, name: 'Collections', item: `${site.url}/catalog` },
      ...(product.category
        ? [{
            '@type': 'ListItem',
            position: 3,
            name: product.category,
            item: `${site.url}/catalog?category=${encodeURIComponent(product.category)}`,
          }]
        : []),
      {
        '@type': 'ListItem',
        position: product.category ? 4 : 3,
        name: product.name,
        item: url,
      },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(productJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />
      <ProductDetail product={product} related={related} />
    </>
  );
}
