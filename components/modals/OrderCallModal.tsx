import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Phone } from 'lucide-react';

interface OrderCallModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function OrderCallModal({ isOpen, onClose }: OrderCallModalProps) {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [whatsapp, setWhatsapp] = useState(false);
  const [telegram, setTelegram] = useState(false);
  const [error, setError] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) {
      setError(true);
      return;
    }
    setError(false);
    // Simulate submission
    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      setName('');
      setPhone('');
      setWhatsapp(false);
      setTelegram(false);
      onClose();
    }, 2000);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            key="order-backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            style={{ backgroundColor: 'rgba(28,28,28,0.35)', backdropFilter: 'blur(2px)' }}
            className="fixed inset-0 z-[100]"
            onClick={onClose}
          />

          {/* Modal */}
          <motion.div
            key="order-panel"
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
            style={{
              position: 'fixed',
              top: 0,
              right: 0,
              bottom: 0,
              zIndex: 110,
              width: 'min(480px, 100vw)',
              backgroundColor: '#FDFDFD',
              boxShadow: '-10px 0 40px rgba(0,0,0,0.1)',
              display: 'flex',
              flexDirection: 'column',
            }}
          >
            {/* Close */}
            <button
              aria-label="Close modal"
              onClick={onClose}
              style={{
                position: 'absolute',
                top: 20,
                right: 20,
                width: 32,
                height: 32,
                borderRadius: '50%',
                backgroundColor: '#F7F5F2',
                border: 'none',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: 'pointer',
                zIndex: 10,
              }}
            >
              <X size={14} strokeWidth={1.5} color="#1C1C1C" />
            </button>

            {/* Scrollable content */}
            <div style={{ overflowY: 'auto', flex: 1, padding: '36px 40px' }}>
              {!submitted ? (
                <>
                  <div style={{ marginBottom: 32, borderBottom: '1px solid #E5E5E5', paddingBottom: 24 }}>
                    <p style={{ fontSize: 10, letterSpacing: '0.2em', textTransform: 'uppercase', color: '#8A8A8A', marginBottom: 6 }}>Contact Us</p>
                    <h3 style={{ fontFamily: "var(--font-sans)", fontSize: 22, fontWeight: 700, color: '#1C1C1C', lineHeight: 1.2 }}>We will call you back</h3>
                  </div>

                  <form onSubmit={handleSubmit} className="flex flex-col gap-6">
                    <div className="flex flex-col gap-1">
                      <label className="text-[11px] font-bold tracking-wide uppercase text-[#5A5A5A]">Name <span className="text-[#C9A96E]">*</span></label>
                      <input
                        type="text"
                        placeholder="Jane Doe"
                        value={name}
                        onChange={(e) => {
                          setName(e.target.value);
                          if (error) setError(false);
                        }}
                        className="w-full bg-transparent border-b border-[#D1D1D1] py-2 text-[14px] text-[#1C1C1C] placeholder:text-[#A3A3A3] focus:outline-none focus:border-[#1C1C1C] hover:border-[#8A8A8A] transition-colors rounded-none"
                      />
                      {error && (
                        <span className="text-red-500 text-[10px] mt-1 tracking-wide uppercase">This field is required.</span>
                      )}
                    </div>

                    <div className="flex flex-col gap-1">
                      <label className="text-[11px] font-bold tracking-wide uppercase text-[#5A5A5A]">Phone Number <span className="text-[#C9A96E]">*</span></label>
                      <input
                        type="tel"
                        required
                        placeholder="+1 (999) 999-9999"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        className="w-full bg-transparent border-b border-[#D1D1D1] py-2 text-[14px] text-[#1C1C1C] placeholder:text-[#A3A3A3] focus:outline-none focus:border-[#1C1C1C] hover:border-[#8A8A8A] transition-colors rounded-none"
                      />
                    </div>

                    <div className="flex flex-col gap-3 mt-2">
                      <p className="text-[11px] font-bold tracking-wide uppercase text-[#5A5A5A]">Preferred Messenger (Optional)</p>
                      
                      <label className="flex items-center gap-3 cursor-pointer group w-fit">
                        <div className={`w-4 h-4 flex items-center justify-center transition-colors ${whatsapp ? 'bg-[#1C1C1C] border-[#1C1C1C]' : 'border border-[#D1D1D1] bg-transparent group-hover:border-[#8A8A8A]'}`}>
                          {whatsapp && <svg className="w-2.5 h-2.5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" /></svg>}
                        </div>
                        <input type="checkbox" className="hidden" checked={whatsapp} onChange={(e) => setWhatsapp(e.target.checked)} />
                        <span className="text-[13px] text-[#5A5A5A] group-hover:text-[#1C1C1C] transition-colors flex items-center gap-2">
                          Write to me on WhatsApp
                          <svg viewBox="0 0 24 24" className="w-4 h-4 fill-current">
                            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51a12.8 12.8 0 00-.57-.01c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
                          </svg>
                        </span>
                      </label>

                      <label className="flex items-center gap-3 cursor-pointer group w-fit">
                        <div className={`w-4 h-4 flex items-center justify-center transition-colors ${telegram ? 'bg-[#1C1C1C] border-[#1C1C1C]' : 'border border-[#D1D1D1] bg-transparent group-hover:border-[#8A8A8A]'}`}>
                          {telegram && <svg className="w-2.5 h-2.5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" /></svg>}
                        </div>
                        <input type="checkbox" className="hidden" checked={telegram} onChange={(e) => setTelegram(e.target.checked)} />
                        <span className="text-[13px] text-[#5A5A5A] group-hover:text-[#1C1C1C] transition-colors flex items-center gap-2">
                          Write to me on Telegram
                          <svg viewBox="0 0 24 24" className="w-4 h-4 fill-current">
                            <path d="M11.944 0A12 12 0 000 12a12 12 0 0012 12 12 12 0 0012-12A12 12 0 0012 0a12 12 0 00-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 01.171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.48.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.892-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z"/>
                          </svg>
                        </span>
                      </label>
                    </div>

                    <button
                      type="submit"
                      style={{
                        width: '100%',
                        padding: '16px',
                        backgroundColor: '#1C1C1C',
                        color: '#FDFDFD',
                        fontSize: 13,
                        fontWeight: 700,
                        letterSpacing: '0.04em',
                        textTransform: 'uppercase',
                        fontFamily: 'var(--font-sans)',
                        border: 'none',
                        borderRadius: 2,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        gap: 8,
                        marginTop: 16,
                        cursor: 'pointer',
                        transition: 'background-color 0.3s'
                      }}
                      onMouseEnter={e => e.currentTarget.style.backgroundColor = '#C9A96E'}
                      onMouseLeave={e => e.currentTarget.style.backgroundColor = '#1C1C1C'}
                    >
                      <Phone size={14} strokeWidth={2.5} />
                      Order a call
                    </button>

                    <p className="text-[11px] text-[#8A8A8A] mt-2 leading-relaxed">
                      By clicking the "Order a call" button, I give my{' '}
                      <a href="#" className="text-[#1C1C1C] hover:text-[#C9A96E] transition-colors underline decoration-[#E5E5E5] hover:decoration-[#C9A96E] underline-offset-4">
                        Consent to the processing of my personal data
                      </a>
                      . In accordance with the Federal Law "On Personal Data", on the terms and for the purposes defined in the Consent to the processing of personal data.
                    </p>
                  </form>
                </>
              ) : (
                /* Success */
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center', gap: 16, padding: '40px 0' }}
                >
                  <div style={{ width: 56, height: 56, borderRadius: '50%', backgroundColor: '#F7F5F2', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 24, marginBottom: 8 }}>✨</div>
                  <h3 style={{ fontFamily: "var(--font-sans)", fontSize: 26, fontWeight: 700, color: '#1C1C1C' }}>Thank You!</h3>
                  <p style={{ fontSize: 13, color: '#8A8A8A', lineHeight: 1.7, maxWidth: 280 }}>
                    We've received your request. Our manager will call you back shortly.
                  </p>
                  <button
                    onClick={onClose}
                    style={{ marginTop: 16, padding: '12px 32px', border: '1px solid #1C1C1C', borderRadius: 2, fontSize: 13, fontWeight: 700, letterSpacing: '0.04em', textTransform: 'uppercase', color: '#1C1C1C', backgroundColor: 'transparent', cursor: 'pointer', transition: 'all 0.3s' }}
                    onMouseEnter={e => {
                      e.currentTarget.style.backgroundColor = '#1C1C1C';
                      e.currentTarget.style.color = '#FDFDFD';
                    }}
                    onMouseLeave={e => {
                      e.currentTarget.style.backgroundColor = 'transparent';
                      e.currentTarget.style.color = '#1C1C1C';
                    }}
                  >
                    Close
                  </button>
                </motion.div>
              )}
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
