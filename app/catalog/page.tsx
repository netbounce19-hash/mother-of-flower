'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, ChevronUp } from 'lucide-react';
import { products } from '@/data/products';
import { Product } from '@/types';
import ProductCard from '@/components/products/ProductCard';
import ProductModal from '@/components/products/ProductModal';

const CATEGORIES = [
  'Balloons & Gifts', 'Bouquets', 'Bouquets & Sympathy Arrangements', 
  'Bouquets in Vases', 'Boutonnières & Corsages', 'Bridal Bouquets',
  'Cake & Flowers', 'Casket Spays', 'Catalog', 'Catalog Balloons & Gifts',
  'Ceremony Decor', 'Custom Tributes', 'Custom Wedding Packages', 'Floral Arch & Backdrops'
];

const COLORS = [
  { name: 'White', hex: '#FFFFFF', border: '#E5E5E5' },
  { name: 'Gray', hex: '#A3A3A3', border: 'transparent' },
  { name: 'Beige', hex: '#F5E6D3', border: 'transparent' },
  { name: 'Green', hex: '#84CC16', border: 'transparent' },
  { name: 'Blue', hex: '#3B82F6', border: 'transparent' },
  { name: 'Pink', hex: '#EC4899', border: 'transparent' },
  { name: 'Brown', hex: '#A0522D', border: 'transparent' },
];

export default function CatalogPage() {
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [categoriesOpen, setCategoriesOpen] = useState(true);
  const [coloursOpen, setColoursOpen] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [selectedColor, setSelectedColor] = useState<string | null>(null);

  // In a real app we'd filter `products` based on selectedCategory and selectedColor.
  // Since we only have 8 dummy products, we'll just show them all for visual consistency.
  const displayedProducts = products;

  return (
    <div className="w-full min-h-screen bg-[#FAF9F6] pt-[160px] pb-24">
      <div style={{ maxWidth: 1440, margin: '0 auto', paddingLeft: 'clamp(20px, 5vw, 72px)', paddingRight: 'clamp(20px, 5vw, 72px)' }}>
        
        <div className="flex flex-col lg:flex-row gap-12 mt-8">
          
          {/* Sidebar */}
          <aside className="w-full lg:w-[260px] flex-shrink-0 flex flex-col gap-6 lg:sticky lg:top-[160px] max-h-[calc(100vh-180px)] overflow-y-auto custom-scrollbar pr-2 pb-10">
            {/* Categories Accordion */}
            <div className="border-b border-[#E5E5E5] pb-6">
              <button 
                onClick={() => setCategoriesOpen(!categoriesOpen)}
                className="w-full flex items-center justify-between text-[16px] font-bold text-[#1C1C1C] py-2"
              >
                Categories
                {categoriesOpen ? <ChevronUp size={16} color="#8A8A8A" /> : <ChevronDown size={16} color="#8A8A8A" />}
              </button>
              
              <AnimatePresence>
                {categoriesOpen && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    className="overflow-hidden"
                  >
                    <div className="flex flex-col gap-3 mt-4">
                      {CATEGORIES.map((cat) => (
                        <button
                          key={cat}
                          onClick={() => setSelectedCategory(selectedCategory === cat ? null : cat)}
                          className={`text-left text-[14px] font-medium transition-colors ${selectedCategory === cat ? 'text-[#1C1C1C]' : 'text-[#8A8A8A] hover:text-[#333333]'}`}
                        >
                          {cat}
                        </button>
                      ))}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Colour Accordion */}
            <div className="border-b border-[#E5E5E5] pb-6">
              <button 
                onClick={() => setColoursOpen(!coloursOpen)}
                className="w-full flex items-center justify-between text-[16px] font-bold text-[#1C1C1C] py-2"
              >
                Colour
                {coloursOpen ? <ChevronUp size={16} color="#8A8A8A" /> : <ChevronDown size={16} color="#8A8A8A" />}
              </button>
              
              <AnimatePresence>
                {coloursOpen && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    className="overflow-hidden"
                  >
                    <div className="flex flex-col gap-4 mt-4">
                      {COLORS.map((col) => (
                        <label key={col.name} className="flex items-center gap-3 cursor-pointer group">
                          <div className="relative flex items-center justify-center">
                            <input 
                              type="radio" 
                              name="color_filter"
                              className="peer sr-only"
                              checked={selectedColor === col.name}
                              onChange={() => setSelectedColor(col.name)}
                            />
                            <div 
                              className={`w-4 h-4 rounded-full border transition-all ${selectedColor === col.name ? 'ring-1 ring-offset-2 ring-[#1C1C1C]' : ''}`}
                              style={{ backgroundColor: col.hex, borderColor: col.border !== 'transparent' ? col.border : col.hex }}
                            />
                          </div>
                          <span className={`text-[14px] font-medium transition-colors ${selectedColor === col.name ? 'text-[#1C1C1C]' : 'text-[#8A8A8A] group-hover:text-[#333333]'}`}>
                            {col.name}
                          </span>
                        </label>
                      ))}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </aside>

          {/* Main Grid */}
          <main className="flex-1">
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-x-8 gap-y-12">
              {displayedProducts.map((product, i) => (
                <ProductCard key={product.id} product={product} index={i} onClick={setSelectedProduct} />
              ))}
            </div>
          </main>
          
        </div>
      </div>

      <ProductModal product={selectedProduct} onClose={() => setSelectedProduct(null)} />
    </div>
  );
}
