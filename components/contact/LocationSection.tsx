'use client';

import { useEffect, useRef, useState } from 'react';
import { motion, Variants } from 'framer-motion';
import { site } from '@/lib/site';

const MAP_SRC =
  'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3226.7905878466657!2d-115.02534572412854!3d36.02517887247781!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x80c8d11c80f4886f%3A0xcb06526fc1ff725!2s7710%20Eastgate%20Rd%2C%20Henderson%2C%20NV%2089011!5e0!3m2!1sen!2sus!4v1700000000000!5m2!1sen!2sus';

/**
 * The Google embed pulls roughly 170 KB from four third-party domains. It sits
 * at the foot of the homepage, so almost nobody has scrolled to it by the time
 * it loads — `loading="lazy"` alone was not enough, because the browser's own
 * heuristic starts fetching well before the frame is near the viewport.
 */
function LazyMap() {
  const holderRef = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const holder = holderRef.current;
    if (!holder || visible) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      // A little ahead of the fold, so the map is ready as it comes into view.
      { rootMargin: '200px' }
    );
    observer.observe(holder);
    return () => observer.disconnect();
  }, [visible]);

  return (
    <div ref={holderRef} className="absolute inset-0 bg-[#F7F5F2]">
      {visible && (
        <iframe
          src={MAP_SRC}
          title={`Map showing ${site.name} at ${site.address.full}`}
          width="100%"
          height="100%"
          style={{ border: 0 }}
          allowFullScreen={false}
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          className="absolute inset-0 w-full h-full grayscale opacity-80 hover:grayscale-0 hover:opacity-100 transition-all duration-700"
        />
      )}
    </div>
  );
}

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] } }
};

const staggerContainer: Variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.15 } }
};

export default function LocationSection() {
  return (
    <section id="locations" className="w-full bg-[#FAF8F4]" style={{ paddingBottom: 'clamp(72px, 9vw, 112px)' }}>
      <div className="site-container">

        {/* Location Card */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={staggerContainer}
          className="bg-[#FDFDFD] border border-[#E5E2DB] rounded-[2px] shadow-[0_8px_32px_rgba(0,0,0,0.04)] overflow-hidden"
        >
          <div className="grid grid-cols-1 lg:grid-cols-[320px_1fr]">

            {/* Details (Left) */}
            <motion.div
              variants={fadeUp}
              className="flex flex-col border-b lg:border-b-0 lg:border-r border-[#E5E2DB]"
              style={{ gap: 28, padding: '40px 40px' }}
            >
              <div className="flex flex-col gap-1">
                <p className="text-[12px] font-bold uppercase tracking-[0.2em] text-[#8A6A2E] mb-2">Address</p>
                <p className="text-[14px] font-medium text-[#1C1C1C] leading-relaxed">
                  {site.address.line1}<br />{site.address.line2}
                </p>
              </div>

              <div className="flex flex-col gap-1">
                <p className="text-[12px] font-bold uppercase tracking-[0.2em] text-[#8A6A2E] mb-2">Hours</p>
                <p className="text-[14px] font-medium text-[#1C1C1C] leading-relaxed">
                  {site.hours.display}
                </p>
              </div>

              <div className="flex flex-col gap-1">
                <p className="text-[12px] font-bold uppercase tracking-[0.2em] text-[#8A6A2E] mb-2">Contact</p>
                <a
                  href={site.phone.href}
                  className="text-[14px] font-medium text-[#1C1C1C] hover:text-[#8A6A2E] transition-colors"
                >
                  {site.phone.display}
                </a>
                <a
                  href={`mailto:${site.email}`}
                  className="text-[14px] font-medium text-[#6B6B6B] hover:text-[#8A6A2E] transition-colors"
                >
                  {site.email}
                </a>
              </div>

              <a
                href={site.address.mapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center mt-2 border border-[#1C1C1C] text-[#1C1C1C] text-[12px] font-bold uppercase tracking-[0.1em] px-7 py-3 rounded-[2px] hover:bg-[#1C1C1C] hover:text-[#FDFDFD] transition-colors duration-300 w-fit"
              >
                Get Directions
              </a>
            </motion.div>

            {/* Map (Right) */}
            <motion.div
              variants={fadeUp}
              className="w-full h-[320px] lg:h-[400px] relative"
            >
              <LazyMap />
            </motion.div>

          </div>
        </motion.div>

        {/* Bottom Quote */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={fadeUp}
          className="mt-16 pt-10 border-t border-[#E5E2DB] text-center"
        >
          <p className="text-[13px] italic text-[#6B6B6B] max-w-2xl mx-auto leading-relaxed">
            &ldquo;We&apos;re always here to guide you through the ordering process or help
            you decide which composition best fits your occasion. Don&apos;t be shy —
            reach out.&rdquo;
          </p>
        </motion.div>

      </div>
    </section>
  );
}
