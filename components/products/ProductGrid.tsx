'use client';

import { motion } from 'framer-motion';
import { products } from '@/data/products';
import { Product } from '@/types';
import ProductCard from './ProductCard';

interface ProductGridProps {
  onProductClick: (product: Product) => void;
}

const SECTION_STYLE: React.CSSProperties = {
  maxWidth: 1280,
  margin: '0 auto',
  paddingLeft: 'clamp(20px, 5vw, 72px)',
  paddingRight: 'clamp(20px, 5vw, 72px)',
  paddingTop: 80,
  paddingBottom: 100,
};

export default function ProductGrid({ onProductClick }: ProductGridProps) {
  return (
    <div style={{ width: '100%' }}>
      <section id="catalog" style={SECTION_STYLE}>
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] as [number,number,number,number] }}
          style={{ marginBottom: 64, display: 'flex', flexDirection: 'row', alignItems: 'flex-end', justifyContent: 'space-between', gap: 32, flexWrap: 'wrap' }}
        >
          <div>
            <p style={{ fontSize: 11, letterSpacing: '0.35em', textTransform: 'uppercase', color: '#8A8A8A', marginBottom: 12 }}>
              The Collection
            </p>
            <h2 style={{ fontFamily: "'Cormorant Garamond', Georgia, serif", fontSize: 'clamp(2.2rem, 5vw, 4rem)', color: '#1C1C1C', lineHeight: 1.05 }}>
              Curated Arrangements
            </h2>
          </div>
          <p style={{ fontSize: 13, color: '#8A8A8A', lineHeight: 1.7, maxWidth: 300, textAlign: 'right' }}>
            Each piece is hand-composed by our master florists using only the finest seasonal blooms sourced from the world&apos;s finest farms.
          </p>
        </motion.div>

        {/* Masonry grid */}
        <div style={{ columns: 3, columnGap: 24 }} className="masonry-grid">
          {products.map((product, i) => (
            <div key={product.id} style={{ breakInside: 'avoid', marginBottom: 24 }}>
              <ProductCard product={product} index={i} onClick={onProductClick} />
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
