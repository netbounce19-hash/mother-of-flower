'use client';

import { useActionState, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Sparkles, Calendar, Users, MapPin, Check, Phone } from 'lucide-react';
import { submitCustomRequest } from '@/app/actions/submissions';
import { initialFormState } from '@/lib/form-state';
import { FieldError, Honeypot, SubmitButton } from '@/components/forms/FormBits';
import { useOverlay } from '@/hooks/useOverlay';

export interface PackageDetails {
  id: string;
  name: string;
  price: number;
  guests: string;
}

interface EventBookingModalProps {
  isOpen: boolean;
  onClose: () => void;
  selectedPackage?: PackageDetails | null;
  initialLocation?: string;
  mode?: 'booking' | 'call';
}

const PACKAGES: PackageDetails[] = [
  { id: 'essential', name: 'Essential Picnic', price: 850, guests: 'Up to 4 guests' },
  { id: 'signature', name: 'Signature Picnic', price: 1250, guests: 'Up to 6 guests' },
  { id: 'grand', name: 'Grand Picnic', price: 1650, guests: 'Up to 8 guests' },
  { id: 'bespoke', name: 'Custom Bespoke Event', price: 0, guests: '8+ guests / Tailored' },
];

const LOCATIONS = [
  'Lakeside Escape (Lake Mead • Boulder City)',
  'Sunset Strip Lawn (Las Vegas • Golden Hour)',
  'Private Residence / Suite',
  'Scenic Lookout / Desert Vista',
  'Undecided / Open to Recommendations',
];

