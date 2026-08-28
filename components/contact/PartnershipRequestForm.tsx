'use client';

import { useActionState } from 'react';
import { motion, Variants } from 'framer-motion';
import { submitCallRequest, submitPartnership } from '@/app/actions/submissions';
import { initialFormState } from '@/lib/form-state';
import { FieldError, Honeypot, SubmitButton } from '@/components/forms/FormBits';

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] } }
};

const staggerContainer: Variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.15 } }
};

export default function PartnershipRequestForm() {
  const [partnerState, partnerAction] = useActionState(submitPartnership, initialFormState);
  const [callState, callAction] = useActionState(submitCallRequest, initialFormState);

  return (
    <section id="partnership-request" className="w-full bg-[#FAF8F4] site-section">
      <div className="site-container">
        
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={staggerContainer}
          className="flex flex-col text-center mb-14 gap-4"
        >
          <motion.p variants={fadeUp} className="text-[11px] font-bold uppercase tracking-[0.2em] text-[#8A6A2E]">
            Become a Partner
          </motion.p>
          <motion.h2 variants={fadeUp} className="font-serif text-[clamp(2rem,3.5vw,2.8rem)] font-normal leading-[1.1] text-[#1C1C1C]">
            Let&apos;s discuss the details
          </motion.h2>
          <motion.p variants={fadeUp} className="text-[#6B6B6B] text-[14px] font-medium max-w-xl mx-auto leading-relaxed">
            Fill out the contact form and we&apos;ll get back within one business day to discuss collaboration opportunities.
          </motion.p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-16 items-start">
          
          {/* Main Partnership Request Form */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={fadeUp}
            className="lg:col-span-3 flex flex-col gap-8 bg-[#FDFDFD] p-8 md:p-12 shadow-[0_10px_40px_rgba(0,0,0,0.04)] rounded-[2px]"
          >
            <h3 className="text-[18px] font-bold uppercase tracking-wide text-[#1C1C1C] border-b border-[#E5E2DB] pb-4">
              Submit a Request
            </h3>
            {partnerState.status === 'success' ? (
              <div role="status" className="flex flex-col gap-3">
                <p className="text-[11px] font-bold uppercase tracking-[0.2em] text-[#8A6A2E]">Request received</p>
                <h4 className="text-[20px] font-bold text-[#1C1C1C]">Thank you</h4>
                <p className="text-[14px] text-[#555555] leading-relaxed">
                  We&apos;ll get back to you within one business day to discuss the details.
                </p>
              </div>
            ) : (
            <form action={partnerAction} className="flex flex-col gap-6">
              <Honeypot />
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="flex flex-col gap-1">
                  <label htmlFor="pr-company" className="text-[11px] font-bold tracking-wide uppercase text-[#5A5A5A]">Company Name</label>
                  <input
                    id="pr-company"
                    name="companyName"
                    type="text"
                    required
                    autoComplete="organization"
                    placeholder="Wynn Resort / Freelance Planner"
                    className="w-full bg-transparent border-b border-[#D1D1D1] py-2 text-[14px] text-[#1C1C1C] placeholder:text-[#A3A3A3] focus:outline-none focus:border-[#1C1C1C] hover:border-[#8A8A8A] transition-colors rounded-none"
                  />
                  <FieldError messages={partnerState.errors?.companyName} />
                </div>
                <div className="flex flex-col gap-1">
                  <label htmlFor="pr-name" className="text-[11px] font-bold tracking-wide uppercase text-[#5A5A5A]">Contact Person</label>
                  <input
                    id="pr-name"
                    name="name"
                    type="text"
                    required
                    autoComplete="name"
                    placeholder="Jane Doe"
                    className="w-full bg-transparent border-b border-[#D1D1D1] py-2 text-[14px] text-[#1C1C1C] placeholder:text-[#A3A3A3] focus:outline-none focus:border-[#1C1C1C] hover:border-[#8A8A8A] transition-colors rounded-none"
                  />
                  <FieldError messages={partnerState.errors?.name} />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="flex flex-col gap-1">
                  <label htmlFor="pr-phone" className="text-[11px] font-bold tracking-wide uppercase text-[#5A5A5A]">Phone Number</label>
                  <input
                    id="pr-phone"
                    name="phone"
                    type="tel"
                    required
                    autoComplete="tel"
                    placeholder="+1 (555) 000-0000"
                    className="w-full bg-transparent border-b border-[#D1D1D1] py-2 text-[14px] text-[#1C1C1C] placeholder:text-[#A3A3A3] focus:outline-none focus:border-[#1C1C1C] hover:border-[#8A8A8A] transition-colors rounded-none"
                  />
                  <FieldError messages={partnerState.errors?.phone} />
                </div>
                <div className="flex flex-col gap-1">
                  <label htmlFor="pr-email" className="text-[11px] font-bold tracking-wide uppercase text-[#5A5A5A]">Email Address</label>
                  <input
                    id="pr-email"
                    name="email"
                    type="email"
                    required
                    autoComplete="email"
                    placeholder="contact@example.com"
                    className="w-full bg-transparent border-b border-[#D1D1D1] py-2 text-[14px] text-[#1C1C1C] placeholder:text-[#A3A3A3] focus:outline-none focus:border-[#1C1C1C] hover:border-[#8A8A8A] transition-colors rounded-none"
                  />
                  <FieldError messages={partnerState.errors?.email} />
                </div>
              </div>

              <div className="flex flex-col gap-1">
                <label htmlFor="pr-details" className="text-[11px] font-bold tracking-wide uppercase text-[#5A5A5A]">Project Details / Venue Description</label>
                <textarea
                  id="pr-details"
                  name="details"
                  placeholder="Tell us about your venue, typical volume, or specific event needs..."
                  rows={4}
                  className="w-full bg-transparent border-b border-[#D1D1D1] py-2 text-[14px] text-[#1C1C1C] placeholder:text-[#A3A3A3] focus:outline-none focus:border-[#1C1C1C] hover:border-[#8A8A8A] transition-colors resize-none rounded-none"
                />
              </div>

              {partnerState.status === 'error' && (
                <p role="alert" className="text-[#C0392B] text-[12px]">{partnerState.message}</p>
              )}

              <div className="mt-4">
                <SubmitButton
                  className="inline-flex items-center justify-center transition-all duration-300 w-full md:w-fit"
                  style={{
                    backgroundColor: '#1C1C1C',
                    color: '#FDFDFD',
                    padding: '16px 48px',
                    fontSize: '13px',
                    letterSpacing: '0.04em',
                    textTransform: 'uppercase',
                    fontWeight: 700,
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.backgroundColor = '#C9A96E';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.backgroundColor = '#1C1C1C';
                  }}
                >
                  Submit Request
                </SubmitButton>
              </div>
            </form>
            )}
          </motion.div>

          {/* Quick Call Back Form */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={fadeUp}
            className="lg:col-span-2 flex flex-col gap-8 bg-[#1C1C1C] p-8 md:p-12 shadow-[0_10px_40px_rgba(0,0,0,0.15)] rounded-[2px]"
          >
            <h3 className="text-[18px] font-bold uppercase tracking-wide text-[#FDFDFD] border-b border-[#333333] pb-4">
              Request a Call
            </h3>
            <p className="text-[#A3A3A3] text-[14px] leading-relaxed">
              In a hurry? Leave your number and our team will call you back to discuss the details shortly.
            </p>

            {callState.status === 'success' ? (
              <p role="status" className="text-[#FDFDFD] text-[14px] leading-relaxed">
                Thank you — we have your number and will call you back shortly.
              </p>
            ) : (
            <form action={callAction} className="flex flex-col gap-6">
              <Honeypot />
              <div className="flex flex-col gap-1">
                <label htmlFor="cb-name" className="text-[11px] font-bold tracking-wide uppercase text-[#6B6B6B]">Your Name</label>
                <input
                  id="cb-name"
                  name="name"
                  type="text"
                  required
                  autoComplete="name"
                  placeholder="Jane"
                  className="w-full bg-transparent border-b border-[#333333] py-2 text-[14px] text-[#FDFDFD] placeholder:text-[#5A5A5A] focus:outline-none focus:border-[#FDFDFD] hover:border-[#8A8A8A] transition-colors rounded-none"
                />
                <FieldError messages={callState.errors?.name} />
              </div>

              <div className="flex flex-col gap-1">
                <label htmlFor="cb-phone" className="text-[11px] font-bold tracking-wide uppercase text-[#6B6B6B]">Phone Number</label>
                <input
                  id="cb-phone"
                  name="phone"
                  type="tel"
                  required
                  autoComplete="tel"
                  placeholder="+1 (555) 000-0000"
                  className="w-full bg-transparent border-b border-[#333333] py-2 text-[14px] text-[#FDFDFD] placeholder:text-[#5A5A5A] focus:outline-none focus:border-[#FDFDFD] hover:border-[#8A8A8A] transition-colors rounded-none"
                />
                <FieldError messages={callState.errors?.phone} />
              </div>

              {callState.status === 'error' && !callState.errors && (
                <p role="alert" className="text-[#E8A5A5] text-[12px]">{callState.message}</p>
              )}

              <div className="mt-4 flex flex-col gap-4">
                <SubmitButton
                  className="inline-flex items-center justify-center transition-all duration-300 w-full"
                  style={{
                    backgroundColor: '#FDFDFD',
                    color: '#1C1C1C',
                    padding: '16px 48px',
                    fontSize: '13px',
                    letterSpacing: '0.04em',
                    textTransform: 'uppercase',
                    fontWeight: 700,
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.backgroundColor = '#C9A96E';
                    e.currentTarget.style.color = '#FDFDFD';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.backgroundColor = '#FDFDFD';
                    e.currentTarget.style.color = '#1C1C1C';
                  }}
                >
                  We Will Call You Back
                </SubmitButton>
                <p className="text-[10px] text-[#5A5A5A] leading-relaxed mt-2 text-center">
                  By submitting this form you agree to our{' '}
                  <a href="/privacy" className="text-[#6B6B6B] hover:text-[#8A6A2E] transition-colors underline underline-offset-4">
                    Privacy Policy
                  </a>.
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
