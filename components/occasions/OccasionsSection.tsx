'use client';

import { motion, Variants } from 'framer-motion';

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] } },
};

const stagger: Variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.1 } },
};

/**
 * TODO(content): copy is placeholder — replace with the studio's own wording
 * and point each card at a real catalogue filter once categories are wired up.
 */
const occasions = [
  {
    title: 'Weddings',
    text: 'Bridal bouquets, ceremony arches, and reception tables composed to your palette.',
  },
  {
    title: 'Romance',
    text: 'Anniversaries, proposals, and just-because gestures in signature boxes.',
  },
  {
    title: 'Corporate',
    text: 'Lobby installations, gala styling, and recurring arrangements for offices.',
  },
  {
    title: 'Sympathy',
    text: 'Restrained, respectful tributes arranged and delivered with discretion.',
  },
];

export default function OccasionsSection() {
  return (
    <section
      id="occasions"
      className="w-full bg-[#F7F5F2] scroll-mt-[72px]"
      style={{ padding: '100px 5vw' }}
    >
      <div style={{ maxWidth: 1100, margin: '0 auto' }}>
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-80px' }}
          variants={stagger}
          className="flex flex-col gap-12"
        >
          <motion.div variants={fadeUp} className="flex flex-col gap-4">
            <p className="text-[11px] font-bold uppercase tracking-[0.2em] text-[#C9A96E]">
              Occasions
            </p>
            <h2 className="font-sans text-[clamp(2rem,3.5vw,3rem)] font-bold leading-[1.1] text-[#1C1C1C]">
              Flowers for every moment
            </h2>
            <p className="text-[15px] font-medium leading-[1.75] text-[#555555] max-w-[520px]">
              Tell us the occasion and our florists will compose something that fits it —
              from a single bouquet to a full venue.
            </p>
          </motion.div>

          <motion.ul
            variants={fadeUp}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-px bg-[#E5E2DB] border border-[#E5E2DB] rounded-[2px] overflow-hidden list-none p-0 m-0"
          >
            {occasions.map((occasion) => (
              <li
                key={occasion.title}
                className="flex flex-col gap-3 bg-[#FDFDFD] p-8 hover:bg-[#FAF8F4] transition-colors duration-500"
              >
                <h3 className="text-[14px] font-bold uppercase tracking-wide text-[#1C1C1C]">
                  {occasion.title}
                </h3>
                <p className="text-[14px] leading-[1.75] text-[#555555]">{occasion.text}</p>
              </li>
            ))}
          </motion.ul>

          <motion.div variants={fadeUp}>
            <a
              href="#custom-request"
              className="inline-flex items-center justify-center border border-[#1C1C1C] text-[#1C1C1C] text-[13px] font-bold uppercase tracking-[0.04em] px-10 py-4 rounded-[2px] hover:bg-[#1C1C1C] hover:text-[#FDFDFD] focus-visible:bg-[#1C1C1C] focus-visible:text-[#FDFDFD] transition-colors duration-300 no-underline"
            >
              Discuss your occasion
            </a>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
