import Link from 'next/link';
import { site } from '@/lib/site';

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="w-full border-t border-[#E5E2DB] bg-[#FDFDFD]">
      <div className="site-container">

        {/* Main Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 py-16">

          {/* Brand */}
          <div className="flex flex-col gap-5">
            <Link href="/" style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start', lineHeight: 1, textDecoration: 'none' }}>
              <span style={{ fontFamily: 'var(--font-serif)', fontSize: 22, fontWeight: 400, letterSpacing: '0.04em', color: '#1C1C1C' }}>
                Mother of Flower
              </span>
              <div style={{ height: '1px', width: '100%', backgroundColor: '#1C1C1C', margin: '6px 0', opacity: 0.2 }} />
              <span style={{ fontFamily: 'var(--font-sans)', fontSize: 12, fontWeight: 500, letterSpacing: '0.3em', color: '#5A5A5A', textTransform: 'uppercase' }}>
                Las Vegas
              </span>
            </Link>
            <p className="text-[13px] font-medium text-[#555555] leading-[1.75] max-w-[260px]">
              Luxury floral artistry, curated for extraordinary moments. Delivered across Las Vegas and the US.
            </p>
          </div>

          {/* Links */}
          <div className="flex flex-col gap-3 md:items-center">
            <p className="text-[12px] font-bold uppercase tracking-[0.18em] text-[#6B6B6B] mb-1">Explore</p>
            {[
              { label: 'Collections', href: '/catalog' },
              { label: 'Occasions', href: '/#occasions' },
              { label: 'Events & Picnics', href: '/events' },
              { label: 'How to Order', href: '/contact#how-to-order' },
              { label: 'Delivery & Returns', href: '/contact#delivery' },
            ].map((item) => (
              <a
                key={item.label}
                href={item.href}
                className="text-[13px] text-[#6B6B6B] hover:text-[#1C1C1C] transition-colors duration-200 no-underline"
              >
                {item.label}
              </a>
            ))}
          </div>

          {/* Contact */}
          <div className="flex flex-col gap-3 md:items-end">
            <p className="text-[12px] font-bold uppercase tracking-[0.18em] text-[#6B6B6B] mb-1">Get in Touch</p>
            <a
              href={`mailto:${site.email}`}
              className="text-[13px] text-[#6B6B6B] hover:text-[#1C1C1C] transition-colors duration-200 no-underline"
            >
              {site.email}
            </a>
            <a
              href={site.phone.href}
              className="text-[13px] text-[#6B6B6B] hover:text-[#1C1C1C] transition-colors duration-200 no-underline"
            >
              {site.phone.display}
            </a>
            <p className="text-[13px] text-[#6B6B6B]">{site.address.line2}</p>
            <p className="text-[13px] text-[#6B6B6B]">{site.hours.short}</p>
            <div className="flex gap-5 mt-2">
              <a
                href={site.social.instagram}
                target="_blank"
                rel="noopener noreferrer"
                className="text-[12px] font-bold uppercase tracking-[0.1em] text-[#6B6B6B] hover:text-[#1C1C1C] transition-colors duration-200 no-underline"
              >
                Instagram
              </a>
            </div>
          </div>

        </div>

        {/* Bottom bar */}
        <div className="border-t border-[#E5E2DB] py-5 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-[12px] text-[#6B6B6B] tracking-wide">
            © {year} MotherOfFlower. All rights reserved.
          </p>
          <div className="flex gap-6">
            {[
              { label: 'Privacy Policy', href: '/privacy' },
              { label: 'Terms', href: '/terms' },
              { label: 'Shipping & Returns', href: '/contact#delivery' },
            ].map((item) => (
              <a
                key={item.label}
                href={item.href}
                className="text-[12px] text-[#6B6B6B] hover:text-[#1C1C1C] transition-colors duration-200 no-underline"
              >
                {item.label}
              </a>
            ))}
          </div>
        </div>

      </div>
    </footer>
  );
}
