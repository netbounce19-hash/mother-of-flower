'use client';

import { motion } from 'framer-motion';
import { products } from '@/data/products';
import { Product } from '@/types';
import ProductCard from './ProductCard';

interface ProductGridProps {
  onProductClick: (product: Product) => void;
}

export default function ProductGrid({ onProductClick }: ProductGridProps) {
  return (
    <div className="w-full">
      <section id="catalog" className="max-w-7xl mx-auto px-6 md:px-12 py-20 md:py-28">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="mb-14 md:mb-20 flex flex-col md:flex-row md:items-end md:justify-between gap-4"
        >
          <div>
            <p className="text-[11px] tracking-[0.35em] uppercase mb-3" style={{ color: '#8A8A8A' }}>
              The Collection
            </p>
            <h2 className="font-serif text-[clamp(2.4rem,5vw,4rem)] leading-[1.05]" style={{ color: '#1C1C1C' }}>
              Curated Arrangements
            </h2>
          </div>
          <p className="text-[13px] leading-relaxed max-w-xs md:text-right" style={{ color: '#8A8A8A' }}>
            Each piece is hand-composed by our master florists using only the finest seasonal blooms
            sourced from the world&apos;s finest farms.
          </p>
        </motion.div>

        {/* Masonry grid */}
        <div className="w-full columns-1 sm:columns-2 lg:columns-3 gap-6 md:gap-8 space-y-6 md:space-y-8">
          {products.map((product, i) => (
            <div key={product.id} className="break-inside-avoid">
              <ProductCard product={product} index={i} onClick={onProductClick} />
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
