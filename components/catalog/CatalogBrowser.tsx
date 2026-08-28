'use client';

import { useState, useMemo, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, ChevronUp, Search, SlidersHorizontal, X, RotateCcw } from 'lucide-react';
import { products } from '@/data/products';
import { Product } from '@/types';
import ProductCard from '@/components/products/ProductCard';
import ProductModal from '@/components/products/ProductModal';

// Categories matching luxury florist standards & user requests
const CATEGORIES = [
  'All Bouquets',
  'Wedding Bouquets',
  'Bouquets',
  'Bouquets in Vases',
  'Ceremony Decor',
  'Custom Packages',
  'Sympathy Arrangements',
];

// Exact prices extracted from the user screenshot
const EXACT_PRICES = [
  120, 150, 160, 170, 200, 220, 250, 270, 290,
  320, 350, 370, 400, 450, 500, 530, 550, 570,
  600, 650, 700, 750, 800,
];

// Price Range Tiers
const PRICE_TIERS = [
  { label: 'All Prices', min: 0, max: Infinity },
  { label: 'Under $200', min: 0, max: 199 },
  { label: '$200 – $400', min: 200, max: 400 },
  { label: '$400 – $600', min: 401, max: 600 },
  { label: '$600+', min: 601, max: Infinity },
];

const COLORS = [
  { name: 'White', hex: '#FFFFFF', border: '#E5E5E5' },
  { name: 'Pink', hex: '#EC4899', border: 'transparent' },
  { name: 'Red', hex: '#DC2626', border: 'transparent' },
  { name: 'Beige', hex: '#F5E6D3', border: 'transparent' },
  { name: 'Blue', hex: '#3B82F6', border: 'transparent' },
  { name: 'Gray', hex: '#A3A3A3', border: 'transparent' },
];

