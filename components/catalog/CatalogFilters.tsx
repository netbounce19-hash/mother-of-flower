'use client';

import { AnimatePresence, motion } from 'framer-motion';
import { ChevronDown, ChevronUp } from 'lucide-react';
import { useState } from 'react';
import type { CatalogFacets } from '@/lib/catalog';

/** Swatches for the colours that appear in the data. */
const COLOR_SWATCHES: Record<string, string> = {
  White: '#FFFFFF',
  Pink: '#EC4899',
  Red: '#DC2626',
  Beige: '#F5E6D3',
  Blue: '#3B82F6',
  Gray: '#A3A3A3',
  Purple: '#8B5CF6',
  Yellow: '#EAB308',
  Green: '#22C55E',
  Peach: '#FDBA74',
  Cream: '#F5F0E6',
  Lavender: '#C4B5FD',
};

export interface CatalogFilterState {
  category: string | null;
  color: string | null;
  priceFrom: number;
  priceTo: number;
}

interface CatalogFiltersProps {
  facets: CatalogFacets;
  state: CatalogFilterState;
  onChange: (patch: Partial<CatalogFilterState>) => void;
  /** Compact chip layout for the mobile drawer. */
  variant?: 'sidebar' | 'drawer';
}

function Section({
  title,
  children,
  defaultOpen = true,
  variant,
}: {
  title: string;
  children: React.ReactNode;
  defaultOpen?: boolean;
  variant: 'sidebar' | 'drawer';
}) {
  const [open, setOpen] = useState(defaultOpen);

  if (variant === 'drawer') {
    return (
      <div>
        <h3 className="text-[12px] font-bold uppercase tracking-wider text-[#6B6B6B] mb-3">{title}</h3>
        {children}
      </div>
    );
  }

  return (
    <div className="border-b border-[#E5E2DB] pb-6">
      <button
        type="button"
        onClick={() => setOpen(!open)}
        aria-expanded={open}
        className="w-full flex items-center justify-between text-[14px] font-bold uppercase tracking-wider text-[#1C1C1C] py-2"
      >
        {title}
        {open ? <ChevronUp size={15} color="#6B6B6B" /> : <ChevronDown size={15} color="#6B6B6B" />}
      </button>
      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="overflow-hidden"
          >
            <div className="mt-3">{children}</div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default function CatalogFilters({
  facets,
  state,
  onChange,
  variant = 'sidebar',
}: CatalogFiltersProps) {
  const drawer = variant === 'drawer';

  return (
    <>
      <Section title="Category" variant={variant}>
        <div className={drawer ? 'flex flex-wrap gap-2' : 'flex flex-col gap-2.5'}>
          <button
            type="button"
            aria-pressed={state.category === null}
            onClick={() => onChange({ category: null })}
            className={
              drawer
                ? `px-4 py-2 rounded-full text-[13px] font-semibold border transition-colors ${
                    state.category === null
                      ? 'bg-[#1C1C1C] text-[#FDFDFD] border-[#1C1C1C]'
                      : 'bg-[#FAF8F4] text-[#444444] border-[#E5E2DB]'
                  }`
                : `text-left text-[14px] transition-colors flex items-center justify-between py-1 ${
                    state.category === null
                      ? 'text-[#1C1C1C] font-bold'
                      : 'text-[#666666] hover:text-[#1C1C1C] font-medium'
                  }`
            }
          >
            <span>All Bouquets</span>
            {!drawer && state.category === null && (
              <span className="w-1.5 h-1.5 rounded-full bg-[#C9A96E]" />
            )}
          </button>

          {/* Only categories that actually contain bouquets are offered. */}
          {facets.categories.map((facet) => {
            const selected = state.category === facet.value;
            return (
              <button
                key={facet.value}
                type="button"
                aria-pressed={selected}
                onClick={() => onChange({ category: selected ? null : facet.value })}
                className={
                  drawer
                    ? `px-4 py-2 rounded-full text-[13px] font-semibold border transition-colors ${
                        selected
                          ? 'bg-[#1C1C1C] text-[#FDFDFD] border-[#1C1C1C]'
                          : 'bg-[#FAF8F4] text-[#444444] border-[#E5E2DB]'
                      }`
                    : `text-left text-[14px] transition-colors flex items-center justify-between py-1 ${
                        selected
                          ? 'text-[#1C1C1C] font-bold'
                          : 'text-[#666666] hover:text-[#1C1C1C] font-medium'
                      }`
                }
              >
                <span>
                  {facet.value} <span className="opacity-70">({facet.count})</span>
                </span>
                {!drawer && selected && <span className="w-1.5 h-1.5 rounded-full bg-[#C9A96E]" />}
              </button>
            );
          })}
        </div>
      </Section>

      <Section title="Price Range" variant={variant}>
        {/*
          A two-thumb range replaces the old grid of 23 exact prices, which
          became unreadable as the catalogue grew and mostly returned nothing.
        */}
        <div className="flex flex-col gap-3">
          <div className="flex items-center justify-between text-[13px] font-semibold text-[#1C1C1C]">
            <span>${state.priceFrom}</span>
            <span>${state.priceTo}</span>
          </div>

          <div className="relative h-6 flex items-center">
            <div className="absolute inset-x-0 h-[3px] rounded-full bg-[#E5E2DB]" />
            <div
              className="absolute h-[3px] rounded-full bg-[#1C1C1C]"
              style={{
                left: `${((state.priceFrom - facets.priceMin) / Math.max(1, facets.priceMax - facets.priceMin)) * 100}%`,
                right: `${100 - ((state.priceTo - facets.priceMin) / Math.max(1, facets.priceMax - facets.priceMin)) * 100}%`,
              }}
            />
            <input
              type="range"
              aria-label="Minimum price"
              min={facets.priceMin}
              max={facets.priceMax}
              step={10}
              value={state.priceFrom}
              onChange={(e) =>
                onChange({ priceFrom: Math.min(Number(e.target.value), state.priceTo - 10) })
              }
              className="range-thumb absolute w-full appearance-none bg-transparent pointer-events-none"
            />
            <input
              type="range"
              aria-label="Maximum price"
              min={facets.priceMin}
              max={facets.priceMax}
              step={10}
              value={state.priceTo}
              onChange={(e) =>
                onChange({ priceTo: Math.max(Number(e.target.value), state.priceFrom + 10) })
              }
              className="range-thumb absolute w-full appearance-none bg-transparent pointer-events-none"
            />
          </div>

          <p className="text-[12px] text-[#6B6B6B]">
            Bouquets from ${facets.priceMin} to ${facets.priceMax}
          </p>
        </div>
      </Section>

      <Section title="Palette / Colour" variant={variant}>
        <div className={drawer ? 'flex flex-wrap gap-3' : 'flex flex-col gap-3'}>
          {facets.colors.map((facet) => {
            const selected = state.color === facet.value;
            const hex = COLOR_SWATCHES[facet.value] ?? '#D8D2C6';
            return (
              <button
                key={facet.value}
                type="button"
                aria-pressed={selected}
                onClick={() => onChange({ color: selected ? null : facet.value })}
                className={
                  drawer
                    ? `flex items-center gap-2 px-3.5 py-1.5 rounded-full border text-[12px] font-semibold ${
                        selected
                          ? 'bg-[#1C1C1C] text-[#FDFDFD] border-[#1C1C1C]'
                          : 'bg-[#FAF8F4] text-[#444444] border-[#E5E2DB]'
                      }`
                    : 'flex items-center gap-3 group text-left'
                }
              >
                <span
                  className={`w-4 h-4 rounded-full border shrink-0 transition-all ${
                    !drawer && selected ? 'ring-2 ring-offset-2 ring-[#1C1C1C]' : ''
                  }`}
                  style={{ backgroundColor: hex, borderColor: hex === '#FFFFFF' ? '#E5E2DB' : hex }}
                />
                <span
                  className={
                    drawer
                      ? ''
                      : `text-[14px] transition-colors ${
                          selected ? 'text-[#1C1C1C] font-bold' : 'text-[#666666] group-hover:text-[#1C1C1C]'
                        }`
                  }
                >
                  {facet.value} <span className="opacity-70">({facet.count})</span>
                </span>
              </button>
            );
          })}
        </div>
      </Section>
    </>
  );
}
