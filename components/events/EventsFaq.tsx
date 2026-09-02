'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, Sparkles } from 'lucide-react';

interface FaqItem {
  question: string;
  answer: string;
}

const FAQS: FaqItem[] = [
  {
    question: 'What is included in each picnic package?',
    answer:
      'Every package comes complete with handcrafted low wooden picnic tables, fine rugs, premium floor cushions, complete luxury tableware, glassware, cloth napkins, candles/lanterns, and fresh floral artistry by Mother of Flower. Delivery, full on-site setup before your arrival, and complete teardown afterward are always included.',
  },
  {
    question: 'How do location selection & permits work?',
    answer:
      'We offer signature setups at breathtaking locations like Lakeside Escape (Lake Mead / Boulder City) and Sunset Strip Lawn (Las Vegas golden hour), as well as private estates, hotel suites, and backyards. For public parks or scenic reserves requiring special permit fees, our team assists you with coordination.',
  },
  {
    question: 'Can I add food, champagne, custom cakes, or bespoke signage?',
    answer:
      'Yes! While food and alcohol are not included in the standard styling tiers, we partner with premier local Las Vegas culinary chefs and patisseries to offer gourmet artisanal charcuterie boards, customized cakes, champagne bucket ice styling, and personalized neon or calligraphy signage.',
  },
  {
    question: 'How far in advance should I book?',
    answer:
      'We recommend booking at least 3–7 days in advance to ensure your preferred date, location, and floral palette are reserved. Last-minute requests within 24–48 hours may be accommodated depending on availability—please request an immediate callback.',
  },
  {
    question: 'What is your weather and cancellation policy?',
    answer:
      'In the event of inclement weather (high winds or rain), we can relocate your setup to a private indoor residence/suite, or reschedule your event to an alternate available date at no penalty with 24 hours notice.',
  },
];

export default function EventsFaq() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section className="w-full bg-[#FAF8F4] site-section border-t border-[#E5E2DB]">
      <div className="site-container max-w-4xl">
        <div className="flex flex-col text-center mb-12 gap-3">
          <span className="text-[12px] font-bold uppercase tracking-[0.25em] text-[#8A6A2E]">
            Everything You Need To Know
          </span>
          <h2 className="font-serif text-[clamp(2rem,3.5vw,2.8rem)] font-normal text-[#1C1C1C]">
            Frequently Asked Questions
          </h2>
        </div>

        <div className="flex flex-col divide-y divide-[#E5E2DB] bg-[#FDFDFD] border border-[#E5E2DB] rounded-[3px] shadow-sm">
          {FAQS.map((faq, index) => {
            const isOpen = openIndex === index;
            return (
              <div key={index} className="flex flex-col">
                <button
                  type="button"
                  onClick={() => setOpenIndex(isOpen ? null : index)}
                  className="w-full py-5 px-6 md:px-8 flex items-center justify-between text-left gap-4 hover:bg-[#FAF8F4] transition-colors cursor-pointer"
                >
                  <span className="font-serif text-[17px] md:text-[18px] font-normal text-[#1C1C1C]">
                    {faq.question}
                  </span>
                  <ChevronDown
                    size={18}
                    className={`text-[#8A6A2E] flex-shrink-0 transition-transform duration-300 ${
                      isOpen ? 'rotate-180' : ''
                    }`}
                  />
                </button>
                <AnimatePresence>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3 }}
                      className="overflow-hidden"
                    >
                      <div className="px-6 md:px-8 pb-6 text-[14px] text-[#555555] leading-relaxed">
                        {faq.answer}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
