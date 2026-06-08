'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import HeroSection from '@/components/hero/HeroSection';
import ProductGrid from '@/components/products/ProductGrid';
import ProductModal from '@/components/products/ProductModal';
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
      <div style={{ width: '100%' }}>
        <section
          id="about"
          style={{
            maxWidth: 1280,
            margin: '0 auto',
            paddingLeft: 'clamp(20px, 5vw, 72px)',
            paddingRight: 'clamp(20px, 5vw, 72px)',
            paddingTop: 80,
            paddingBottom: 100,
            display: 'grid',
            gridTemplateColumns: 'repeat(2, 1fr)',
            gap: 80,
            alignItems: 'center',
          }}
        >
          {/* Image */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            className="relative"
          >
            <div className="arch-mask overflow-hidden w-full aspect-[3/4] bg-[#F7F5F2]">
              <img
                src="https://images.unsplash.com/photo-1487530811015-780d8174f23e?w=900&auto=format&fit=crop&q=85"
                alt="Florist arranging a luxury bouquet"
                className="w-full h-full object-cover"
              />
            </div>
            {/* Decorative label */}
            <div className="absolute -bottom-5 -right-5 w-28 h-28 rounded-full bg-[#F7F5F2] border border-[#E5E5E5] flex flex-col items-center justify-center gap-1 hidden md:flex">
              <span className="font-serif text-[11px]" style={{ color: '#1C1C1C' }}>Est.</span>
              <span className="font-serif text-[22px] leading-none" style={{ color: '#1C1C1C' }}>2019</span>
            </div>
          </motion.div>

          {/* Text */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1], delay: 0.1 }}
            className="flex flex-col gap-6"
          >
            <p className="text-[11px] tracking-[0.35em] uppercase" style={{ color: '#8A8A8A' }}>Our Story</p>
            <h2 className="font-serif text-[clamp(2.2rem,4.5vw,3.6rem)] leading-[1.08]" style={{ color: '#1C1C1C' }}>
              Flowers as a<br />
              <em>language of their own</em>
            </h2>
            <div className="w-10 h-px bg-[#C9A96E]" />
            <p className="text-[14px] leading-relaxed" style={{ color: '#8A8A8A' }}>
              MotherOfFlower was born from a single belief: that flowers, when arranged with
              intention, become something beyond decoration — they become emotion made visible.
            </p>
            <p className="text-[14px] leading-relaxed" style={{ color: '#8A8A8A' }}>
              Our master florists source only the finest seasonal blooms from the Netherlands,
              Ecuador, and Colombia, combining them into arrangements that feel effortlessly alive.
              Every piece leaves our studio having been touched only by hand.
            </p>
            <a
              href="#catalog"
              className="mt-2 inline-flex items-center gap-2 text-[12px] tracking-[0.12em] uppercase border-b pb-1 w-fit hover:opacity-50 transition-opacity duration-300"
              style={{ color: '#1C1C1C', borderColor: '#1C1C1C' }}
            >
              Explore the Collection →
            </a>
          </motion.div>
        </section>
      </div>

      {/* Product Modal */}
      <ProductModal product={selectedProduct} onClose={() => setSelectedProduct(null)} />
    </>
  );
}
