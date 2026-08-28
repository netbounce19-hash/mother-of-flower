'use client';

import { useActionState, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import { X, Send } from 'lucide-react';
import { Product } from '@/types';
import { submitDropHint } from '@/app/actions/submissions';
import { initialFormState } from '@/lib/form-state';
import { FieldError, Honeypot, SubmitButton } from '@/components/forms/FormBits';
import { useOverlay } from '@/hooks/useOverlay';

interface DropHintModalProps {
  product: Product | null;
  isOpen: boolean;
  onClose: () => void;
}

interface FieldProps {
  id: string;
  name: string;
  label: string;
  type?: string;
  onChange?: (v: string) => void;
  required?: boolean;
  error?: string[];
}

/**
 * Uncontrolled on purpose: values are read from FormData on submit, so the
 * only local state is what the floating label needs.
 */
function FloatingInput({ id, name, label, type = 'text', onChange, required, error }: FieldProps) {
  const [focused, setFocused] = useState(false);
  const [hasValue, setHasValue] = useState(false);
  const lifted = focused || hasValue;

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
          color: '#6B6B6B',
          transition: 'all 0.2s',
          pointerEvents: 'none',
        }}
      >
        {label}
        {required && <span style={{ color: '#8A6A2E', marginLeft: 2 }}>*</span>}
      </label>
      <input
        id={id}
        name={name}
        type={type}
        required={required}
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
        onChange={(e) => {
          setHasValue(e.target.value.length > 0);
          onChange?.(e.target.value);
        }}
        style={{
          width: '100%',
          backgroundColor: 'transparent',
          border: 'none',
          borderBottom: `1px solid ${focused ? '#1C1C1C' : '#E5E2DB'}`,
          outline: 'none',
          padding: '8px 0',
          fontSize: 14,
          color: '#1C1C1C',
          transition: 'border-color 0.2s',
          fontFamily: 'var(--font-sans)',
        }}
      />
      <FieldError messages={error} />
    </div>
  );
}

export default function DropHintModal({ product, isOpen, onClose }: DropHintModalProps) {
  // Kept only so the success message can address the recipient by name.
  const [recipientName, setRecipientName] = useState('');
  const [state, formAction] = useActionState(submitDropHint, initialFormState);
  const panelRef = useOverlay<HTMLDivElement>(isOpen, onClose);

  const submitted = state.status === 'success';

  if (!product) return null;

  return (
    <AnimatePresence>
      {isOpen && (
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

        )}

        {isOpen && (
          <motion.div
            key="hint-panel"
            ref={panelRef}
            role="dialog"
            aria-modal="true"
            aria-label="Drop a hint"
            tabIndex={-1}
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
                  <div style={{ display: 'flex', alignItems: 'center', gap: 16, marginBottom: 28, paddingBottom: 24, borderBottom: '1px solid #E5E2DB' }}>
                    <div style={{ position: 'relative', width: 60, height: 60, borderRadius: 10, overflow: 'hidden', flexShrink: 0, backgroundColor: '#F7F5F2' }}>
                      <Image src={product.images[0]} alt={product.name} fill sizes="60px" style={{ objectFit: 'cover' }} />
                    </div>
                    <div>
                      <p style={{ fontSize: 10, letterSpacing: '0.2em', textTransform: 'uppercase', color: '#6B6B6B', marginBottom: 2 }}>Drop a Hint</p>
                      <h3 style={{ fontFamily: "var(--font-sans)", fontSize: 18, color: '#1C1C1C', lineHeight: 1.2 }}>{product.name}</h3>
                      <p style={{ fontSize: 12, color: '#6B6B6B', marginTop: 2 }}>{product.currency} {product.price.toLocaleString()}</p>
                    </div>
                  </div>

                  <form action={formAction}>
                    <Honeypot />
                    <input type="hidden" name="productName" value={product.name} />

                    {/* Recipient */}
                    <div style={{ marginBottom: 24 }}>
                      <p style={{ fontSize: 11, letterSpacing: '0.25em', textTransform: 'uppercase', color: '#1C1C1C', marginBottom: 16 }}>Recipient</p>
                      <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
                        <FloatingInput id="r-name" name="recipientFirstName" label="First Name" onChange={setRecipientName} error={state.errors?.recipientFirstName} required />
                        <FloatingInput id="r-email" name="recipientEmail" label="Email Address" type="email" error={state.errors?.recipientEmail} required />
                      </div>
                    </div>

                    <div style={{ width: '100%', height: 1, backgroundColor: '#E5E2DB', marginBottom: 24 }} />

                    {/* Sender */}
                    <div style={{ marginBottom: 28 }}>
                      <p style={{ fontSize: 11, letterSpacing: '0.25em', textTransform: 'uppercase', color: '#1C1C1C', marginBottom: 16 }}>Your Details</p>
                      <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
                        <FloatingInput id="s-name" name="senderFirstName" label="First Name" error={state.errors?.senderFirstName} required />
                        <FloatingInput id="s-email" name="senderEmail" label="Email Address" type="email" error={state.errors?.senderEmail} required />
                      </div>
                    </div>

                    {state.status === 'error' && !state.errors && (
                      <p role="alert" style={{ color: '#C0392B', fontSize: 12, marginBottom: 16 }}>{state.message}</p>
                    )}

                    <SubmitButton
                      style={{
                        width: '100%',
                        padding: '16px',
                        backgroundColor: '#1C1C1C',
                        color: '#FDFDFD',
                        fontSize: 12,
                        letterSpacing: '0.18em',
                        textTransform: 'uppercase',
                        fontFamily: 'var(--font-sans)',
                        border: 'none',
                        borderRadius: 2,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        gap: 8,
                      }}
                    >
                      <Send size={14} strokeWidth={1.5} />
                      Send Hint
                    </SubmitButton>
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
                  <h3 style={{ fontFamily: "var(--font-sans)", fontSize: 26, color: '#1C1C1C' }}>Hint Sent!</h3>
                  <p style={{ fontSize: 13, color: '#6B6B6B', lineHeight: 1.7, maxWidth: 280 }}>
                    We&apos;ve sent a beautiful hint to <strong style={{ color: '#1C1C1C', fontWeight: 400 }}>{recipientName || 'them'}</strong>. Fingers crossed they take the hint! 🌹
                  </p>
                  <button
                    onClick={onClose}
                    style={{ marginTop: 8, padding: '10px 28px', border: '1px solid #E5E2DB', borderRadius: 9999, fontSize: 11, letterSpacing: '0.15em', textTransform: 'uppercase', color: '#1C1C1C', backgroundColor: 'transparent', cursor: 'pointer' }}
                  >
                    Close
                  </button>
                </motion.div>
              )}
            </div>
          </motion.div>
      )}
    </AnimatePresence>
  );
}
