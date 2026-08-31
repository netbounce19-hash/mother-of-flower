'use client';

import { Suspense, useCallback, useMemo, useState } from 'react';
import Link from 'next/link';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { AnimatePresence, motion } from 'framer-motion';
import { ChevronDown, RotateCcw, Search, SlidersHorizontal, X } from 'lucide-react';
import { products } from '@/data/products';
import ProductCard from '@/components/products/ProductCard';
import CatalogFilters, { CatalogFilterState } from '@/components/catalog/CatalogFilters';
import { catalogFacets } from '@/lib/catalog';
import { useOverlay } from '@/hooks/useOverlay';

type SortKey = 'featured' | 'price-asc' | 'price-desc' | 'name';

const SORT_LABELS: Record<SortKey, string> = {
  featured: 'Sort: Curated / Featured',
  'price-asc': 'Price: Low to High',
  'price-desc': 'Price: High to Low',
  name: 'Name: A to Z',
};

/** Options are derived from the catalogue, never hardcoded. */
const FACETS = catalogFacets();

function CatalogContent() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const [mobileFilterOpen, setMobileFilterOpen] = useState(false);

  // ── Filter state lives in the URL ──────────────────────────────────────
  // Reading from searchParams rather than useState means a filtered view can
  // be copied and shared, Back undoes the last filter, and a reload keeps the
  // selection. Previously only the incoming ?category was honoured.
  const category = searchParams.get('category');
  const color = searchParams.get('color');
  const search = searchParams.get('q') ?? '';
  const sortParam = searchParams.get('sort');
  const sortBy: SortKey = (sortParam && sortParam in SORT_LABELS ? sortParam : 'featured') as SortKey;
  const priceFrom = Number(searchParams.get('from') ?? FACETS.priceMin);
  const priceTo = Number(searchParams.get('to') ?? FACETS.priceMax);

  const filterState: CatalogFilterState = { category, color, priceFrom, priceTo };

  const setParams = useCallback(
    (patch: Record<string, string | null>) => {
      const next = new URLSearchParams(searchParams.toString());
      for (const [key, value] of Object.entries(patch)) {
        if (value === null || value === '') next.delete(key);
        else next.set(key, value);
      }
      const query = next.toString();
      router.replace(query ? `${pathname}?${query}` : pathname, { scroll: false });
    },
    [pathname, router, searchParams]
  );

  const handleFilterChange = useCallback(
    (patch: Partial<CatalogFilterState>) => {
      setParams({
        ...('category' in patch ? { category: patch.category ?? null } : {}),
        ...('color' in patch ? { color: patch.color ?? null } : {}),
        ...('priceFrom' in patch
          ? { from: patch.priceFrom === FACETS.priceMin ? null : String(patch.priceFrom) }
          : {}),
        ...('priceTo' in patch
          ? { to: patch.priceTo === FACETS.priceMax ? null : String(patch.priceTo) }
          : {}),
      });
    },
    [setParams]
  );

  const resetAllFilters = useCallback(() => {
    router.replace(pathname, { scroll: false });
  }, [pathname, router]);

  const filteredProducts = useMemo(() => {
    return products
      .filter((p) => {
        if (search.trim()) {
          const q = search.toLowerCase();
          const hit =
            p.name.toLowerCase().includes(q) ||
            p.description.toLowerCase().includes(q) ||
            p.tagline.toLowerCase().includes(q);
          if (!hit) return false;
        }
        if (category && p.category !== category) return false;
        if (color && (p.color ?? '').toLowerCase() !== color.toLowerCase()) return false;
        if (p.price < priceFrom || p.price > priceTo) return false;
        return true;
      })
      .sort((a, b) => {
        if (sortBy === 'price-asc') return a.price - b.price;
        if (sortBy === 'price-desc') return b.price - a.price;
        if (sortBy === 'name') return a.name.localeCompare(b.name);
        return (b.featured ? 1 : 0) - (a.featured ? 1 : 0);
      });
  }, [search, category, color, priceFrom, priceTo, sortBy]);

  const activeFiltersCount =
    (category ? 1 : 0) +
    (color ? 1 : 0) +
    (priceFrom !== FACETS.priceMin || priceTo !== FACETS.priceMax ? 1 : 0) +
    (search.trim() ? 1 : 0);

  const drawerRef = useOverlay<HTMLDivElement>(mobileFilterOpen, () => setMobileFilterOpen(false));

  return (
    <div className="w-full min-h-screen bg-[#FAF8F4] pb-24" style={{ paddingTop: 130 }}>
      <div className="site-container">

        {/* Breadcrumbs */}
        <nav aria-label="Breadcrumb" className="mb-5">
          <ol className="flex items-center gap-2 text-[12px] text-[#6B6B6B]">
            <li>
              <Link href="/" className="hover:text-[#1C1C1C] underline-offset-4 hover:underline">Home</Link>
            </li>
            <li aria-hidden="true">/</li>
            <li aria-current="page" className="text-[#1C1C1C] font-semibold">Collections</li>
          </ol>
        </nav>

        {/* Page Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-8 border-b border-[#E5E2DB]">
          <div>
            <p className="text-[12px] font-bold uppercase tracking-[0.25em] text-[#8A6A2E] mb-2">
              Bespoke Floristry · Las Vegas
            </p>
            {/* h2, not h1 — the page's single h1 lives in app/catalog/page.tsx */}
            <h2 className="font-serif text-[clamp(2.4rem,4.5vw,3.6rem)] text-[#1C1C1C] leading-[1.08] font-normal">
              Curated Collections
            </h2>
          </div>

          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
            <div className="relative flex items-center min-w-[240px]">
              <Search size={15} className="absolute left-3.5 text-[#6B6B6B] pointer-events-none" aria-hidden="true" />
              <label htmlFor="catalog-search" className="sr-only">Search bouquets</label>
              <input
                id="catalog-search"
                type="search"
                placeholder="Search bouquets or flowers..."
                value={search}
                onChange={(e) => setParams({ q: e.target.value || null })}
                className="w-full pl-10 pr-9 py-2.5 bg-[#FDFDFD] border border-[#E5E2DB] rounded-full text-[13px] text-[#1C1C1C] placeholder:text-[#6B6B6B] focus:outline-none focus:border-[#1C1C1C] transition-colors"
              />
              {search && (
                <button
                  type="button"
                  aria-label="Clear search"
                  onClick={() => setParams({ q: null })}
                  className="absolute right-3 text-[#6B6B6B] hover:text-[#1C1C1C]"
                >
                  <X size={14} />
                </button>
              )}
            </div>

            <div className="relative">
              <label htmlFor="catalog-sort" className="sr-only">Sort bouquets</label>
              <select
                id="catalog-sort"
                value={sortBy}
                onChange={(e) => setParams({ sort: e.target.value === 'featured' ? null : e.target.value })}
                className="w-full sm:w-auto appearance-none bg-[#FDFDFD] border border-[#E5E2DB] rounded-full px-5 py-2.5 pr-10 text-[13px] font-semibold text-[#1C1C1C] cursor-pointer focus:outline-none focus:border-[#1C1C1C]"
              >
                {(Object.keys(SORT_LABELS) as SortKey[]).map((key) => (
                  <option key={key} value={key}>{SORT_LABELS[key]}</option>
                ))}
              </select>
              <ChevronDown size={14} className="absolute right-4 top-1/2 -translate-y-1/2 text-[#6B6B6B] pointer-events-none" aria-hidden="true" />
            </div>

            <button
              type="button"
              onClick={() => setMobileFilterOpen(true)}
              className="lg:hidden flex items-center justify-center gap-2 bg-[#1C1C1C] text-[#FDFDFD] rounded-full px-5 py-2.5 text-[12px] font-bold uppercase tracking-wider"
            >
              <SlidersHorizontal size={14} aria-hidden="true" />
              Filters {activeFiltersCount > 0 && `(${activeFiltersCount})`}
            </button>
          </div>
        </div>

        {/* Active Filter Chips */}
        {activeFiltersCount > 0 && (
          <div className="flex items-center flex-wrap gap-2 py-4 border-b border-[#E5E2DB]">
            <span className="text-[12px] text-[#6B6B6B] font-medium mr-1">Active filters:</span>

            {category && (
              <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-[#1C1C1C] text-[#FDFDFD] rounded-full text-[12px] font-semibold">
                {category}
                <button type="button" aria-label={`Remove ${category} filter`} onClick={() => setParams({ category: null })}><X size={12} /></button>
              </span>
            )}

            {(priceFrom !== FACETS.priceMin || priceTo !== FACETS.priceMax) && (
              <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-[#1C1C1C] text-[#FDFDFD] rounded-full text-[12px] font-semibold">
                ${priceFrom} – ${priceTo}
                <button type="button" aria-label="Reset price range" onClick={() => setParams({ from: null, to: null })}><X size={12} /></button>
              </span>
            )}

            {color && (
              <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-[#1C1C1C] text-[#FDFDFD] rounded-full text-[12px] font-semibold">
                Color: {color}
                <button type="button" aria-label={`Remove ${color} filter`} onClick={() => setParams({ color: null })}><X size={12} /></button>
              </span>
            )}

            {search && (
              <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-[#1C1C1C] text-[#FDFDFD] rounded-full text-[12px] font-semibold">
                &ldquo;{search}&rdquo;
                <button type="button" aria-label="Clear search" onClick={() => setParams({ q: null })}><X size={12} /></button>
              </span>
            )}

            <button
              type="button"
              onClick={resetAllFilters}
              className="inline-flex items-center gap-1 text-[12px] font-bold uppercase tracking-wider text-[#6B6B6B] hover:text-[#1C1C1C] ml-2 underline underline-offset-4"
            >
              <RotateCcw size={11} aria-hidden="true" /> Reset all
            </button>
          </div>
        )}

        <div className="flex flex-col lg:flex-row gap-12 mt-8">
          <aside
            aria-label="Catalogue filters"
            className="hidden lg:flex w-[280px] flex-shrink-0 flex-col gap-6 lg:sticky lg:top-[120px] max-h-[calc(100vh-140px)] overflow-y-auto custom-scrollbar pr-3 pb-12"
          >
            <CatalogFilters facets={FACETS} state={filterState} onChange={handleFilterChange} />
          </aside>

          <main id="main" className="flex-1">
            <div className="flex items-center justify-between mb-6">
              {/* Announced to screen readers whenever the filters change. */}
              <p
                aria-live="polite"
                className="text-[13px] font-semibold text-[#6B6B6B] uppercase tracking-wider"
              >
                Showing {filteredProducts.length} {filteredProducts.length === 1 ? 'Bouquet' : 'Bouquets'}
              </p>
            </div>

            {filteredProducts.length === 0 ? (
              <div className="flex flex-col items-center justify-center py-20 px-4 text-center bg-[#FDFDFD] border border-[#E5E2DB] rounded-[3px]">
                <p className="font-serif text-[26px] text-[#1C1C1C] mb-2">No arrangements found</p>
                <p className="text-[14px] text-[#6B6B6B] max-w-[400px] mb-6">
                  We couldn&apos;t find bouquets matching your filters. Try widening the
                  price range or resetting them.
                </p>
                <button
                  type="button"
                  onClick={resetAllFilters}
                  className="px-8 py-3 bg-[#1C1C1C] text-[#FDFDFD] text-[12px] font-bold uppercase tracking-wider rounded-[2px] hover:bg-[#C9A96E] transition-colors"
                >
                  View All Bouquets
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-x-8 gap-y-12">
                {filteredProducts.map((product, i) => (
                  <ProductCard key={product.id} product={product} index={i} />
                ))}
              </div>
            )}
          </main>
        </div>
      </div>

      {/* Mobile Filter Drawer */}
      <AnimatePresence>
        {mobileFilterOpen && (
          <motion.div
            key="filter-backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setMobileFilterOpen(false)}
            className="fixed inset-0 bg-[#1C1C1C]/50 backdrop-blur-sm z-[90] lg:hidden"
          />
        )}

        {mobileFilterOpen && (
          <motion.div
            key="filter-drawer"
            ref={drawerRef}
            role="dialog"
            aria-modal="true"
            aria-label="Filters"
            tabIndex={-1}
            initial={{ y: '100%' }}
            animate={{ y: 0 }}
            exit={{ y: '100%' }}
            transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
            className="fixed inset-x-0 bottom-0 top-[100px] bg-[#FDFDFD] rounded-t-2xl z-[100] flex flex-col lg:hidden shadow-2xl"
          >
            <div className="flex items-center justify-between p-5 border-b border-[#E5E2DB]">
              <div className="flex items-center gap-2">
                <SlidersHorizontal size={16} aria-hidden="true" />
                <span className="font-bold text-[16px] text-[#1C1C1C]">Filters &amp; Price</span>
              </div>
              <button
                type="button"
                aria-label="Close filters"
                onClick={() => setMobileFilterOpen(false)}
                className="p-2 rounded-full hover:bg-[#F7F5F2]"
              >
                <X size={20} />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto p-6 flex flex-col gap-6">
              <CatalogFilters
                facets={FACETS}
                state={filterState}
                onChange={handleFilterChange}
                variant="drawer"
              />
            </div>

            <div className="p-5 border-t border-[#E5E2DB] bg-[#FAF8F4] flex gap-3">
              <button
                type="button"
                onClick={resetAllFilters}
                className="flex-1 py-3 border border-[#E5E2DB] text-[#1C1C1C] rounded-[3px] text-[12px] font-bold uppercase tracking-wider"
              >
                Reset
              </button>
              <button
                type="button"
                onClick={() => setMobileFilterOpen(false)}
                className="flex-[2] py-3 bg-[#1C1C1C] text-[#FDFDFD] rounded-[3px] text-[12px] font-bold uppercase tracking-wider"
              >
                Show Results ({filteredProducts.length})
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

    </div>
  );
}

export default function CatalogBrowser() {
  return (
    <Suspense
      fallback={
        <div className="w-full min-h-screen bg-[#FAF8F4] pt-32 text-center text-[#6B6B6B]">
          Loading collection…
        </div>
      }
    >
      <CatalogContent />
    </Suspense>
  );
}
