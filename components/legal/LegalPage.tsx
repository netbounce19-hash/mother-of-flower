import Link from 'next/link';
import { site } from '@/lib/site';

export interface LegalSection {
  heading: string;
  /** Paragraphs; strings render as <p>, arrays render as a bullet list. */
  body: (string | string[])[];
}

interface LegalPageProps {
  eyebrow: string;
  title: string;
  intro: string;
  /** ISO date (YYYY-MM-DD) shown as "Last updated". */
  updated: string;
  sections: LegalSection[];
}

const updatedFormatter = new Intl.DateTimeFormat('en-US', {
  timeZone: 'UTC',
  year: 'numeric',
  month: 'long',
  day: 'numeric',
});

function formatUpdated(iso: string) {
  const [y, m, d] = iso.split('-').map(Number);
  return updatedFormatter.format(new Date(Date.UTC(y, m - 1, d)));
}

export default function LegalPage({
  eyebrow,
  title,
  intro,
  updated,
  sections,
}: LegalPageProps) {
  return (
    <div className="w-full bg-[#FDFDFD]">
      <header className="w-full bg-[#FAF8F4] border-b border-[#E5E2DB] pt-[120px] md:pt-[150px] pb-12 md:pb-16">
        <div className="site-container flex flex-col gap-4">
          <p className="text-[#8A6A2E] text-[12px] font-semibold uppercase tracking-[0.25em]">
            {eyebrow}
          </p>
          <h1 className="font-serif text-[clamp(2.2rem,4vw,3.4rem)] font-normal leading-[1.1] text-[#1C1C1C]">
            {title}
          </h1>
          <p className="text-[#444444] text-[15px] leading-[1.8] max-w-[60ch]">{intro}</p>
          <p className="text-[#6B6B6B] text-[13px]">
            Last updated: <time dateTime={updated}>{formatUpdated(updated)}</time>
          </p>
        </div>
      </header>

      <div className="site-container site-section">
        <div className="flex flex-col gap-12 max-w-[72ch]">
          {sections.map((section) => (
            <section key={section.heading} className="flex flex-col gap-4">
              <h2 className="font-serif text-[clamp(1.4rem,2.4vw,1.9rem)] font-normal leading-[1.2] text-[#1C1C1C]">
                {section.heading}
              </h2>
              <div className="w-6 h-[1.5px] bg-[#C9A96E]" />
              {section.body.map((block, i) =>
                Array.isArray(block) ? (
                  <ul key={i} className="flex flex-col gap-2.5 pl-1">
                    {block.map((li) => (
                      <li key={li} className="flex items-start gap-3 text-[#444444] text-[15px] leading-[1.8]">
                        <span className="text-[#C9A96E] mt-[7px] text-[10px] leading-none" aria-hidden="true">✦</span>
                        <span>{li}</span>
                      </li>
                    ))}
                  </ul>
                ) : (
                  <p key={i} className="text-[#444444] text-[15px] leading-[1.85]">
                    {block}
                  </p>
                )
              )}
            </section>
          ))}

          <section className="flex flex-col gap-3 border-t border-[#E5E2DB] pt-8">
            <h2 className="font-sans text-[13px] font-bold uppercase tracking-[0.18em] text-[#1C1C1C]">
              Questions about this policy
            </h2>
            <p className="text-[#444444] text-[15px] leading-[1.8]">
              Write to{' '}
              <a href={`mailto:${site.email}`} className="text-[#1C1C1C] underline underline-offset-4 hover:text-[#8A6A2E] transition-colors">
                {site.email}
              </a>{' '}
              or call{' '}
              <a href={site.phone.href} className="text-[#1C1C1C] underline underline-offset-4 hover:text-[#8A6A2E] transition-colors">
                {site.phone.display}
              </a>
              . Postal address: {site.name}, {site.address.full}.
            </p>
            <p className="text-[#6B6B6B] text-[13px] pt-2">
              See also{' '}
              <Link href="/privacy" className="underline underline-offset-4 hover:text-[#1C1C1C]">Privacy Policy</Link>,{' '}
              <Link href="/terms" className="underline underline-offset-4 hover:text-[#1C1C1C]">Terms of Service</Link>,{' '}
              <Link href="/refund-policy" className="underline underline-offset-4 hover:text-[#1C1C1C]">Refund &amp; Returns</Link>.
            </p>
          </section>

          {/*
            TODO(legal): these are working drafts written for a Nevada retail
            florist, not legal advice. Have counsel review before launch.
          */}
          <p className="text-[#6B6B6B] text-[12px] leading-[1.7] border-t border-[#E5E2DB] pt-6">
            This document is provided for information only and does not constitute
            legal advice.
          </p>
        </div>
      </div>
    </div>
  );
}
