'use client';

import { useActionState } from 'react';
import { motion, Variants } from 'framer-motion';
import { submitCustomRequest } from '@/app/actions/submissions';
import { initialFormState } from '@/lib/form-state';
import { FieldError, Honeypot, SubmitButton } from '@/components/forms/FormBits';
import { shopNow } from '@/lib/delivery';

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] } }
};

const staggerContainer: Variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.15 } }
};

export default function CustomRequestSection() {
  // Minimum selectable date, in the shop's timezone rather than the visitor's.
  const todayInShopTime = shopNow().date;
  const [state, formAction] = useActionState(submitCustomRequest, initialFormState);

  return (
    <section id="custom-request" className="w-full bg-[#FAF8F4] site-section">
      <div className="site-container">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-16 md:gap-20 lg:gap-28 items-start">

          {/* Left Column: Copy */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={staggerContainer}
            className="flex flex-col gap-8"
          >
            <motion.div variants={fadeUp} className="flex flex-col gap-5">
              <p className="text-[12px] font-bold uppercase tracking-[0.2em] text-[#6B6B6B]">
                Bespoke Services
              </p>
              <h2 className="font-serif text-[clamp(2rem,3.5vw,3rem)] font-normal leading-[1.1] text-[#1C1C1C]">
                Custom Design &<br />Event Styling
              </h2>
              <p className="text-[15px] font-medium leading-[1.75] text-[#555555] max-w-[440px]">
                From personalized signature bouquets to full-scale floral architecture for weddings, corporate galas, and exclusive private events in Las Vegas. Share your vision with our master florists, and we will bring it to life with the finest event-grade blooms.
              </p>
            </motion.div>

            <motion.div variants={fadeUp} className="flex flex-col gap-3">
              <p className="text-[12px] font-bold uppercase tracking-[0.12em] text-[#6B6B6B] mb-1">
                What we offer
              </p>
              <ul className="flex flex-col gap-2.5 text-[14px] font-medium text-[#444444] leading-relaxed">
                <li className="flex items-center gap-3">
                  <span className="text-[#C9A96E] text-[12px]">✦</span>
                  Tailored Personal Bouquets
                </li>
                <li className="flex items-center gap-3">
                  <span className="text-[#C9A96E] text-[12px]">✦</span>
                  Wedding &amp; Engagement Florals
                </li>
                <li className="flex items-center gap-3">
                  <span className="text-[#C9A96E] text-[12px]">✦</span>
                  Corporate Event &amp; Gala Styling
                </li>
                <li className="flex items-center gap-3">
                  <span className="text-[#C9A96E] text-[12px]">✦</span>
                  Hotel Suite &amp; Residential Installations
                </li>
              </ul>
            </motion.div>
          </motion.div>

          {/* Right Column: Form */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={fadeUp}
            className="flex flex-col gap-6"
          >
            {state.status === 'success' ? (
              <div
                role="status"
                className="flex flex-col gap-3 border border-[#E5E2DB] bg-[#FDFDFD] p-8 rounded-[2px]"
              >
                <p className="text-[12px] font-bold uppercase tracking-[0.2em] text-[#8A6A2E]">Request received</p>
                <h3 className="text-[20px] font-bold text-[#1C1C1C]">Thank you</h3>
                <p className="text-[14px] text-[#555555] leading-relaxed">
                  One of our florists will be in touch within one business day to talk
                  through your vision.
                </p>
              </div>
            ) : (
            <form action={formAction} className="flex flex-col gap-5">
              <Honeypot />

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div className="flex flex-col gap-1.5">
                  <label htmlFor="cr-name" className="text-[12px] font-bold tracking-[0.14em] uppercase text-[#6B6B6B]">Full Name</label>
                  <input
                    id="cr-name"
                    name="name"
                    defaultValue={state.values?.name}
                    type="text"
                    required
                    autoComplete="name"
                    placeholder="Jane Doe"
                    className="w-full bg-transparent border-b border-[#D1D1D1] py-2 text-[14px] text-[#1C1C1C] placeholder:text-[#BBBBBB] focus:outline-none focus:border-[#1C1C1C] hover:border-[#8A8A8A] transition-colors rounded-none"
                  />
                  <FieldError messages={state.errors?.name} />
                </div>
                <div className="flex flex-col gap-1.5">
                  <label htmlFor="cr-contact" className="text-[12px] font-bold tracking-[0.14em] uppercase text-[#6B6B6B]">Phone or Email</label>
                  <input
                    id="cr-contact"
                    name="contact"
                    defaultValue={state.values?.contact}
                    type="text"
                    required
                    placeholder="contact@example.com"
                    className="w-full bg-transparent border-b border-[#D1D1D1] py-2 text-[14px] text-[#1C1C1C] placeholder:text-[#BBBBBB] focus:outline-none focus:border-[#1C1C1C] hover:border-[#8A8A8A] transition-colors rounded-none"
                  />
                  <FieldError messages={state.errors?.contact} />
                </div>
              </div>

              <div className="flex flex-col gap-1.5">
                <label htmlFor="cr-type" className="text-[12px] font-bold tracking-[0.14em] uppercase text-[#6B6B6B]">Inquiry Type <span className="text-[#8A6A2E]">*</span></label>
                <div className="relative">
                  <select
                    id="cr-type"
                    name="inquiryType"
                    required
                    defaultValue={state.values?.inquiryType ?? ''}
                    className="w-full bg-transparent border-b border-[#D1D1D1] py-2 text-[14px] text-[#1C1C1C] appearance-none focus:outline-none focus:border-[#1C1C1C] hover:border-[#8A8A8A] transition-colors cursor-pointer rounded-none"
                  >
                    <option value="" disabled hidden>Select type...</option>
                    <option>Custom Bouquet</option>
                    <option>Wedding &amp; Bridal</option>
                    <option>Corporate Event</option>
                    <option>Residential / Hotel Styling</option>
                    <option>Other</option>
                  </select>
                  <span className="absolute right-0 top-1/2 -translate-y-1/2 text-[#6B6B6B] pointer-events-none text-[12px]">▼</span>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div className="flex flex-col gap-1.5">
                  <label htmlFor="cr-date" className="text-[12px] font-bold tracking-[0.14em] uppercase text-[#6B6B6B]">Date of Event</label>
                  <input
                    id="cr-date"
                    name="eventDate"
                    type="date"
                    min={todayInShopTime}
                    className="w-full bg-transparent border-b border-[#D1D1D1] py-2 text-[14px] text-[#1C1C1C] placeholder:text-[#BBBBBB] focus:outline-none focus:border-[#1C1C1C] hover:border-[#8A8A8A] transition-colors rounded-none"
                  />
                </div>
                <div className="flex flex-col gap-1.5">
                  <label htmlFor="cr-budget" className="text-[12px] font-bold tracking-[0.14em] uppercase text-[#6B6B6B]">Estimated Budget</label>
                  <div className="relative">
                    <select
                      id="cr-budget"
                      name="budget"
                      defaultValue=""
                      className="w-full bg-transparent border-b border-[#D1D1D1] py-2 text-[14px] text-[#1C1C1C] appearance-none focus:outline-none focus:border-[#1C1C1C] hover:border-[#8A8A8A] transition-colors cursor-pointer rounded-none"
                    >
                      <option value="" disabled hidden>Select budget...</option>
                      <option>$100 – $300</option>
                      <option>$300 – $1,000</option>
                      <option>$1,000 – $5,000</option>
                      <option>$5,000+</option>
                    </select>
                    <span className="absolute right-0 top-1/2 -translate-y-1/2 text-[#6B6B6B] pointer-events-none text-[12px]">▼</span>
                  </div>
                </div>
              </div>

              <div className="flex flex-col gap-1.5">
                <label htmlFor="cr-details" className="text-[12px] font-bold tracking-[0.14em] uppercase text-[#6B6B6B]">Your Vision / Details</label>
                <textarea
                  id="cr-details"
                  name="details"
                  maxLength={2000}
                  defaultValue={state.values?.details}
                  placeholder="Tell us about the occasion, preferred colors, or specific flowers..."
                  rows={3}
                  className="w-full bg-transparent border-b border-[#D1D1D1] py-2 text-[14px] text-[#1C1C1C] placeholder:text-[#BBBBBB] focus:outline-none focus:border-[#1C1C1C] hover:border-[#8A8A8A] transition-colors resize-none rounded-none"
                />
              </div>

              {state.status === 'error' && (
                <p role="alert" className="text-[#C0392B] text-[12px]">{state.message}</p>
              )}

              <div className="pt-2">
                <SubmitButton className="inline-flex items-center justify-center bg-[#1C1C1C] text-[#FDFDFD] text-[12px] font-bold uppercase tracking-[0.1em] px-10 py-3.5 rounded-[2px] hover:bg-[#C9A96E] transition-colors duration-300">
                  Submit Request
                </SubmitButton>
              </div>

            </form>
            )}
          </motion.div>

        </div>
      </div>
    </section>
  );
}
