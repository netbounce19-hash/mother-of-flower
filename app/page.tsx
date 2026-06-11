'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import HeroSection from '@/components/hero/HeroSection';
import ProductGrid from '@/components/products/ProductGrid';
import AboutSection from '@/components/about/AboutSection';
import ProductModal from '@/components/products/ProductModal';
import CustomRequestSection from '@/components/contact/CustomRequestSection';
import { Product } from '@/types';

export default function HomePage() {
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

  return (
    <>
      <HeroSection />

      {/* Marquee strip between hero and catalog */}
      <div className="overflow-hidden border-y border-[#E5E5E5] py-3 bg-[#FDFDFD]">
        <motion.div
          animate={{ x: ['0%', '-50%'] }}
          transition={{ duration: 28, repeat: Infinity, ease: 'linear' }}
          className="flex whitespace-nowrap"
        >
          {[...Array(8)].map((_, i) => (
            <span
              key={i}
              className="inline-flex items-center gap-6 px-8 text-[11px] tracking-[0.3em] uppercase text-muted"
            >
              <span>Same-Day Delivery</span>
              <span className="text-[#C9A96E]">✦</span>
              <span>Sustainably Sourced</span>
              <span className="text-[#C9A96E]">✦</span>
              <span>Handcrafted in Las Vegas</span>
              <span className="text-[#C9A96E]">✦</span>
              <span>Gift Wrapping Available</span>
              <span className="text-[#C9A96E]">✦</span>
            </span>
          ))}
        </motion.div>
      </div>

      <ProductGrid onProductClick={setSelectedProduct} />

      {/* "About" editorial section */}
      <AboutSection />

      {/* Bespoke Custom Request Form */}
      <CustomRequestSection />

      {/* Product Modal */}
      <ProductModal product={selectedProduct} onClose={() => setSelectedProduct(null)} />
    </>
  );
}