function CatalogContent() {
  const searchParams = useSearchParams();
  const initialCategoryParam = searchParams.get('category');

  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [categoriesOpen, setCategoriesOpen] = useState(true);
  const [exactPriceOpen, setExactPriceOpen] = useState(true);
  const [priceTiersOpen, setPriceTiersOpen] = useState(false);
  const [coloursOpen, setColoursOpen] = useState(true);

  const [mobileFilterOpen, setMobileFilterOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string | null>(initialCategoryParam);
  const [selectedExactPrice, setSelectedExactPrice] = useState<number | null>(null);
  const [selectedTierIndex, setSelectedTierIndex] = useState<number>(0);
  const [selectedColor, setSelectedColor] = useState<string | null>(null);
  const [sortBy, setSortBy] = useState<'featured' | 'price-asc' | 'price-desc' | 'name'>('featured');

  // Filter & Sort Logic
  const filteredProducts = useMemo(() => {
    return products.filter((p) => {
      // Search query
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        const matchName = p.name.toLowerCase().includes(q);
        const matchDesc = p.description.toLowerCase().includes(q);
        const matchTag = p.tagline.toLowerCase().includes(q);
        if (!matchName && !matchDesc && !matchTag) return false;
      }

      // Category
      if (selectedCategory && selectedCategory !== 'All Bouquets') {
        if (p.category !== selectedCategory) return false;
      }

      // Exact price filter
      if (selectedExactPrice !== null) {
        if (p.price !== selectedExactPrice) return false;
      }

      // Price tier filter (if exact price not selected)
      if (selectedExactPrice === null && selectedTierIndex > 0) {
        const tier = PRICE_TIERS[selectedTierIndex];
        if (p.price < tier.min || p.price > tier.max) return false;
      }

      // Color filter
      if (selectedColor) {
        if (p.color && p.color.toLowerCase() !== selectedColor.toLowerCase()) {
          return false;
        }
      }

      return true;
    }).sort((a, b) => {
      if (sortBy === 'price-asc') return a.price - b.price;
      if (sortBy === 'price-desc') return b.price - a.price;
      if (sortBy === 'name') return a.name.localeCompare(b.name);
      return (b.featured ? 1 : 0) - (a.featured ? 1 : 0);
    });
  }, [searchQuery, selectedCategory, selectedExactPrice, selectedTierIndex, selectedColor, sortBy]);

  const activeFiltersCount =
    (selectedCategory && selectedCategory !== 'All Bouquets' ? 1 : 0) +
    (selectedExactPrice !== null ? 1 : 0) +
    (selectedTierIndex > 0 ? 1 : 0) +
    (selectedColor ? 1 : 0) +
    (searchQuery.trim() ? 1 : 0);

  const resetAllFilters = () => {
    setSelectedCategory(null);
    setSelectedExactPrice(null);
    setSelectedTierIndex(0);
    setSelectedColor(null);
    setSearchQuery('');
  };

  return (
    <div className="w-full min-h-screen bg-[#FAF9F6] pb-24" style={{ paddingTop: 130 }}>
      <div style={{ maxWidth: 1440, margin: '0 auto', paddingLeft: 'clamp(20px, 5vw, 72px)', paddingRight: 'clamp(20px, 5vw, 72px)' }}>

        {/* Page Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-8 border-b border-[#E5E2DB]">
          <div>
            <p className="text-[11px] font-bold uppercase tracking-[0.25em] text-[#C9A96E] mb-2">
              Bespoke Floristry · Las Vegas
            </p>
            <h1 className="font-serif text-[clamp(2.4rem,4.5vw,3.6rem)] text-[#1C1C1C] leading-[1.08] font-normal">
              Curated Collections
            </h1>
          </div>

          {/* Search bar & Sort Controls */}
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
            {/* Search */}
            <div className="relative flex items-center min-w-[240px]">
              <Search size={15} className="absolute left-3.5 text-[#8A8A8A] pointer-events-none" />
              <input
                type="text"
                placeholder="Search bouquets or flowers..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-9 py-2.5 bg-[#FDFDFD] border border-[#E5E2DB] rounded-full text-[13px] text-[#1C1C1C] placeholder:text-[#999] focus:outline-none focus:border-[#1C1C1C] transition-colors"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="absolute right-3 text-[#8A8A8A] hover:text-[#1C1C1C]"
                >
                  <X size={14} />
                </button>
              )}
            </div>

            {/* Sort Dropdown */}
            <div className="relative">
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as any)}
                className="w-full sm:w-auto appearance-none bg-[#FDFDFD] border border-[#E5E2DB] rounded-full px-5 py-2.5 pr-10 text-[13px] font-semibold text-[#1C1C1C] cursor-pointer focus:outline-none focus:border-[#1C1C1C]"
              >
                <option value="featured">Sort: Curated / Featured</option>
                <option value="price-asc">Price: Low to High</option>
                <option value="price-desc">Price: High to Low</option>
                <option value="name">Name: A to Z</option>
              </select>
              <ChevronDown size={14} className="absolute right-4 top-1/2 -translate-y-1/2 text-[#8A8A8A] pointer-events-none" />
            </div>

            {/* Mobile Filter Toggle */}
            <button
              onClick={() => setMobileFilterOpen(true)}
              className="lg:hidden flex items-center justify-center gap-2 bg-[#1C1C1C] text-[#FDFDFD] rounded-full px-5 py-2.5 text-[12px] font-bold uppercase tracking-wider"
            >
              <SlidersHorizontal size={14} />
              Filters {activeFiltersCount > 0 && `(${activeFiltersCount})`}
            </button>
          </div>
        </div>

        {/* Active Filter Chips */}
        {activeFiltersCount > 0 && (
          <div className="flex items-center flex-wrap gap-2 py-4 border-b border-[#E5E2DB]">
            <span className="text-[12px] text-[#8A8A8A] font-medium mr-1">Active filters:</span>

            {selectedCategory && selectedCategory !== 'All Bouquets' && (
              <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-[#1C1C1C] text-[#FDFDFD] rounded-full text-[11px] font-semibold">
                {selectedCategory}
                <button onClick={() => setSelectedCategory(null)}><X size={12} /></button>
              </span>
            )}

            {selectedExactPrice !== null && (
              <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-[#C9A96E] text-[#FDFDFD] rounded-full text-[11px] font-semibold">
                Price: ${selectedExactPrice}
                <button onClick={() => setSelectedExactPrice(null)}><X size={12} /></button>
              </span>
            )}

            {selectedExactPrice === null && selectedTierIndex > 0 && (
              <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-[#1C1C1C] text-[#FDFDFD] rounded-full text-[11px] font-semibold">
                {PRICE_TIERS[selectedTierIndex].label}
                <button onClick={() => setSelectedTierIndex(0)}><X size={12} /></button>
              </span>
            )}

            {selectedColor && (
              <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-[#1C1C1C] text-[#FDFDFD] rounded-full text-[11px] font-semibold">
                Color: {selectedColor}
                <button onClick={() => setSelectedColor(null)}><X size={12} /></button>
              </span>
            )}

            {searchQuery && (
              <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-[#1C1C1C] text-[#FDFDFD] rounded-full text-[11px] font-semibold">
                &ldquo;{searchQuery}&rdquo;
                <button onClick={() => setSearchQuery('')}><X size={12} /></button>
              </span>
            )}

            <button
              onClick={resetAllFilters}
              className="inline-flex items-center gap-1 text-[11px] font-bold uppercase tracking-wider text-[#8A8A8A] hover:text-[#1C1C1C] ml-2 underline underline-offset-4"
            >
              <RotateCcw size={11} /> Reset all
            </button>
          </div>
        )}

        <div className="flex flex-col lg:flex-row gap-12 mt-8">

          {/* Desktop Filter Sidebar */}
          <aside className="hidden lg:flex w-[280px] flex-shrink-0 flex-col gap-6 lg:sticky lg:top-[120px] max-h-[calc(100vh-140px)] overflow-y-auto custom-scrollbar pr-3 pb-12">

            {/* 1. Categories Accordion */}
            <div className="border-b border-[#E5E2DB] pb-6">
              <button
                onClick={() => setCategoriesOpen(!categoriesOpen)}
                className="w-full flex items-center justify-between text-[14px] font-bold uppercase tracking-wider text-[#1C1C1C] py-2"
              >
                Category
                {categoriesOpen ? <ChevronUp size={15} color="#8A8A8A" /> : <ChevronDown size={15} color="#8A8A8A" />}
              </button>

              <AnimatePresence>
                {categoriesOpen && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    className="overflow-hidden"
                  >
                    <div className="flex flex-col gap-2.5 mt-3">
                      {CATEGORIES.map((cat) => {
                        const isSelected = selectedCategory === cat || (!selectedCategory && cat === 'All Bouquets');
                        return (
                          <button
                            key={cat}
                            onClick={() => setSelectedCategory(cat === 'All Bouquets' ? null : cat)}
                            className={`text-left text-[14px] transition-colors flex items-center justify-between py-1 ${
                              isSelected ? 'text-[#1C1C1C] font-bold' : 'text-[#666666] hover:text-[#1C1C1C] font-medium'
                            }`}
                          >
                            <span>{cat}</span>
                            {isSelected && <span className="w-1.5 h-1.5 rounded-full bg-[#C9A96E]" />}
                          </button>
                        );
                      })}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* 2. Exact Price Filter Accordion (From Screenshot: 120, 150, 200, 220, 320, 400, 650, 800...) */}
            <div className="border-b border-[#E5E2DB] pb-6">
              <div className="flex items-center justify-between py-2">
                <button
                  onClick={() => setExactPriceOpen(!exactPriceOpen)}
                  className="flex-1 flex items-center justify-between text-[14px] font-bold uppercase tracking-wider text-[#1C1C1C]"
                >
                  <span>Filter by Exact Price</span>
                  {exactPriceOpen ? <ChevronUp size={15} color="#8A8A8A" /> : <ChevronDown size={15} color="#8A8A8A" />}
                </button>
              </div>

              <AnimatePresence>
                {exactPriceOpen && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    className="overflow-hidden"
                  >
                    <p className="text-[11px] text-[#8A8A8A] mt-1 mb-3">
                      Select specific bouquet budget:
                    </p>
                    <div className="grid grid-cols-3 gap-1.5">
                      {EXACT_PRICES.map((price) => {
                        const isSelected = selectedExactPrice === price;
                        return (
                          <button
                            key={price}
                            onClick={() => {
                              setSelectedExactPrice(isSelected ? null : price);
                              if (!isSelected) setSelectedTierIndex(0);
                            }}
                            className={`py-1.5 px-2 rounded-[3px] text-[12px] font-semibold transition-all text-center border ${
                              isSelected
                                ? 'bg-[#1C1C1C] text-[#FDFDFD] border-[#1C1C1C]'
                                : 'bg-[#FDFDFD] text-[#444] border-[#E5E2DB] hover:border-[#1C1C1C] hover:text-[#1C1C1C]'
                            }`}
                          >
                            ${price}
                          </button>
                        );
                      })}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* 3. Price Tiers (Broad Brackets) */}
            <div className="border-b border-[#E5E2DB] pb-6">
              <button
                onClick={() => setPriceTiersOpen(!priceTiersOpen)}
                className="w-full flex items-center justify-between text-[14px] font-bold uppercase tracking-wider text-[#1C1C1C] py-2"
              >
                Price Range
                {priceTiersOpen ? <ChevronUp size={15} color="#8A8A8A" /> : <ChevronDown size={15} color="#8A8A8A" />}
              </button>

              <AnimatePresence>
                {priceTiersOpen && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    className="overflow-hidden"
                  >
                    <div className="flex flex-col gap-2.5 mt-3">
                      {PRICE_TIERS.map((tier, idx) => {
                        const isSelected = selectedExactPrice === null && selectedTierIndex === idx;
                        return (
                          <button
                            key={tier.label}
                            onClick={() => {
                              setSelectedTierIndex(idx);
                              setSelectedExactPrice(null);
                            }}
                            className={`text-left text-[14px] transition-colors flex items-center justify-between py-1 ${
                              isSelected ? 'text-[#1C1C1C] font-bold' : 'text-[#666666] hover:text-[#1C1C1C] font-medium'
                            }`}
                          >
                            <span>{tier.label}</span>
                            {isSelected && <span className="w-1.5 h-1.5 rounded-full bg-[#C9A96E]" />}
                          </button>
                        );
                      })}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* 4. Colour Accordion */}
            <div className="border-b border-[#E5E2DB] pb-6">
              <button
                onClick={() => setColoursOpen(!coloursOpen)}
                className="w-full flex items-center justify-between text-[14px] font-bold uppercase tracking-wider text-[#1C1C1C] py-2"
              >
                Palette / Colour
                {coloursOpen ? <ChevronUp size={15} color="#8A8A8A" /> : <ChevronDown size={15} color="#8A8A8A" />}
              </button>

              <AnimatePresence>
                {coloursOpen && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    className="overflow-hidden"
                  >
                    <div className="flex flex-col gap-3 mt-4">
                      {COLORS.map((col) => {
                        const isSelected = selectedColor === col.name;
                        return (
                          <button
                            key={col.name}
                            onClick={() => setSelectedColor(isSelected ? null : col.name)}
                            className="flex items-center gap-3 cursor-pointer group text-left"
                          >
                            <div
                              className={`w-4 h-4 rounded-full border transition-all ${
                                isSelected ? 'ring-2 ring-offset-2 ring-[#1C1C1C] scale-110' : ''
                              }`}
                              style={{
                                backgroundColor: col.hex,
                                borderColor: col.border !== 'transparent' ? col.border : col.hex,
                              }}
                            />
                            <span className={`text-[14px] transition-colors ${
                              isSelected ? 'text-[#1C1C1C] font-bold' : 'text-[#666] group-hover:text-[#1C1C1C]'
                            }`}>
                              {col.name}
                            </span>
                          </button>
                        );
                      })}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

          </aside>

          {/* Main Grid Section */}
          <main className="flex-1">
            <div className="flex items-center justify-between mb-6">
              <p className="text-[13px] font-semibold text-[#8A8A8A] uppercase tracking-wider">
                Showing {filteredProducts.length} {filteredProducts.length === 1 ? 'Bouquet' : 'Bouquets'}
              </p>
            </div>

            {filteredProducts.length === 0 ? (
              <div className="flex flex-col items-center justify-center py-20 px-4 text-center bg-[#FDFDFD] border border-[#E5E2DB] rounded-[3px]">
                <p className="font-serif text-[26px] text-[#1C1C1C] mb-2">No arrangements found</p>
                <p className="text-[14px] text-[#8A8A8A] max-w-[400px] mb-6">
                  We couldn&apos;t find bouquets matching your exact filters. Try choosing a different price or resetting filters.
                </p>
                <button
                  onClick={resetAllFilters}
                  className="px-8 py-3 bg-[#1C1C1C] text-[#FDFDFD] text-[12px] font-bold uppercase tracking-wider rounded-[2px] hover:bg-[#C9A96E] transition-colors"
                >
                  View All Bouquets
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-x-8 gap-y-12">
                {filteredProducts.map((product, i) => (
                  <ProductCard
                    key={product.id}
                    product={product}
                    index={i}
                    onClick={setSelectedProduct}
                  />
                ))}
              </div>
            )}
          </main>

        </div>
      </div>

      {/* Mobile Filter Modal Drawer */}
      <AnimatePresence>
        {mobileFilterOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setMobileFilterOpen(false)}
              className="fixed inset-0 bg-[#1C1C1C]/50 backdrop-blur-sm z-[90] lg:hidden"
            />
            <motion.div
              initial={{ y: '100%' }}
              animate={{ y: 0 }}
              exit={{ y: '100%' }}
              transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
              className="fixed inset-x-0 bottom-0 top-[100px] bg-[#FDFDFD] rounded-t-2xl z-[100] flex flex-col lg:hidden shadow-2xl"
            >
              {/* Drawer Header */}
              <div className="flex items-center justify-between p-5 border-b border-[#E5E2DB]">
                <div className="flex items-center gap-2">
                  <SlidersHorizontal size={16} />
                  <span className="font-bold text-[16px] text-[#1C1C1C]">Filters &amp; Price</span>
                </div>
                <button
                  onClick={() => setMobileFilterOpen(false)}
                  className="p-2 rounded-full hover:bg-[#F0EFEA]"
                >
                  <X size={20} />
                </button>
              </div>

              {/* Drawer Content (Scrollable) */}
              <div className="flex-1 overflow-y-auto p-6 flex flex-col gap-6">

                {/* Categories */}
                <div>
                  <h3 className="text-[12px] font-bold uppercase tracking-wider text-[#8A8A8A] mb-3">Categories</h3>
                  <div className="flex flex-wrap gap-2">
                    {CATEGORIES.map((cat) => {
                      const isSelected = selectedCategory === cat || (!selectedCategory && cat === 'All Bouquets');
                      return (
                        <button
                          key={cat}
                          onClick={() => setSelectedCategory(cat === 'All Bouquets' ? null : cat)}
                          className={`px-4 py-2 rounded-full text-[13px] font-semibold border transition-colors ${
                            isSelected
                              ? 'bg-[#1C1C1C] text-[#FDFDFD] border-[#1C1C1C]'
                              : 'bg-[#FAF9F6] text-[#444] border-[#E5E2DB]'
                          }`}
                        >
                          {cat}
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Exact Price */}
                <div>
                  <h3 className="text-[12px] font-bold uppercase tracking-wider text-[#8A8A8A] mb-3">Exact Price ($)</h3>
                  <div className="grid grid-cols-4 gap-2">
                    {EXACT_PRICES.map((price) => {
                      const isSelected = selectedExactPrice === price;
                      return (
                        <button
                          key={price}
                          onClick={() => {
                            setSelectedExactPrice(isSelected ? null : price);
                            if (!isSelected) setSelectedTierIndex(0);
                          }}
                          className={`py-2 text-[12px] font-bold rounded-md border text-center transition-colors ${
                            isSelected
                              ? 'bg-[#C9A96E] text-[#FDFDFD] border-[#C9A96E]'
                              : 'bg-[#FAF9F6] text-[#444] border-[#E5E2DB]'
                          }`}
                        >
                          ${price}
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Color */}
                <div>
                  <h3 className="text-[12px] font-bold uppercase tracking-wider text-[#8A8A8A] mb-3">Color Palette</h3>
                  <div className="flex flex-wrap gap-3">
                    {COLORS.map((col) => {
                      const isSelected = selectedColor === col.name;
                      return (
                        <button
                          key={col.name}
                          onClick={() => setSelectedColor(isSelected ? null : col.name)}
                          className={`flex items-center gap-2 px-3.5 py-1.5 rounded-full border text-[12px] font-semibold ${
                            isSelected
                              ? 'bg-[#1C1C1C] text-[#FDFDFD] border-[#1C1C1C]'
                              : 'bg-[#FAF9F6] text-[#444] border-[#E5E2DB]'
                          }`}
                        >
                          <div
                            className="w-3 h-3 rounded-full border"
                            style={{ backgroundColor: col.hex, borderColor: col.border !== 'transparent' ? col.border : col.hex }}
                          />
                          {col.name}
                        </button>
                      );
                    })}
                  </div>
                </div>

              </div>

              {/* Drawer Footer */}
              <div className="p-5 border-t border-[#E5E2DB] bg-[#FAF9F6] flex gap-3">
                <button
                  onClick={resetAllFilters}
                  className="flex-1 py-3 border border-[#E5E2DB] text-[#1C1C1C] rounded-[3px] text-[12px] font-bold uppercase tracking-wider"
                >
                  Reset
                </button>
                <button
                  onClick={() => setMobileFilterOpen(false)}
                  className="flex-2 py-3 bg-[#1C1C1C] text-[#FDFDFD] rounded-[3px] text-[12px] font-bold uppercase tracking-wider"
                >
                  Show Results ({filteredProducts.length})
                </button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      <ProductModal product={selectedProduct} onClose={() => setSelectedProduct(null)} />
    </div>
  );
}

export default function CatalogBrowser() {
  return (
    <Suspense fallback={<div className="w-full min-h-screen bg-[#FAF9F6] pt-32 text-center">Loading collection...</div>}>
      <CatalogContent />
    </Suspense>
  );
}