export default function EventBookingModal({
  isOpen,
  onClose,
  selectedPackage,
  initialLocation,
  mode = 'booking',
}: EventBookingModalProps) {
  const [pkgId, setPkgId] = useState<string>(selectedPackage?.id || 'signature');
  const [location, setLocation] = useState<string>(initialLocation || LOCATIONS[0]);
  const [guestCount, setGuestCount] = useState<string>(selectedPackage?.guests || 'Up to 6 guests');
  const [state, formAction] = useActionState(submitCustomRequest, initialFormState);
  const panelRef = useOverlay<HTMLDivElement>(isOpen, onClose);

  const activePkg = PACKAGES.find((p) => p.id === pkgId) || PACKAGES[1];
  const submitted = state.status === 'success';

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          key="event-backdrop"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.25 }}
          style={{ backgroundColor: 'rgba(28,28,28,0.5)', backdropFilter: 'blur(4px)' }}
          className="fixed inset-0 z-[100]"
          onClick={onClose}
        />
      )}

      {isOpen && (
        <motion.div
          key="event-panel"
          ref={panelRef}
          role="dialog"
          aria-modal="true"
          aria-label="Event Package Booking & Inquiry"
          tabIndex={-1}
          initial={{ x: '100%' }}
          animate={{ x: 0 }}
          exit={{ x: '100%' }}
          transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
          className="fixed top-0 right-0 bottom-0 z-[110] w-full max-w-[540px] bg-[#FDFDFD] shadow-2xl flex flex-col"
        >
          {/* Header */}
          <div className="flex items-center justify-between px-6 md:px-8 py-5 border-b border-[#E5E2DB] bg-[#FAF8F4]">
            <div className="flex flex-col">
              <span className="text-[11px] font-bold uppercase tracking-[0.2em] text-[#8A6A2E]">
                Mother of Flower · Events
              </span>
              <h3 className="font-serif text-[20px] md:text-[22px] font-medium text-[#1C1C1C] leading-tight mt-0.5">
                {mode === 'call' ? 'Request an Event Callback' : 'Reserve Your Experience'}
              </h3>
            </div>
            <button
              aria-label="Close modal"
              onClick={onClose}
              className="w-9 h-9 rounded-full bg-white border border-[#E5E2DB] flex items-center justify-center text-[#1C1C1C] hover:bg-[#1C1C1C] hover:text-white transition-colors cursor-pointer"
            >
              <X size={15} strokeWidth={1.8} />
            </button>
          </div>

          {/* Scrollable Content */}
          <div className="overflow-y-auto flex-1 px-6 md:px-8 py-6">
            {!submitted ? (
              <form action={formAction} className="flex flex-col gap-6">
                <Honeypot />

                {/* Package Selector */}
                <div className="flex flex-col gap-2">
                  <label className="text-[12px] font-bold tracking-wider uppercase text-[#5A5A5A] flex items-center gap-1.5">
                    <Sparkles size={13} className="text-[#8A6A2E]" />
                    Select Experience Package
                  </label>
                  <div className="grid grid-cols-2 gap-2.5">
                    {PACKAGES.map((p) => {
                      const selected = p.id === pkgId;
                      return (
                        <button
                          key={p.id}
                          type="button"
                          onClick={() => {
                            setPkgId(p.id);
                            setGuestCount(p.guests);
                          }}
                          className={`p-3 rounded-[3px] border text-left flex flex-col justify-between transition-all cursor-pointer ${
                            selected
                              ? 'border-[#1C1C1C] bg-[#1C1C1C] text-[#FDFDFD] shadow-sm'
                              : 'border-[#E5E2DB] bg-[#FAF8F4] text-[#1C1C1C] hover:border-[#8A8A8A]'
                          }`}
                        >
                          <div className="flex items-center justify-between w-full mb-1">
                            <span className="text-[13px] font-bold tracking-tight">
                              {p.name}
                            </span>
                            {selected && <Check size={13} className="text-[#C9A96E]" />}
                          </div>
                          <div className="flex items-baseline gap-1 mt-1">
                            <span className="text-[14px] font-serif font-bold">
                              {p.price > 0 ? `$${p.price.toLocaleString()}` : 'Custom'}
                            </span>
                            <span
                              className={`text-[11px] ${
                                selected ? 'text-[#D1D1D1]' : 'text-[#6B6B6B]'
                              }`}
                            >
                              · {p.guests}
                            </span>
                          </div>
                        </button>
                      );
                    })}
                  </div>
                  {/* Hidden input for formData */}
                  <input
                    type="hidden"
                    name="inquiryType"
                    value={`Event Package: ${activePkg.name} ($${activePkg.price || 'Custom'})`}
                  />
                  <input
                    type="hidden"
                    name="budget"
                    value={activePkg.price > 0 ? `$${activePkg.price}` : 'Bespoke Inquiry'}
                  />
                </div>

                {/* Preferred Location */}
                <div className="flex flex-col gap-1.5">
                  <label
                    htmlFor="event-location"
                    className="text-[12px] font-bold tracking-wider uppercase text-[#5A5A5A] flex items-center gap-1.5"
                  >
                    <MapPin size={13} className="text-[#8A6A2E]" />
                    Preferred Location
                  </label>
                  <select
                    id="event-location"
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                    className="w-full bg-[#FAF8F4] border border-[#D1D1D1] px-3.5 py-2.5 text-[13.5px] text-[#1C1C1C] focus:outline-none focus:border-[#1C1C1C] rounded-[2px] cursor-pointer"
                  >
                    {LOCATIONS.map((loc) => (
                      <option key={loc} value={loc}>
                        {loc}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Event Date & Guest Count Row */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="flex flex-col gap-1.5">
                    <label
                      htmlFor="event-date"
                      className="text-[12px] font-bold tracking-wider uppercase text-[#5A5A5A] flex items-center gap-1.5"
                    >
                      <Calendar size={13} className="text-[#8A6A2E]" />
                      Preferred Date
                    </label>
                    <input
                      id="event-date"
                      name="eventDate"
                      type="date"
                      min={new Date().toISOString().split('T')[0]}
                      className="w-full bg-[#FAF8F4] border border-[#D1D1D1] px-3.5 py-2 text-[13.5px] text-[#1C1C1C] focus:outline-none focus:border-[#1C1C1C] rounded-[2px]"
                    />
                  </div>

                  <div className="flex flex-col gap-1.5">
                    <label
                      htmlFor="event-guests"
                      className="text-[12px] font-bold tracking-wider uppercase text-[#5A5A5A] flex items-center gap-1.5"
                    >
                      <Users size={13} className="text-[#8A6A2E]" />
                      Estimated Guests
                    </label>
                    <input
                      id="event-guests"
                      type="text"
                      value={guestCount}
                      onChange={(e) => setGuestCount(e.target.value)}
                      placeholder="e.g. 4 guests"
                      className="w-full bg-[#FAF8F4] border border-[#D1D1D1] px-3.5 py-2 text-[13.5px] text-[#1C1C1C] focus:outline-none focus:border-[#1C1C1C] rounded-[2px]"
                    />
                  </div>
                </div>

                {/* Contact Info */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="flex flex-col gap-1">
                    <label
                      htmlFor="client-name"
                      className="text-[12px] font-bold tracking-wider uppercase text-[#5A5A5A]"
                    >
                      Your Name <span className="text-[#8A6A2E]">*</span>
                    </label>
                    <input
                      id="client-name"
                      name="name"
                      type="text"
                      required
                      autoComplete="name"
                      placeholder="Jane Doe"
                      className="w-full bg-transparent border-b border-[#D1D1D1] py-2 text-[14px] text-[#1C1C1C] placeholder:text-[#A3A3A3] focus:outline-none focus:border-[#1C1C1C] rounded-none"
                    />
                    <FieldError messages={state.errors?.name} />
                  </div>

                  <div className="flex flex-col gap-1">
                    <label
                      htmlFor="client-contact"
                      className="text-[12px] font-bold tracking-wider uppercase text-[#5A5A5A]"
                    >
                      Phone or Email <span className="text-[#8A6A2E]">*</span>
                    </label>
                    <input
                      id="client-contact"
                      name="contact"
                      type="text"
                      required
                      placeholder="+1 (725) 224-2454 / jane@..."
                      className="w-full bg-transparent border-b border-[#D1D1D1] py-2 text-[14px] text-[#1C1C1C] placeholder:text-[#A3A3A3] focus:outline-none focus:border-[#1C1C1C] rounded-none"
                    />
                    <FieldError messages={state.errors?.contact} />
                  </div>
                </div>

                {/* Add-ons & Details Notes */}
                <div className="flex flex-col gap-1">
                  <label
                    htmlFor="event-notes"
                    className="text-[12px] font-bold tracking-wider uppercase text-[#5A5A5A]"
                  >
                    Add-ons &amp; Celebration Details (Optional)
                  </label>
                  <textarea
                    id="event-notes"
                    name="details"
                    rows={3}
                    placeholder="Tell us about your occasion (proposal, birthday, anniversary), cake/food preferences, color palette, or custom florals..."
                    className="w-full bg-[#FAF8F4] border border-[#D1D1D1] p-3 text-[13.5px] text-[#1C1C1C] placeholder:text-[#8A8A8A] focus:outline-none focus:border-[#1C1C1C] resize-none rounded-[2px]"
                  />
                </div>

                {/* Add-on Badges Quick Note */}
                <div className="bg-[#FAF8F4] p-3.5 rounded-[2px] border border-[#E5E2DB] text-[12px] text-[#555555] flex flex-col gap-1.5">
                  <div className="font-bold text-[#1C1C1C] flex items-center gap-1.5 uppercase tracking-wide text-[11px]">
                    <span className="text-[#8A6A2E]">✦</span> Available Add-ons:
                  </div>
                  <p className="leading-relaxed">
                    Custom floral arches · Charcuterie &amp; gourmet food · Artisanal cakes · Custom signage &amp; stationery.
                  </p>
                </div>

                {state.status === 'error' && (
                  <p role="alert" className="text-[#C0392B] text-[12px] font-medium">
                    {state.message}
                  </p>
                )}

                {/* Submit button */}
                <div className="pt-2">
                  <SubmitButton
                    pendingLabel="Reserving Experience…"
                    className="w-full py-4 bg-[#1C1C1C] text-[#FDFDFD] text-[13px] font-bold uppercase tracking-[0.06em] rounded-[2px] hover:bg-[#8A6A2E] transition-all flex items-center justify-center gap-2 cursor-pointer"
                  >
                    <Phone size={14} />
                    {mode === 'call' ? 'Request Immediate Callback' : 'Confirm Booking Request'}
                  </SubmitButton>
                  <p className="text-[11.5px] text-[#6B6B6B] text-center mt-2.5">
                    No immediate charge · Our event concierge will contact you within 2 hours to finalize details.
                  </p>
                </div>
              </form>
            ) : (
              /* Success confirmation */
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="py-12 px-4 flex flex-col items-center text-center gap-4"
              >
                <div className="w-16 h-16 rounded-full bg-[#FAF8F4] border border-[#8A6A2E]/40 flex items-center justify-center text-[26px]">
                  ✨
                </div>
                <h4 className="font-serif text-[26px] font-medium text-[#1C1C1C]">
                  Booking Request Received
                </h4>
                <p className="text-[14px] text-[#555555] max-w-sm leading-relaxed">
                  Thank you for choosing Mother of Flower. Our master event stylist will reach out to you shortly to curate every detail of your celebration.
                </p>
                <div className="w-full max-w-xs bg-[#FAF8F4] border border-[#E5E2DB] p-4 rounded-[2px] text-left text-[12.5px] text-[#444444] mt-2">
                  <div className="font-bold text-[#1C1C1C] mb-1">Selected Package:</div>
                  <div>{activePkg.name} (${activePkg.price ? activePkg.price.toLocaleString() : 'Custom'})</div>
                  <div className="text-[11.5px] text-[#6B6B6B] mt-1">{location}</div>
                </div>
                <button
                  onClick={onClose}
                  className="mt-4 px-8 py-3 bg-[#1C1C1C] text-[#FDFDFD] text-[12px] font-bold uppercase tracking-wider rounded-[2px] hover:bg-[#8A6A2E] transition-colors cursor-pointer"
                >
                  Close Window
                </button>
              </motion.div>
            )}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
