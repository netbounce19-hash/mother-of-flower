import type { Metadata } from 'next';
import './globals.css';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';

export const metadata: Metadata = {
  title: 'MotherOfFlower — Luxury Floral Artistry, Dubai',
  description:
    'Curated luxury flower arrangements delivered across the UAE. Discover seasonal bouquets composed by master florists from the finest blooms worldwide.',
  keywords: ['luxury flowers', 'Dubai florist', 'flower delivery UAE', 'premium bouquets'],
  openGraph: {
    title: 'MotherOfFlower — Luxury Floral Artistry, Dubai',
    description: 'Curated luxury flower arrangements delivered across the UAE.',
    type: 'website',
    locale: 'en_AE',
    siteName: 'MotherOfFlower',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'MotherOfFlower — Luxury Floral Artistry, Dubai',
    description: 'Curated luxury flower arrangements delivered across the UAE.',
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
        <Navbar />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
