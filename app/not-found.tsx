import type { Metadata } from 'next';
import Link from 'next/link';
import { site } from '@/lib/site';

export const metadata: Metadata = {
  title: `Page not found — ${site.name}`,
  description: 'The page you were looking for is no longer here. Browse our bouquets or get in touch.',
  robots: { index: false, follow: true },
};

export default function NotFound() {
  return (
    <div className="w-full bg-[#FDFDFD]" style={{ paddingTop: 150 }}>
      <div className="site-container pb-28 flex flex-col items-center text-center gap-6">
        <p className="text-[12px] font-bold uppercase tracking-[0.25em] text-[#8A6A2E]">
          Error 404
        </p>

        <h1 className="font-serif text-[clamp(2.4rem,5vw,3.8rem)] font-normal leading-[1.08] text-[#1C1C1C]">
          This page has wilted
        </h1>

        <p className="text-[15px] leading-[1.8] text-[#444444] max-w-[52ch]">
          The page you were looking for has been moved or never existed. Our bouquets,
          however, are very much alive.
        </p>

        <div className="flex flex-col sm:flex-row items-center gap-3 pt-2">
          <Link
            href="/catalog"
            className="inline-flex items-center justify-center bg-[#1C1C1C] text-[#FDFDFD] text-[13px] font-bold uppercase tracking-[0.04em] px-10 py-4 rounded-[2px] no-underline hover:bg-[#C9A96E] transition-colors duration-300"
          >
            Browse the collection
          </Link>
          <Link
            href="/"
            className="inline-flex items-center justify-center border border-[#1C1C1C] text-[#1C1C1C] text-[13px] font-bold uppercase tracking-[0.04em] px-10 py-4 rounded-[2px] no-underline hover:bg-[#1C1C1C] hover:text-[#FDFDFD] transition-colors duration-300"
          >
            Back to home
          </Link>
        </div>

        <div className="pt-8 mt-4 border-t border-[#E5E2DB] w-full max-w-[52ch] flex flex-col gap-2">
          <p className="text-[13px] text-[#6B6B6B]">Prefer to speak to a florist?</p>
          <p className="text-[15px] text-[#1C1C1C]">
            <a href={site.phone.href} className="underline underline-offset-4 hover:text-[#8A6A2E] transition-colors">
              {site.phone.display}
            </a>
            {' · '}
            <a href={`mailto:${site.email}`} className="underline underline-offset-4 hover:text-[#8A6A2E] transition-colors">
              {site.email}
            </a>
          </p>
          <p className="text-[13px] text-[#6B6B6B]">{site.hours.short} ({site.city})</p>
        </div>
      </div>
    </div>
  );
}
