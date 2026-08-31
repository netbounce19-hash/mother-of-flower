'use client';

import { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import { products } from '@/data/products';
import ProductCard from './ProductCard';
import { RotateCcw, Sparkles } from 'lucide-react';

// Exact prices extracted from the user screenshot
const EXACT_PRICES = [
  120, 150, 160, 170, 200, 220, 250, 270, 290,
  320, 350, 370, 400, 450, 500, 530, 550, 570,
  600, 650, 700, 750, 800,
];

export default function ProductGrid() {
  const [selectedPrice, setSelectedPrice] = useState<number | null>(null);

  const displayedProducts = useMemo(() => {
    if (selectedPrice === null) return products;
    return products.filter((p) => p.price === selectedPrice);
  }, [selectedPrice]);

  return (
    <div style={{ width: '100%', backgroundColor: '#FDFDFD' }}>
      <section id="catalog" className="site-container site-section">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] }}
          style={{ marginBottom: 40, display: 'flex', flexDirection: 'row', alignItems: 'flex-end', justifyContent: 'space-between', gap: 32, flexWrap: 'wrap' }}
        >
          <div>
            <p style={{ fontSize: 13, fontWeight: 700, letterSpacing: '0.04em', textTransform: 'uppercase', color: '#8A6A2E', marginBottom: 12 }}>
              The Collection
            </p>
            <h2 style={{ fontFamily: "var(--font-serif)", fontWeight: 500, fontSize: 'clamp(2.2rem, 5vw, 3.8rem)', color: '#1C1C1C', lineHeight: 1.05 }}>
              Curated Arrangements
            </h2>
          </div>
          <p style={{ fontSize: 14, color: '#555555', fontWeight: 500, lineHeight: 1.7, maxWidth: 360 }}>
            Each piece is hand-composed in our Las Vegas studio with seasonal premium blooms. Filter by your preferred budget below:
          </p>
        </motion.div>

        {/* ── FILTER BY EXACT PRICE ── */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="mb-12 pb-6 border-b border-[#E5E2DB]"
        >
          <div className="flex items-center justify-between gap-4 mb-3 flex-wrap">
            <span className="text-[11px] font-bold uppercase tracking-[0.2em] text-[#1C1C1C]">
              Filter by Exact Price
            </span>

            {selectedPrice !== null && (
              <button
                onClick={() => setSelectedPrice(null)}
                className="inline-flex items-center gap-1.5 text-[11px] font-bold uppercase tracking-wider text-[#8A6A2E] hover:text-[#1C1C1C] transition-colors cursor-pointer"
              >
                <RotateCcw size={12} /> Show all bouquets
              </button>
            )}
          </div>

          {/* Price Pills Container */}
          <div className="flex items-center gap-2 overflow-x-auto pb-3 pt-1 custom-scrollbar">
            {/* All Prices Pill */}
            <button
              onClick={() => setSelectedPrice(null)}
              className={`flex-shrink-0 px-4 py-2 rounded-full text-[12px] font-bold uppercase tracking-wider transition-all duration-300 border ${
                selectedPrice === null
                  ? 'bg-[#1C1C1C] text-[#FDFDFD] border-[#1C1C1C] shadow-sm'
                  : 'bg-[#FDFDFD] text-[#555] border-[#E5E2DB] hover:border-[#1C1C1C] hover:text-[#1C1C1C]'
              }`}
            >
              All Prices
            </button>

            {/* Exact Price Pills */}
            {EXACT_PRICES.map((price) => {
              const isSelected = selectedPrice === price;
              const hasItems = products.some((p) => p.price === price);
              return (
                <button
                  key={price}
                  onClick={() => setSelectedPrice(isSelected ? null : price)}
                  className={`flex-shrink-0 px-3.5 py-2 rounded-full text-[12px] font-bold tracking-wide transition-all duration-300 border ${
                    isSelected
                      ? 'bg-[#C9A96E] text-[#FDFDFD] border-[#C9A96E] shadow-sm scale-105'
                      : hasItems
                      ? 'bg-[#FDFDFD] text-[#1C1C1C] border-[#E5E2DB] hover:border-[#C9A96E] hover:text-[#8A6A2E]'
                      : 'bg-[#FAF8F4] text-[#666666] border-[#E5E2DB] hover:border-[#1C1C1C] hover:text-[#1C1C1C]'
                  }`}
                >
                  ${price}
                </button>
              );
            })}
          </div>
        </motion.div>

        {/* Uniform Grid / Filter Results */}
        <AnimatePresence mode="wait">
          {displayedProducts.length === 0 ? (
            <motion.div
              key="empty-state"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              className="flex flex-col items-center justify-center py-16 px-6 text-center bg-[#FAF8F4] border border-[#E5E2DB] rounded-[3px]"
            >
              <Sparkles size={28} className="text-[#C9A96E] mb-3" />
              <h3 className="font-serif text-[24px] text-[#1C1C1C] mb-2">
                Custom Bouquet for ${selectedPrice}
              </h3>
              <p className="text-[14px] text-[#666666] max-w-[480px] mb-6 leading-relaxed">
                We can handcraft a bespoke designer bouquet tailored exactly to your budget of <strong>${selectedPrice}</strong> using today&apos;s freshest seasonal blooms.
              </p>
              <div className="flex flex-wrap items-center justify-center gap-4">
                <a
                  href="#custom-request"
                  className="px-8 py-3.5 bg-[#1C1C1C] text-[#FDFDFD] text-[12px] font-bold uppercase tracking-wider rounded-[2px] hover:bg-[#C9A96E] transition-colors"
                >
                  Request ${selectedPrice} Custom Bouquet
                </a>
                <button
                  onClick={() => setSelectedPrice(null)}
                  className="px-6 py-3.5 border border-[#1C1C1C] text-[#1C1C1C] text-[12px] font-bold uppercase tracking-wider rounded-[2px] hover:bg-[#FAF8F4] transition-colors"
                >
                  View All Bouquets
                </button>
              </div>
            </motion.div>
          ) : (
            <motion.div
              key={`grid-${selectedPrice ?? 'all'}`}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.4 }}
              style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', gap: '40px' }}
            >
              {displayedProducts.map((product, i) => (
                <ProductCard key={product.id} product={product} index={i} />
              ))}

              {/* View Full Catalog Tile */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.8, delay: 0.1, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] }}
                className="flex items-center justify-center w-full"
                style={{ minHeight: '100%' }}
              >
                <Link
                  href="/catalog"
                  className="inline-flex items-center justify-center transition-all duration-300 w-fit group"
                  style={{
                    backgroundColor: 'transparent',
                    color: '#1C1C1C',
                    border: '1px solid #D1D1D1',
                    padding: '16px 40px',
                    fontSize: '13px',
                    letterSpacing: '0.04em',
                    textTransform: 'uppercase',
                    fontWeight: 700,
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.borderColor = '#1C1C1C';
                    e.currentTarget.style.backgroundColor = '#1C1C1C';
                    e.currentTarget.style.color = '#FDFDFD';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.borderColor = '#D1D1D1';
                    e.currentTarget.style.backgroundColor = 'transparent';
                    e.currentTarget.style.color = '#1C1C1C';
                  }}
                >
                  View Full Catalog
                </Link>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </section>
    </div>
  );
}
