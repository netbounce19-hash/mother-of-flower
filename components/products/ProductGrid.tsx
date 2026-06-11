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

        {/* Uniform grid */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', gap: '40px' }}>
          {products.map((product, i) => (
            <ProductCard key={product.id} product={product} index={i} onClick={onProductClick} />
          ))}
          
          {/* Empty cell with "View Full Catalog" button in a Polaroid card */}
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, delay: 0.1, ease: [0.22, 1, 0.36, 1] as [number,number,number,number] }}
            className="w-full flex items-center justify-center"
          >
            <a 
              href="#custom-request"
              className="block w-full bg-[#FDFDFD] p-[6%] pb-[25%] shadow-[0_15px_40px_rgba(0,0,0,0.06)] hover:shadow-[0_20px_50px_rgba(0,0,0,0.12)] transition-all duration-500 rounded-[2px] relative group"
            >
              {/* Polaroid Image */}
              <div className="w-full aspect-[4/5] bg-[#F7F5F2] overflow-hidden relative">
                <img 
                  src="https://images.unsplash.com/photo-1558350315-8aa00e8e4590?q=80&w=800&auto=format&fit=crop" 
                  alt="Mother of Flower Collection" 
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" 
                />
                <div className="absolute inset-0 bg-[#1C1C1C]/5 group-hover:bg-transparent transition-colors duration-500" />
              </div>
              
              {/* Polaroid Bottom Text (Button) */}
              <div 
                className="absolute bottom-0 left-0 w-full flex items-center justify-center" 
                style={{ height: '20%' }}
              >
                <span className="text-[10px] md:text-[11px] tracking-[0.2em] uppercase text-[#8A8A8A] group-hover:text-[#1C1C1C] transition-colors pb-1 border-b border-transparent group-hover:border-[#1C1C1C]">
                  View Full Catalog ↗
                </span>
              </div>
            </a>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
