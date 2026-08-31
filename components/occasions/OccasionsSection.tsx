'use client';

import { motion, Variants } from 'framer-motion';
import Link from 'next/link';
import { categoryHasProducts } from '@/lib/catalog';

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] } },
};

const stagger: Variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.1 } },
};

// ── BESPOKE LUXURY LINE-ART SYMBOLS (LARGE EMBLEMS) ──

function WeddingsSymbol() {
  return (
    <svg width="60" height="60" viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg" className="transition-transform duration-500 group-hover:scale-110">
      {/* Glow background circle */}
      <circle cx="32" cy="32" r="28" fill="#C9A96E" fillOpacity="0.06" />
      
      {/* Intertwined Wedding Rings */}
      <ellipse cx="26" cy="36" rx="14" ry="14" stroke="#C9A96E" strokeWidth="1.6" strokeLinecap="round" />
      <ellipse cx="38" cy="32" rx="13" ry="13" stroke="#1C1C1C" strokeWidth="1.6" strokeLinecap="round" strokeDasharray="60 10" />
      
      {/* Solitaire Diamond Sparkle on Right Ring */}
      <path d="M38 15L41 19L38 23L35 19Z" fill="#C9A96E" stroke="#C9A96E" strokeWidth="1" />
      <line x1="38" y1="11" x2="38" y2="13" stroke="#C9A96E" strokeWidth="1.5" strokeLinecap="round" />
      <line x1="33" y1="16" x2="31" y2="15" stroke="#C9A96E" strokeWidth="1.2" strokeLinecap="round" />
      <line x1="43" y1="16" x2="45" y2="15" stroke="#C9A96E" strokeWidth="1.2" strokeLinecap="round" />

      {/* Botanical Olive / Floral Sprig on Left */}
      <path d="M16 44C18 41 22 41 24 43" stroke="#C9A96E" strokeWidth="1.3" strokeLinecap="round" />
      <path d="M14 38C17 37 19 39 19 41" stroke="#C9A96E" strokeWidth="1.3" strokeLinecap="round" />
      <circle cx="21" cy="46" r="1.5" fill="#C9A96E" />
    </svg>
  );
}

function RomanceSymbol() {
  return (
    <svg width="60" height="60" viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg" className="transition-transform duration-500 group-hover:scale-110">
      {/* Glow background circle */}
      <circle cx="32" cy="32" r="28" fill="#C9A96E" fillOpacity="0.06" />

      {/* Elegant Fine-Line Heart Silhouette */}
      <path
        d="M32 49C32 49 14 38 14 26C14 20 18.5 16 24 16C28 16 30.5 18.5 32 21C33.5 18.5 36 16 40 16C45.5 16 50 20 50 26C50 38 32 49 32 49Z"
        stroke="#1C1C1C"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />

      {/* Rose Petal Ribbon swirling inside */}
      <path
        d="M32 24C27 27 26 33 30 37C34 40 37 36 36 33C35 30 32 30 31 32"
        stroke="#C9A96E"
        strokeWidth="1.5"
        strokeLinecap="round"
      />

      {/* Romantic Stars / Shimmer */}
      <path d="M46 14L47 16L49 17L47 18L46 20L45 18L43 17L45 16Z" fill="#C9A96E" />
      <circle cx="18" cy="18" r="1" fill="#C9A96E" />
      <circle cx="48" cy="38" r="1.2" fill="#C9A96E" />
    </svg>
  );
}

