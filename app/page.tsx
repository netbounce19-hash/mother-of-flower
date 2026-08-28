'use client';

import { useState } from 'react';
import HeroSection from '@/components/hero/HeroSection';
import ProductGrid from '@/components/products/ProductGrid';
import OccasionsSection from '@/components/occasions/OccasionsSection';
import AboutSection from '@/components/about/AboutSection';
import InstagramReels from '@/components/social/InstagramReels';
import ProductModal from '@/components/products/ProductModal';
import CustomRequestSection from '@/components/contact/CustomRequestSection';
import LocationSection from '@/components/contact/LocationSection';
import { Product } from '@/types';

export default function HomePage() {
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

  return (
    <>
      <HeroSection />

      <ProductGrid onProductClick={setSelectedProduct} />

      {/* Occasions overview */}
      <OccasionsSection />

      {/* "About" editorial section */}
      <AboutSection />

      {/* Instagram Reels video showcase */}
      <InstagramReels />

      {/* Bespoke Custom Request Form */}
      <CustomRequestSection />

      {/* Location and Delivery Map Widget */}
      <LocationSection />

      {/* Product Modal */}
      <ProductModal product={selectedProduct} onClose={() => setSelectedProduct(null)} />
    </>
  );
}
