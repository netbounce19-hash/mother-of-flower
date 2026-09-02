'use client';

import { useActionState, useState } from 'react';
import { motion, Variants } from 'framer-motion';
import { submitCallRequest, submitCustomRequest } from '@/app/actions/submissions';
import { initialFormState } from '@/lib/form-state';
import { FieldError, Honeypot, SubmitButton } from '@/components/forms/FormBits';
import PhoneField from '@/components/forms/PhoneField';
import { Phone, Calendar, Sparkles, Send } from 'lucide-react';

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] } },
};

const stagger: Variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.12 } },
};

export default function EventInquiryForm() {
  const [eventState, eventAction] = useActionState(submitCustomRequest, initialFormState);
  const [callState, callAction] = useActionState(submitCallRequest, initialFormState);
  const [whatsapp, setWhatsapp] = useState(false);

  return (
    <section id="event-inquiry" className="w-full bg-[#FDFDFD] site-section border-t border-[#E5E2DB]">
      <div className="site-container">
        
        {/* Section Header */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-80px' }}
          variants={stagger}
          className="flex flex-col text-center mb-14 gap-3 max-w-2xl mx-auto"
        >
          <motion.div variants={fadeUp} className="flex items-center justify-center gap-2">
            <span className="text-[12px] font-bold uppercase tracking-[0.25em] text-[#8A6A2E]">
              Let&apos;s Create Something Extraordinary
            </span>
          </motion.div>
          <motion.h2
            variants={fadeUp}
            className="font-serif text-[clamp(2rem,3.5vw,2.8rem)] font-normal leading-[1.1] text-[#1C1C1C]"
          >
            Inquire or Book an Event
          </motion.h2>
          <motion.p variants={fadeUp} className="text-[#666666] text-[14px] leading-relaxed">
            Whether you want to reserve a signature picnic, design a custom proposal, or book floral styling for a corporate gala, our team will coordinate every single detail.
          </motion.p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-start">
          
          {/* Main Event Inquiry Form (Left / Larger) */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-80px' }}
            variants={fadeUp}
            className="lg:col-span-7 bg-[#FAF8F4] p-8 md:p-12 rounded-[3px] border border-[#E5E2DB] shadow-sm flex flex-col gap-6"
          >
            <div className="border-b border-[#E5E2DB] pb-4">
              <span className="text-[11px] font-bold uppercase tracking-[0.2em] text-[#8A6A2E]">
                Detailed Inquiry
              </span>
              <h3 className="font-serif text-[22px] font-normal text-[#1C1C1C] mt-1">
                Tell us about your occasion
              </h3>
            </div>

            {eventState.status === 'success' ? (
              <div role="status" className="py-10 flex flex-col items-center text-center gap-4">
                <div className="w-14 h-14 rounded-full bg-white border border-[#C9A96E]/40 flex items-center justify-center text-2xl">
                  ✨
                </div>
                <h4 className="font-serif text-[24px] font-medium text-[#1C1C1C]">
                  Thank You for Your Inquiry
                </h4>
                <p className="text-[14px] text-[#555555] max-w-md leading-relaxed">
                  We have received your event details. Our floral concierge will review your preferences and contact you within one business day.
                </p>
              </div>
            ) : (
              <form action={eventAction} className="flex flex-col gap-5">
                <Honeypot />

                {/* Name & Contact */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  <div className="flex flex-col gap-1">
                    <label htmlFor="ev-name" className="text-[12px] font-bold tracking-wide uppercase text-[#5A5A5A]">
                      Your Name <span className="text-[#8A6A2E]">*</span>
                    </label>
                    <input
                      id="ev-name"
                      name="name"
                      defaultValue={eventState.values?.name}
                      type="text"
                      required
                      autoComplete="name"
                      placeholder="Jane Doe"
                      className="w-full bg-transparent border-b border-[#D1D1D1] py-2 text-[14px] text-[#1C1C1C] placeholder:text-[#A3A3A3] focus:outline-none focus:border-[#1C1C1C] hover:border-[#8A8A8A] transition-colors rounded-none"
                    />
                    <FieldError messages={eventState.errors?.name} />
                  </div>

                  <div className="flex flex-col gap-1">
                    <label htmlFor="ev-contact" className="text-[12px] font-bold tracking-wide uppercase text-[#5A5A5A]">
                      Phone or Email <span className="text-[#8A6A2E]">*</span>
                    </label>
                    <input
                      id="ev-contact"
                      name="contact"
                      defaultValue={eventState.values?.contact}
                      type="text"
                      required
                      placeholder="+1 (725) 224-2454"
                      className="w-full bg-transparent border-b border-[#D1D1D1] py-2 text-[14px] text-[#1C1C1C] placeholder:text-[#A3A3A3] focus:outline-none focus:border-[#1C1C1C] hover:border-[#8A8A8A] transition-colors rounded-none"
                    />
                    <FieldError messages={eventState.errors?.contact} />
                  </div>
                </div>

                {/* Event Type & Date */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  <div className="flex flex-col gap-1">
                    <label htmlFor="ev-type" className="text-[12px] font-bold tracking-wide uppercase text-[#5A5A5A]">
                      Event Type / Package
                    </label>
                    <select
                      id="ev-type"
                      name="inquiryType"
                      defaultValue={eventState.values?.inquiryType || 'Signature Picnic ($1,250)'}
                      className="w-full bg-transparent border-b border-[#D1D1D1] py-2 text-[14px] text-[#1C1C1C] focus:outline-none focus:border-[#1C1C1C] rounded-none cursor-pointer"
                    >
                      <option value="Essential Picnic ($850)">Essential Picnic ($850)</option>
                      <option value="Signature Picnic ($1,250)">Signature Picnic ($1,250)</option>
                      <option value="Grand Picnic ($1,650)">Grand Picnic ($1,650)</option>
                      <option value="Marriage Proposal Package">Marriage Proposal Package</option>
                      <option value="Corporate Event / Hotel Styling">Corporate Event / Hotel Styling</option>
                      <option value="Private Dinner / Bespoke Celebration">Private Dinner / Bespoke Celebration</option>
                    </select>
                  </div>

                  <div className="flex flex-col gap-1">
                    <label htmlFor="ev-date" className="text-[12px] font-bold tracking-wide uppercase text-[#5A5A5A]">
                      Preferred Date
                    </label>
                    <input
                      id="ev-date"
                      name="eventDate"
                      defaultValue={eventState.values?.eventDate}
                      type="date"
                      min={new Date().toISOString().split('T')[0]}
                      className="w-full bg-transparent border-b border-[#D1D1D1] py-2 text-[14px] text-[#1C1C1C] focus:outline-none focus:border-[#1C1C1C] rounded-none"
                    />
                  </div>
                </div>

                {/* Budget / Guest notes */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  <div className="flex flex-col gap-1">
                    <label htmlFor="ev-budget" className="text-[12px] font-bold tracking-wide uppercase text-[#5A5A5A]">
                      Estimated Budget (Optional)
                    </label>
                    <input
                      id="ev-budget"
                      name="budget"
                      defaultValue={eventState.values?.budget}
                      type="text"
                      placeholder="e.g. $1,500 - $3,000"
                      className="w-full bg-transparent border-b border-[#D1D1D1] py-2 text-[14px] text-[#1C1C1C] placeholder:text-[#A3A3A3] focus:outline-none focus:border-[#1C1C1C] hover:border-[#8A8A8A] transition-colors rounded-none"
                    />
                  </div>

                  <div className="flex flex-col gap-1">
                    <label htmlFor="ev-location" className="text-[12px] font-bold tracking-wide uppercase text-[#5A5A5A]">
                      Location Preference
                    </label>
                    <input
                      id="ev-location"
                      type="text"
                      placeholder="Lake Mead / Las Vegas Strip / Private Suite"
                      className="w-full bg-transparent border-b border-[#D1D1D1] py-2 text-[14px] text-[#1C1C1C] placeholder:text-[#A3A3A3] focus:outline-none focus:border-[#1C1C1C] hover:border-[#8A8A8A] transition-colors rounded-none"
                    />
                  </div>
                </div>

                {/* Details */}
                <div className="flex flex-col gap-1">
                  <label htmlFor="ev-details" className="text-[12px] font-bold tracking-wide uppercase text-[#5A5A5A]">
                    Event Vision &amp; Add-on Requests
                  </label>
                  <textarea
                    id="ev-details"
                    name="details"
                    defaultValue={eventState.values?.details}
                    rows={4}
                    placeholder="Describe your vision, guest count, cake/food preferences, color scheme, or any specific venue requests..."
                    className="w-full bg-transparent border-b border-[#D1D1D1] py-2 text-[14px] text-[#1C1C1C] placeholder:text-[#A3A3A3] focus:outline-none focus:border-[#1C1C1C] hover:border-[#8A8A8A] transition-colors resize-none rounded-none"
                  />
                </div>

                {eventState.status === 'error' && (
                  <p role="alert" className="text-[#C0392B] text-[12px]">
                    {eventState.message}
                  </p>
                )}

                <div className="pt-2">
                  <SubmitButton
                    pendingLabel="Submitting…"
                    className="w-full md:w-auto px-10 py-4 bg-[#1C1C1C] text-[#FDFDFD] text-[13px] font-bold uppercase tracking-[0.08em] rounded-[2px] hover:bg-[#C9A96E] hover:text-[#1C1C1C] transition-all flex items-center justify-center gap-2 cursor-pointer"
                  >
                    <Send size={14} />
                    Send Event Inquiry
                  </SubmitButton>
                </div>
              </form>
            )}
          </motion.div>

          {/* Rapid Callback Request (Right / Compact Dark Card) */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-80px' }}
            variants={fadeUp}
            className="lg:col-span-5 bg-[#1C1C1C] text-[#FDFDFD] p-8 md:p-10 rounded-[3px] shadow-xl flex flex-col gap-6"
          >
            <div className="border-b border-[#333333] pb-4">
              <span className="text-[11px] font-bold uppercase tracking-[0.2em] text-[#C9A96E] flex items-center gap-1.5">
                <Sparkles size={13} />
                Quick Consultation
              </span>
              <h3 className="font-serif text-[22px] font-normal text-[#FDFDFD] mt-1">
                Request a Call Back
              </h3>
            </div>

            <p className="text-[#A3A3A3] text-[14px] leading-relaxed">
              Have questions about locations, weather, packages, or timing? Leave your phone number and our master event coordinator will call you back.
            </p>

            {callState.status === 'success' ? (
              <div role="status" className="py-8 flex flex-col items-center text-center gap-3">
                <div className="w-12 h-12 rounded-full bg-[#333333] flex items-center justify-center text-xl text-[#C9A96E]">
                  ✓
                </div>
                <h4 className="text-[18px] font-bold text-[#FDFDFD]">Callback Requested</h4>
                <p className="text-[13px] text-[#A3A3A3]">
                  We have received your number and will call you back shortly.
                </p>
              </div>
            ) : (
              <form action={callAction} className="flex flex-col gap-5">
                <Honeypot />

                <div className="flex flex-col gap-1">
                  <label htmlFor="cbe-name" className="text-[12px] font-bold tracking-wide uppercase text-[#8A8A8A]">
                    Your Name <span className="text-[#C9A96E]">*</span>
                  </label>
                  <input
                    id="cbe-name"
                    name="name"
                    type="text"
                    required
                    autoComplete="name"
                    placeholder="Jane"
                    className="w-full bg-transparent border-b border-[#333333] py-2 text-[14px] text-[#FDFDFD] placeholder:text-[#5A5A5A] focus:outline-none focus:border-[#C9A96E] transition-colors rounded-none"
                  />
                  <FieldError messages={callState.errors?.name} />
                </div>

                <PhoneField
                  id="cbe-phone"
                  name="phone"
                  label="Phone Number"
                  required
                  error={callState.errors?.phone}
                  defaultValue={callState.values?.phone}
                  labelClassName="text-[12px] font-bold tracking-wide uppercase text-[#8A8A8A]"
                  className="w-full bg-transparent border-b border-[#333333] py-2 text-[14px] text-[#FDFDFD] placeholder:text-[#5A5A5A] focus:outline-none focus:border-[#C9A96E] transition-colors rounded-none"
                />

                {/* WhatsApp Checkbox */}
                <label className="flex items-center gap-2.5 cursor-pointer mt-1 group">
                  <input
                    type="checkbox"
                    name="whatsapp"
                    checked={whatsapp}
                    onChange={(e) => setWhatsapp(e.target.checked)}
                    className="w-4 h-4 rounded border-[#444] bg-[#222] accent-[#C9A96E] cursor-pointer"
                  />
                  <span className="text-[13px] text-[#A3A3A3] group-hover:text-[#FDFDFD] transition-colors">
                    Prefer WhatsApp message / consultation
                  </span>
                </label>

                {callState.status === 'error' && (
                  <p role="alert" className="text-[#E8A5A5] text-[12px]">
                    {callState.message}
                  </p>
                )}

                <div className="pt-2">
                  <SubmitButton
                    pendingLabel="Calling Back…"
                    className="w-full py-4 bg-[#FDFDFD] text-[#1C1C1C] text-[13px] font-bold uppercase tracking-[0.08em] rounded-[2px] hover:bg-[#C9A96E] hover:text-[#1C1C1C] transition-all flex items-center justify-center gap-2 cursor-pointer font-sans"
                  >
                    <Phone size={14} />
                    Call Me Back
                  </SubmitButton>
                  <p className="text-[11.5px] text-[#6B6B6B] text-center mt-2.5">
                    Fast response · 10:00 AM – 7:00 PM PST citywide.
                  </p>
                </div>
              </form>
            )}
          </motion.div>

        </div>
      </div>
    </section>
  );
}