function CorporateSymbol() {
  return (
    <svg width="60" height="60" viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg" className="transition-transform duration-500 group-hover:scale-110">
      {/* Glow background circle */}
      <circle cx="32" cy="32" r="28" fill="#C9A96E" fillOpacity="0.06" />

      {/* Architectural High-End Building & Column Geometry */}
      <rect x="22" y="16" width="20" height="34" rx="1.5" stroke="#1C1C1C" strokeWidth="1.6" />
      <rect x="14" y="26" width="12" height="24" rx="1" stroke="#C9A96E" strokeWidth="1.4" strokeDasharray="30 4" />
      <rect x="38" y="22" width="12" height="28" rx="1" stroke="#C9A96E" strokeWidth="1.4" />

      {/* Grid Windows Minimal */}
      <line x1="28" y1="22" x2="36" y2="22" stroke="#1C1C1C" strokeWidth="1.3" />
      <line x1="28" y1="28" x2="36" y2="28" stroke="#1C1C1C" strokeWidth="1.3" />
      <line x1="28" y1="34" x2="36" y2="34" stroke="#1C1C1C" strokeWidth="1.3" />
      <line x1="28" y1="40" x2="36" y2="40" stroke="#1C1C1C" strokeWidth="1.3" />

      {/* Luxury Diamond / Crown Finial on Top */}
      <path d="M32 10L35 14L32 16L29 14Z" fill="#C9A96E" />
    </svg>
  );
}

function SympathySymbol() {
  return (
    <svg width="60" height="60" viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg" className="transition-transform duration-500 group-hover:scale-110">
      {/* Glow background circle */}
      <circle cx="32" cy="32" r="28" fill="#C9A96E" fillOpacity="0.06" />

      {/* Peaceful Memorial Candle & Aura */}
      <rect x="27" y="27" width="10" height="22" rx="1.5" stroke="#1C1C1C" strokeWidth="1.6" />
      
      {/* Soft Flame */}
      <path
        d="M32 15C32 15 36 19 36 22C36 24.2 34.2 26 32 26C29.8 26 28 24.2 28 22C28 19 32 15 32 15Z"
        fill="#C9A96E"
        stroke="#C9A96E"
        strokeWidth="1"
      />
      <circle cx="32" cy="22" r="1.5" fill="#FDFDFD" />

      {/* Surrounding Laurel / Peaceful Branch of Honor */}
      <path
        d="M17 44C17 36 21 28 28 24"
        stroke="#C9A96E"
        strokeWidth="1.4"
        strokeLinecap="round"
      />
      <path
        d="M47 44C47 36 43 28 36 24"
        stroke="#C9A96E"
        strokeWidth="1.4"
        strokeLinecap="round"
      />
      
      {/* Delicate Leaves */}
      <path d="M19 33C16 31 16 28 19 28C21 28 21 31 19 33Z" fill="#C9A96E" fillOpacity="0.7" />
      <path d="M45 33C48 31 48 28 45 28C43 28 43 31 45 33Z" fill="#C9A96E" fillOpacity="0.7" />
      <path d="M22 41C19 40 18 37 21 37C23 37 24 40 22 41Z" fill="#C9A96E" fillOpacity="0.7" />
      <path d="M42 41C45 40 46 37 43 37C41 37 40 40 42 41Z" fill="#C9A96E" fillOpacity="0.7" />
    </svg>
  );
}

interface Occasion {
  title: string;
  subtitle: string;
  text: string;
  symbol: React.ReactNode;
  href: string;
  /** When set, the card falls back to the full catalogue if empty. */
  category?: string;
}

/**
 * A card must never send someone to a category with nothing in it, so the
 * href is resolved against the live catalogue at render time.
 */
function resolveHref(occasion: Occasion): string {
  if (occasion.category && !categoryHasProducts(occasion.category)) return '/catalog';
  return occasion.href;
}

const occasions: Occasion[] = [
  {
    title: 'Weddings',
    subtitle: 'Ceremony & Bridal',
    text: 'Bridal bouquets, ceremony arches, and reception tables composed to your palette.',
    symbol: <WeddingsSymbol />,
    category: 'Wedding Bouquets',
    href: '/catalog?category=Wedding+Bouquets',
  },
  {
    title: 'Romance',
    subtitle: 'Anniversaries & Gestures',
    text: 'Anniversaries, proposals, and heartfelt gestures presented in signature luxury boxes.',
    symbol: <RomanceSymbol />,
    href: '/catalog',
  },
  {
    title: 'Corporate',
    subtitle: 'Galas & Hotel Styling',
    text: 'Lobby installations, gala styling, and recurring floral arrangements for executive venues.',
    symbol: <CorporateSymbol />,
    href: '/partnerships',
  },
  {
    title: 'Sympathy',
    subtitle: 'Honor & Remembrance',
    text: 'Restrained, respectful tributes and standing arrangements composed with discretion.',
    symbol: <SympathySymbol />,
    href: '/catalog',
  },
];

