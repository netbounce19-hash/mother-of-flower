'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Send } from 'lucide-react';
import { Product, HintFormData } from '@/types';

interface DropHintModalProps {
  product: Product | null;
  isOpen: boolean;
  onClose: () => void;
}

interface FieldProps {
  id: string;
  label: string;
  type?: string;
  value: string;
  onChange: (v: string) => void;
  required?: boolean;
}

function FloatingInput({ id, label, type = 'text', value, onChange, required }: FieldProps) {
  const [focused, setFocused] = useState(false);
  const lifted = focused || value.length > 0;

  return (
    <div style={{ position: 'relative', paddingTop: 20 }}>
      <label
        htmlFor={id}
        style={{
          position: 'absolute',
          left: 0,
          top: lifted ? 0 : 20,
          fontSize: lifted ? 10 : 13,
          letterSpacing: lifted ? '0.2em' : '0.02em',
          textTransform: lifted ? 'uppercase' : 'none',
          color: '#8A8A8A',
          transition: 'all 0.2s',
          pointerEvents: 'none',
        }}
      >
        {label}
        {required && <span style={{ color: '#C9A96E', marginLeft: 2 }}>*</span>}
      </label>
      <input
        id={id}
        type={type}
        value={value}
        required={required}
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
        onChange={(e) => onChange(e.target.value)}
        style={{
          width: '100%',
          backgroundColor: 'transparent',
          border: 'none',
          borderBottom: `1px solid ${focused ? '#1C1C1C' : '#E5E5E5'}`,
          outline: 'none',
          padding: '8px 0',
          fontSize: 14,
          color: '#1C1C1C',
          transition: 'border-color 0.2s',
          fontFamily: 'Inter, sans-serif',
        }}
      />
    </div>
  );
}

export default function DropHintModal({ product, isOpen, onClose }: DropHintModalProps) {
  const [form, setForm] = useState<HintFormData>({
    recipientFirstName: '',
    recipientEmail: '',
    senderFirstName: '',
    senderEmail: '',
  });
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    if (isOpen) {
      setForm({ recipientFirstName: '', recipientEmail: '', senderFirstName: '', senderEmail: '' });
      setSubmitted(false);
    }
  }, [isOpen]);

  const set = (key: keyof HintFormData) => (v: string) => setForm((f) => ({ ...f, [key]: v }));

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  if (!product) return null;

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            key="hint-backdrop"
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
            key="hint-panel"
            initial={{ opacity: 0, scale: 0.96, y: 16 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.97, y: 10 }}
            transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] as [number,number,number,number] }}
            style={{
              position: 'fixed',
              top: '50%',
              left: '50%',
              transform: 'translate(-50%, -50%)',
              zIndex: 110,
              width: 'min(520px, calc(100vw - 32px))',
              maxHeight: 'calc(100dvh - 48px)',
              backgroundColor: '#FDFDFD',
              borderRadius: 16,
              boxShadow: '0 25px 60px rgba(0,0,0,0.15)',
              overflow: 'hidden',
              display: 'flex',
              flexDirection: 'column',
            }}
          >
            {/* Close */}
            <button
              aria-label="Close hint modal"
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
                  {/* Product preview */}
                  <div style={{ display: 'flex', alignItems: 'center', gap: 16, marginBottom: 28, paddingBottom: 24, borderBottom: '1px solid #E5E5E5' }}>
                    <div style={{ width: 60, height: 60, borderRadius: 10, overflow: 'hidden', flexShrink: 0, backgroundColor: '#F7F5F2' }}>
                      <img src={product.images[0]} alt={product.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                    </div>
                    <div>
                      <p style={{ fontSize: 10, letterSpacing: '0.2em', textTransform: 'uppercase', color: '#8A8A8A', marginBottom: 2 }}>Drop a Hint</p>
                      <h3 style={{ fontFamily: "'Cormorant Garamond', Georgia, serif", fontSize: 18, color: '#1C1C1C', lineHeight: 1.2 }}>{product.name}</h3>
                      <p style={{ fontSize: 12, color: '#8A8A8A', marginTop: 2 }}>{product.currency} {product.price.toLocaleString()}</p>
                    </div>
                  </div>

                  <form onSubmit={handleSubmit}>
                    {/* Recipient */}
                    <div style={{ marginBottom: 24 }}>
                      <p style={{ fontSize: 11, letterSpacing: '0.25em', textTransform: 'uppercase', color: '#1C1C1C', marginBottom: 16 }}>Recipient</p>
                      <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
                        <FloatingInput id="r-name" label="First Name" value={form.recipientFirstName} onChange={set('recipientFirstName')} required />
                        <FloatingInput id="r-email" label="Email Address" type="email" value={form.recipientEmail} onChange={set('recipientEmail')} required />
                      </div>
                    </div>

                    <div style={{ width: '100%', height: 1, backgroundColor: '#E5E5E5', marginBottom: 24 }} />

                    {/* Sender */}
                    <div style={{ marginBottom: 28 }}>
                      <p style={{ fontSize: 11, letterSpacing: '0.25em', textTransform: 'uppercase', color: '#1C1C1C', marginBottom: 16 }}>Your Details</p>
                      <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
                        <FloatingInput id="s-name" label="First Name" value={form.senderFirstName} onChange={set('senderFirstName')} required />
                        <FloatingInput id="s-email" label="Email Address" type="email" value={form.senderEmail} onChange={set('senderEmail')} required />
                      </div>
                    </div>

                    <button
                      type="submit"
                      style={{
                        width: '100%',
                        padding: '16px',
                        backgroundColor: '#1C1C1C',
                        color: '#FDFDFD',
                        fontSize: 12,
                        letterSpacing: '0.18em',
                        textTransform: 'uppercase',
                        fontFamily: 'Inter, sans-serif',
                        border: 'none',
                        borderRadius: 2,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        gap: 8,
                        cursor: 'pointer',
                      }}
                    >
                      <Send size={14} strokeWidth={1.5} />
                      Send Hint
                    </button>
                  </form>
                </>
              ) : (
                /* Success */
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center', gap: 16, padding: '20px 0' }}
                >
                  <div style={{ width: 56, height: 56, borderRadius: '50%', backgroundColor: '#F7F5F2', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 24 }}>🌸</div>
                  <h3 style={{ fontFamily: "'Cormorant Garamond', Georgia, serif", fontSize: 26, color: '#1C1C1C' }}>Hint Sent!</h3>
                  <p style={{ fontSize: 13, color: '#8A8A8A', lineHeight: 1.7, maxWidth: 280 }}>
                    We've sent a beautiful hint to <strong style={{ color: '#1C1C1C', fontWeight: 400 }}>{form.recipientFirstName || 'them'}</strong>. Fingers crossed they take the hint! 🌹
                  </p>
                  <button
                    onClick={onClose}
                    style={{ marginTop: 8, padding: '10px 28px', border: '1px solid #E5E5E5', borderRadius: 9999, fontSize: 11, letterSpacing: '0.15em', textTransform: 'uppercase', color: '#1C1C1C', backgroundColor: 'transparent', cursor: 'pointer' }}
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
