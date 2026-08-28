import type { Metadata } from 'next';
import { Playfair_Display } from 'next/font/google';
import './globals.css';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import { Providers } from '@/components/providers/Providers';
import CartSidebar from '@/components/cart/CartSidebar';
import { site } from '@/lib/site';

const playfair = Playfair_Display({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  style: ['normal', 'italic'],
  variable: '--font-serif',
});

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: 'Mother of Flower — Luxury Floral Artistry, Las Vegas',
    template: `%s`,
  },
  description:
    'Curated luxury flower arrangements delivered across Las Vegas and the US. Discover seasonal bouquets composed by master florists from the finest blooms worldwide.',
  keywords: ['luxury flowers', 'Las Vegas florist', 'flower delivery Las Vegas', 'premium bouquets'],
  alternates: { canonical: '/' },
  openGraph: {
    title: 'Mother of Flower — Luxury Floral Artistry, Las Vegas',
    description: 'Curated luxury flower arrangements delivered across Las Vegas.',
    type: 'website',
    locale: 'en_US',
    siteName: site.name,
    url: '/',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Mother of Flower — Luxury Floral Artistry, Las Vegas',
    description: 'Curated luxury flower arrangements delivered across Las Vegas.',
  },
};

/** Local business markup — what Google needs to show hours, phone and map. */
const localBusinessJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Florist',
  name: site.name,
  url: site.url,
  telephone: site.phone.display,
  email: site.email,
  image: `${site.url}/opengraph-image`,
  address: {
    '@type': 'PostalAddress',
    streetAddress: site.address.street,
    addressLocality: site.address.city,
    addressRegion: site.address.state,
    postalCode: site.address.zip,
    addressCountry: 'US',
  },
  openingHours: site.hours.schema,
  areaServed: 'Las Vegas, Nevada',
  sameAs: [site.social.instagram],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={playfair.variable}>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessJsonLd) }}
        />
        <Providers>
          <Navbar />
          <CartSidebar />
          <main>{children}</main>
          <Footer />
        </Providers>
      </body>
    </html>
  );
}