export default function OccasionsSection() {
  return (
    <section id="occasions" className="w-full bg-surface site-section">
      <div className="site-container">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-80px' }}
          variants={stagger}
          className="flex flex-col gap-14"
        >
          {/* Section Header */}
          <motion.div variants={fadeUp} className="flex flex-col md:flex-row md:items-end justify-between gap-6">
            <div>
              <p className="text-[12px] font-bold uppercase tracking-[0.25em] text-[#8A6A2E] mb-2">
                Curated For Your Moments
              </p>
              <h2 className="font-serif text-[clamp(2.2rem,4vw,3.4rem)] font-normal leading-[1.08] text-[#1C1C1C]">
                Flowers for Every Occasion
              </h2>
            </div>
            <p className="text-[14px] font-medium leading-[1.75] text-[#666666] max-w-[460px]">
              Tell us the occasion and our master florists will compose a bespoke artistic arrangement tailored to your atmosphere.
            </p>
          </motion.div>

          {/* Occasion Cards with Large Symbolic Icons */}
          <motion.div
            variants={fadeUp}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"
          >
            {occasions.map((occasion) => (
              <Link
                key={occasion.title}
                href={resolveHref(occasion)}
                className="group flex flex-col bg-[#FDFDFD] p-8 md:p-9 rounded-[3px] border border-[#E5E2DB] hover:border-[#C9A96E]/50 hover:shadow-[0_16px_40px_rgba(201,169,110,0.12)] transition-all duration-500 no-underline"
              >
                {/* Large Symbolic Icon Badge */}
                <div className="w-16 h-16 rounded-2xl bg-[#F7F5F2] group-hover:bg-[#C9A96E]/10 border border-[#E5E2DB] group-hover:border-[#C9A96E]/30 flex items-center justify-center mb-6 transition-colors duration-400">
                  {occasion.symbol}
                </div>

                {/* Subtitle */}
                <span className="text-[12px] font-bold uppercase tracking-[0.2em] text-[#8A6A2E] mb-1">
                  {occasion.subtitle}
                </span>

                {/* Title */}
                <h3 className="font-serif text-[22px] font-normal text-[#1C1C1C] group-hover:text-[#8A6A2E] transition-colors duration-300 mb-3">
                  {occasion.title}
                </h3>

                {/* Text Description */}
                <p className="text-[13.5px] leading-[1.75] text-[#666666] mb-6 flex-1">
                  {occasion.text}
                </p>

                {/* Bottom Arrow Link */}
                <div className="flex items-center gap-1.5 text-[12px] font-bold uppercase tracking-[0.14em] text-[#1C1C1C] group-hover:text-[#8A6A2E] transition-colors mt-auto pt-4 border-t border-[#E5E2DB]">
                  <span>Explore Collection</span>
                  <span className="transform group-hover:translate-x-1 transition-transform">→</span>
                </div>
              </Link>
            ))}
          </motion.div>

          {/* Action CTA */}
          <motion.div variants={fadeUp} className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
            <a
              href="#custom-request"
              className="inline-flex items-center justify-center bg-[#1C1C1C] text-[#FDFDFD] text-[12px] font-bold uppercase tracking-[0.12em] px-10 py-4 rounded-[2px] hover:bg-[#C9A96E] transition-colors duration-300 no-underline shadow-sm"
            >
              Discuss a Bespoke Request
            </a>
            <Link
              href="/catalog"
              className="inline-flex items-center justify-center border border-[#1C1C1C] text-[#1C1C1C] text-[12px] font-bold uppercase tracking-[0.12em] px-8 py-4 rounded-[2px] hover:bg-[#1C1C1C] hover:text-[#FDFDFD] transition-colors duration-300 no-underline"
            >
              View Full Catalog
            </Link>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
