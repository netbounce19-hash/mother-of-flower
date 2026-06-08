export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-[#E5E5E5] mt-24 md:mt-36">
      <div className="max-w-7xl mx-auto px-6 md:px-12 py-16 md:py-20 grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-6">
        {/* Brand */}
        <div className="flex flex-col gap-4">
          <div className="leading-none">
            <p className="font-serif text-xl tracking-[0.14em] text-graphite">MOTHER</p>
            <p className="text-[10px] tracking-[0.4em] text-muted uppercase mt-[-2px]">of flower</p>
          </div>
          <p className="text-[13px] text-muted leading-relaxed max-w-xs">
            Luxury floral artistry, curated for extraordinary moments. Delivered across the UAE.
          </p>
        </div>

        {/* Links */}
        <div className="flex flex-col gap-3 md:items-center">
          <p className="text-[11px] tracking-[0.2em] uppercase text-muted mb-2">Explore</p>
          {['Collections', 'Occasions', 'About Us', 'FAQ', 'Care Guide'].map((item) => (
            <a
              key={item}
              href="#"
              className="text-[13px] text-graphite/60 hover:text-graphite transition-colors duration-300"
            >
              {item}
            </a>
          ))}
        </div>

        {/* Contact */}
        <div className="flex flex-col gap-3 md:items-end">
          <p className="text-[11px] tracking-[0.2em] uppercase text-muted mb-2">Get in Touch</p>
          <a
            href="mailto:hello@motherofflower.com"
            className="text-[13px] text-graphite/60 hover:text-graphite transition-colors duration-300"
          >
            hello@motherofflower.com
          </a>
          <a
            href="tel:+97145551234"
            className="text-[13px] text-graphite/60 hover:text-graphite transition-colors duration-300"
          >
            +971 4 555 1234
          </a>
          <p className="text-[13px] text-graphite/60">Dubai, United Arab Emirates</p>

          <div className="flex gap-4 mt-2">
            {['Instagram', 'Pinterest', 'TikTok'].map((s) => (
              <a
                key={s}
                href="#"
                className="text-[11px] tracking-[0.1em] uppercase text-muted hover:text-graphite transition-colors duration-300"
              >
                {s}
              </a>
            ))}
          </div>
        </div>
      </div>

      <div className="border-t border-[#E5E5E5]">
        <div className="max-w-7xl mx-auto px-6 md:px-12 py-5 flex flex-col md:flex-row items-center justify-between gap-2">
          <p className="text-[11px] text-muted tracking-[0.05em]">
            © {year} MotherOfFlower. All rights reserved.
          </p>
          <div className="flex gap-6">
            {['Privacy Policy', 'Terms', 'Shipping & Returns'].map((item) => (
              <a
                key={item}
                href="#"
                className="text-[11px] text-muted hover:text-graphite transition-colors duration-300"
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
