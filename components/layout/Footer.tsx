'use client';

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="w-full border-t border-[#E5E5E5] bg-[#FDFDFD]">
      <div style={{ maxWidth: 1100, margin: '0 auto', paddingLeft: '5vw', paddingRight: '5vw' }}>

        {/* Main Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 py-16">

          {/* Brand */}
          <div className="flex flex-col gap-5">
            <a href="/" style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start', lineHeight: 1, textDecoration: 'none' }}>
              <span style={{ fontFamily: 'var(--font-serif)', fontSize: 22, fontWeight: 400, letterSpacing: '0.04em', color: '#1C1C1C' }}>
                Mother of Flower
              </span>
              <div style={{ height: '1px', width: '100%', backgroundColor: '#1C1C1C', margin: '6px 0', opacity: 0.2 }} />
              <span style={{ fontFamily: 'var(--font-sans)', fontSize: 9, fontWeight: 500, letterSpacing: '0.3em', color: '#5A5A5A', textTransform: 'uppercase' }}>
                Las Vegas
              </span>
            </a>
            <p className="text-[13px] font-medium text-[#555555] leading-[1.75] max-w-[260px]">
              Luxury floral artistry, curated for extraordinary moments. Delivered across Las Vegas and the US.
            </p>
          </div>

          {/* Links */}
          <div className="flex flex-col gap-3 md:items-center">
            <p className="text-[10px] font-bold uppercase tracking-[0.18em] text-[#8A8A8A] mb-1">Explore</p>
            {[
              { label: 'Collections', href: '#catalog' },
              { label: 'Occasions', href: '#occasions' },
              { label: 'Partnerships', href: '/sotrud' },
              { label: 'FAQ', href: '#' },
              { label: 'Care Guide', href: '#' },
            ].map((item) => (
              <a
                key={item.label}
                href={item.href}
                className="text-[13px] text-[#8A8A8A] hover:text-[#1C1C1C] transition-colors duration-200 no-underline"
              >
                {item.label}
              </a>
            ))}
          </div>

          {/* Contact */}
          <div className="flex flex-col gap-3 md:items-end">
            <p className="text-[10px] font-bold uppercase tracking-[0.18em] text-[#8A8A8A] mb-1">Get in Touch</p>
            <a
              href="mailto:info@motherofflower.com"
              className="text-[13px] text-[#8A8A8A] hover:text-[#1C1C1C] transition-colors duration-200 no-underline"
            >
              info@motherofflower.com
            </a>
            <a
              href="tel:+17252242454"
              className="text-[13px] text-[#8A8A8A] hover:text-[#1C1C1C] transition-colors duration-200 no-underline"
            >
              +1 (725) 224-2454
            </a>
            <p className="text-[13px] text-[#8A8A8A]">Las Vegas, Nevada, USA</p>
            <div className="flex gap-5 mt-2">
              {['Instagram', 'Pinterest', 'TikTok'].map((s) => (
                <a
                  key={s}
                  href="#"
                  className="text-[10px] font-bold uppercase tracking-[0.1em] text-[#8A8A8A] hover:text-[#1C1C1C] transition-colors duration-200 no-underline"
                >
                  {s}
                </a>
              ))}
            </div>
          </div>

        </div>

        {/* Bottom bar */}
        <div className="border-t border-[#E5E5E5] py-5 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-[11px] text-[#AAAAAA] tracking-wide">
            © {year} MotherOfFlower. All rights reserved.
          </p>
          <div className="flex gap-6">
            {['Privacy Policy', 'Terms', 'Shipping & Returns'].map((item) => (
              <a
                key={item}
                href="#"
                className="text-[11px] text-[#AAAAAA] hover:text-[#1C1C1C] transition-colors duration-200 no-underline"
              >
                {item}
              </a>
            ))}
          </div>
        </div>

      </div>
    </footer>
  );
}
