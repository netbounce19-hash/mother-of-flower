import type { Metadata } from 'next';
import './globals.css';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import { Providers } from '@/components/providers/Providers';
import CartSidebar from '@/components/cart/CartSidebar';

export const metadata: Metadata = {
  title: 'MotherOfFlower — Luxury Floral Artistry, Las Vegas',
  description:
    'Curated luxury flower arrangements delivered across Las Vegas and the US. Discover seasonal bouquets composed by master florists from the finest blooms worldwide.',
  keywords: ['luxury flowers', 'Las Vegas florist', 'flower delivery Las Vegas', 'premium bouquets'],
  openGraph: {
    title: 'MotherOfFlower — Luxury Floral Artistry, Las Vegas',
    description: 'Curated luxury flower arrangements delivered across Las Vegas.',
    type: 'website',
    locale: 'en_US',
    siteName: 'MotherOfFlower',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'MotherOfFlower — Luxury Floral Artistry, Las Vegas',
    description: 'Curated luxury flower arrangements delivered across Las Vegas.',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
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
