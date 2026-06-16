'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import HeroSection from '@/components/hero/HeroSection';
import ProductGrid from '@/components/products/ProductGrid';
import AboutSection from '@/components/about/AboutSection';
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

      {/* "About" editorial section */}
      <AboutSection />

      {/* Bespoke Custom Request Form */}
      <CustomRequestSection />

      {/* Location and Delivery Map Widget */}
      <LocationSection />

      {/* Product Modal */}
      <ProductModal product={selectedProduct} onClose={() => setSelectedProduct(null)} />
    </>
  );
}
