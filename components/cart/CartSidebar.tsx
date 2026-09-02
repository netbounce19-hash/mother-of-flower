'use client';

import React, { useActionState, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import { X, Minus, Plus, Trash2, ShoppingBag, Check } from 'lucide-react';
import { useCart } from '@/contexts/CartContext';
import { submitOrder } from '@/app/actions/submissions';
import { initialFormState } from '@/lib/form-state';
import { DELIVERY_FEE, TAX_RATE } from '@/lib/pricing';
import { DELIVERY_WINDOWS, formatShopDate } from '@/lib/delivery';
import { FieldError, Honeypot, SubmitButton } from '@/components/forms/FormBits';
import { formatUsPhone } from '@/components/forms/PhoneField';
import { useOverlay } from '@/hooks/useOverlay';
import SquareCardField, { CardHandle } from '@/components/cart/SquareCardField';

// Public Square identifiers. Safe in the browser by design — the access token
// that can actually move money stays on the server.
const SQUARE_APP_ID = process.env.NEXT_PUBLIC_SQUARE_APPLICATION_ID;
const SQUARE_LOCATION_ID = process.env.NEXT_PUBLIC_SQUARE_LOCATION_ID;
const SQUARE_ENV =
  process.env.NEXT_PUBLIC_SQUARE_ENVIRONMENT === 'production' ? 'production' : 'sandbox';
/** With no keys the checkout falls back to the phone-confirmation flow. */
const paymentsEnabled = Boolean(SQUARE_APP_ID && SQUARE_LOCATION_ID);

interface FieldProps {
  id: string;
  name: string;
  label: string;
  type?: string;
  required?: boolean;
  isTextArea?: boolean;
  error?: string[];
  autoComplete?: string;
  defaultValue?: string;
}

/** Uncontrolled — values are read from FormData when the order is submitted. */
function FloatingInput({ id, name, label, type = 'text', required, isTextArea, error, autoComplete, defaultValue }: FieldProps) {
  const [focused, setFocused] = useState(false);
  const isPhone = type === 'tel';
  // Phone fields are controlled so the mask can be applied as you type.
  const [phone, setPhone] = useState(isPhone ? formatUsPhone(defaultValue ?? '') : '');
  const [hasValue, setHasValue] = useState(Boolean(defaultValue));
  const lifted = focused || hasValue;

  return (
    <div style={{ position: 'relative', paddingTop: 20 }}>
      <label
        htmlFor={id}
        style={{
          position: 'absolute',
          left: 0,
          top: lifted ? 0 : 20,
          fontSize: lifted ? 12 : 14,
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
      {isTextArea ? (
        <textarea
          id={id}
          name={name}
          required={required}
          defaultValue={defaultValue}
          maxLength={1000}
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
          onChange={(e) => setHasValue(e.target.value.length > 0)}
          rows={2}
          style={{
            width: '100%', backgroundColor: 'transparent', border: 'none',
            borderBottom: `1px solid ${focused ? '#1C1C1C' : '#E5E2DB'}`,
            outline: 'none', padding: '8px 0', fontSize: 14, color: '#1C1C1C',
            transition: 'border-color 0.2s', fontFamily: 'var(--font-sans)', resize: 'none'
          }}
        />
      ) : (
        <input
          id={id}
          name={name}
          type={type}
          required={required}
          autoComplete={autoComplete}
          inputMode={isPhone ? 'tel' : undefined}
          placeholder={isPhone ? '+1 (725) 224-2454' : undefined}
          {...(isPhone
            ? { value: phone }
            : { defaultValue })}
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
          onChange={(e) => {
            if (isPhone) setPhone(formatUsPhone(e.target.value));
            setHasValue(e.target.value.length > 0);
          }}
          style={{
            width: '100%', backgroundColor: 'transparent', border: 'none',
            borderBottom: `1px solid ${focused ? '#1C1C1C' : '#E5E2DB'}`,
            outline: 'none', padding: '8px 0', fontSize: 14, color: '#1C1C1C',
            transition: 'border-color 0.2s', fontFamily: 'var(--font-sans)'
          }}
        />
      )}
      <FieldError messages={error} />
    </div>
  );
}

export default function CartSidebar() {
  const { isCartOpen, setIsCartOpen, items, updateQuantity, removeFromCart, cartTotal, clearCart } = useCart();
  const [shippingMethod, setShippingMethod] = useState<'delivery' | 'pickup'>('delivery');
  const [sameAsRecipient, setSameAsRecipient] = useState(false);
  const [state, formAction] = useActionState(submitOrder, initialFormState);

  // Square's card field hands back a tokenizer once its iframes are ready.
  const cardRef = useRef<CardHandle | null>(null);
  const formRef = useRef<HTMLFormElement>(null);
  const tokenisedRef = useRef(false);
  const [tokenising, setTokenising] = useState(false);
  const [cardError, setCardError] = useState('');
  // Filled in at tokenisation, not at render: a value generated during SSR
  // would not match the one the browser generates on hydration.
  const [idempotencyKey, setIdempotencyKey] = useState('');
  const [paymentToken, setPaymentToken] = useState('');
  const [verificationToken, setVerificationToken] = useState('');

  const shippingCost = shippingMethod === 'delivery' ? DELIVERY_FEE : 0;
  const taxes = cartTotal * TAX_RATE;
  const total = cartTotal + shippingCost + taxes;

  // These figures are an estimate for display only; the server re-prices the
  // order from product data before it is recorded.
  const orderItems = items.map((item) => ({
    productId: item.product.id,
    name: item.product.name,
    size: item.size,
    boxColor: item.boxColor,
    quantity: item.quantity,
    unitPrice: item.unitPrice,
    deliveryDate: item.deliveryDate,
    deliveryWindow: item.deliveryWindow,
  }));

  const placed = state.status === 'success';

  // Emptying the bag on close (rather than in an effect the moment the order
  // lands) keeps the confirmation screen readable while the order is still
  // on screen.
  const handleClose = () => {
    if (placed) clearCart();
    setIsCartOpen(false);
  };

  const panelRef = useOverlay<HTMLDivElement>(isCartOpen, handleClose);

  /**
   * Turns the card into a one-use token before the form posts. The token, not
   * the card, is what reaches the server — and the amount is recomputed there,
   * so nothing about the price is trusted from here.
   */
  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    if (!paymentsEnabled) return; // no card step; let the form post as-is

    // Second pass: the token is in the hidden inputs, so let this one through
    // to the Server Action instead of tokenising again.
    if (tokenisedRef.current) {
      tokenisedRef.current = false;
      return;
    }

    event.preventDefault();
    if (!event.currentTarget.reportValidity()) return;

    if (!cardRef.current) {
      setCardError('The card form is still loading. Please try again in a moment.');
      return;
    }

    setCardError('');
    setTokenising(true);
    try {
      const { token, verificationToken: verification } = await cardRef.current.tokenize();
      setPaymentToken(token);
      setVerificationToken(verification ?? '');
      // Each tokenisation is a distinct attempt; a fresh key keeps a genuine
      // retry after a decline from colliding with the failed charge.
      setIdempotencyKey(crypto.randomUUID());
      tokenisedRef.current = true;
      // Let React commit the hidden inputs before the action reads FormData.
      requestAnimationFrame(() => formRef.current?.requestSubmit());
    } catch (error) {
      setCardError(error instanceof Error ? error.message : 'Please check the card details.');
    } finally {
      setTokenising(false);
    }
  };

  return (
    <AnimatePresence>
      {isCartOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            onClick={() => setIsCartOpen(false)}
            className="fixed inset-0 bg-[#1C1C1C]/40 backdrop-blur-sm z-[100]"
          />

        )}

        {isCartOpen && (
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
            ref={panelRef}
            role="dialog"
            aria-modal="true"
            aria-label="Your bag"
            tabIndex={-1}
            className="fixed top-0 right-0 bottom-0 w-full md:w-[480px] z-[110] shadow-2xl flex flex-col"
            style={{ backgroundColor: '#FDFDFD' }}
          >
            {/* Header */}
            <div className="flex items-center justify-between border-b border-[#E5E2DB]" style={{ padding: '24px 32px', backgroundColor: '#FDFDFD' }}>
              <h2 className="font-serif text-[28px] leading-none" style={{ color: '#1C1C1C' }}>Your Bag</h2>
              <button
                onClick={handleClose}
                aria-label="Close bag"
                className="w-10 h-10 rounded-full hover:opacity-70 transition-opacity flex items-center justify-center"
                style={{ backgroundColor: '#F7F5F2' }}
              >
                <X size={16} strokeWidth={1.5} color="#1C1C1C" />
              </button>
            </div>

            {placed ? (
              <div className="flex-1 flex flex-col items-center justify-center text-center gap-4" style={{ padding: '32px' }} role="status">
                <div className="w-14 h-14 rounded-full flex items-center justify-center text-[24px]" style={{ backgroundColor: '#F7F5F2' }}>🌸</div>
                <h3 className="font-serif text-[26px]" style={{ color: '#1C1C1C' }}>Order received</h3>
                <p className="text-[13px] leading-relaxed max-w-[280px]" style={{ color: '#6B6B6B' }}>
                  Thank you. Our manager will call you shortly to confirm availability
                  and arrange payment.
                </p>
                <button
                  onClick={handleClose}
                  className="mt-4 border-b pb-1 text-[12px] tracking-[0.15em] uppercase hover:opacity-50 transition-opacity"
                  style={{ borderColor: '#1C1C1C', color: '#1C1C1C' }}
                >
                  Continue Shopping
                </button>
              </div>
            ) : (
            <form
              ref={formRef}
              action={formAction}
              onSubmit={handleSubmit}
              className="flex-1 flex flex-col min-h-0"
            >
            <input type="hidden" name="items" value={JSON.stringify(orderItems)} />
            <input type="hidden" name="shippingMethod" value={shippingMethod} />
            <input type="hidden" name="paymentToken" value={paymentToken} />
            <input type="hidden" name="verificationToken" value={verificationToken} />
            <input type="hidden" name="idempotencyKey" value={idempotencyKey} />
            <Honeypot />

            {/* Content (Scrollable) */}
            <div className="flex-1 overflow-y-auto" style={{ padding: '32px' }}>
              {items.length === 0 ? (
                <div className="flex flex-col items-center justify-center h-full gap-4" style={{ color: '#6B6B6B' }}>
                  <ShoppingBag size={48} strokeWidth={1} />
                  <p className="font-sans text-[12px] uppercase tracking-[0.2em]">Your bag is empty</p>
                  <button
                    type="button"
                    onClick={handleClose}
                    className="mt-4 border-b pb-1 text-[12px] tracking-[0.15em] uppercase hover:opacity-50 transition-opacity"
                    style={{ borderColor: '#1C1C1C', color: '#1C1C1C' }}
                  >
                    Continue Shopping
                  </button>
                </div>
              ) : (
                <div className="flex flex-col gap-10">
                  {/* Items List */}
                  <div className="flex flex-col gap-8">
                    {items.map((item) => (
                      <div key={item.id} className="flex gap-6">
                        <div className="relative w-24 h-32 rounded-sm overflow-hidden flex-shrink-0" style={{ backgroundColor: '#F7F5F2' }}>
                          <Image src={item.product.images[0]} alt={item.product.name} fill sizes="96px" className="object-cover" />
                        </div>
                        <div className="flex-1 flex flex-col py-1">
                          <div className="flex justify-between items-start gap-4 mb-2">
                            <h3 className="font-serif text-[20px] leading-tight" style={{ color: '#1C1C1C' }}>{item.product.name}</h3>
                            <p className="font-sans text-[14px] whitespace-nowrap mt-1" style={{ color: '#1C1C1C' }}>
                              ${(item.unitPrice * item.quantity).toLocaleString()}
                            </p>
                          </div>
                          <p className="text-[12px] mb-1" style={{ color: '#6B6B6B' }}>Size: {item.size}</p>
                          <p className="text-[12px] mb-1" style={{ color: '#6B6B6B' }}>Box: {item.boxColor}</p>
                          <p className="text-[12px]" style={{ color: '#6B6B6B' }}>
                            {shippingMethod === 'pickup' ? 'Pickup' : 'Delivery'}: {formatShopDate(item.deliveryDate)}
                            {shippingMethod === 'delivery' && item.deliveryWindow
                              ? `, ${DELIVERY_WINDOWS.find((w) => w.key === item.deliveryWindow)?.label ?? item.deliveryWindow}`
                              : ''}
                          </p>
                          
                          <div className="flex items-center justify-between mt-auto">
                            <div className="flex items-center border border-[#E5E2DB] rounded-full px-2 py-1">
                              <button
                                type="button"
                                aria-label="Decrease quantity"
                                onClick={() => updateQuantity(item.id, item.quantity - 1)}
                                className="p-1 hover:text-[#1C1C1C] transition-colors"
                                style={{ color: '#6B6B6B' }}
                              >
                                <Minus size={12} strokeWidth={1.5} />
                              </button>
                              <span className="px-3 text-[12px] min-w-[24px] text-center" style={{ color: '#1C1C1C' }}>
                                {item.quantity}
                              </span>
                              <button
                                type="button"
                                aria-label="Increase quantity"
                                onClick={() => updateQuantity(item.id, item.quantity + 1)}
                                className="p-1 hover:text-[#1C1C1C] transition-colors"
                                style={{ color: '#6B6B6B' }}
                              >
                                <Plus size={12} strokeWidth={1.5} />
                              </button>
                            </div>
                            <button
                              type="button"
                              onClick={() => removeFromCart(item.id)}
                              className="hover:text-[#E02424] transition-colors p-2"
                              style={{ color: '#6B6B6B' }}
                              aria-label="Remove item"
                            >
                              <Trash2 size={16} strokeWidth={1.5} />
                            </button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>

                  <div className="h-px w-full bg-[#E5E2DB]" />

                  {/* Shipping Method */}
                  <div className="flex flex-col gap-4">
                    <h3 className="font-sans text-[12px] tracking-[0.2em] uppercase" style={{ color: '#1C1C1C' }}>Delivery Method</h3>
                    <div className="flex gap-4">
                      {(['delivery', 'pickup'] as const).map((method) => (
                        <button
                          key={method}
                          type="button"
                          aria-pressed={shippingMethod === method}
                          onClick={() => setShippingMethod(method)}
                          className="flex-1 p-5 rounded-sm border transition-all duration-300 text-left relative overflow-hidden"
                          style={{
                            borderColor: shippingMethod === method ? '#1C1C1C' : '#E5E2DB',
                            backgroundColor: shippingMethod === method ? '#FDFDFD' : '#F7F5F2'
                          }}
                        >
                          {shippingMethod === method && (
                            <div className="absolute top-0 right-0 w-8 h-8 flex items-center justify-center" style={{ backgroundColor: '#1C1C1C', clipPath: 'polygon(100% 0, 0 0, 100% 100%)' }}>
                              <Check size={10} color="#FDFDFD" strokeWidth={3} className="absolute top-1.5 right-1.5" />
                            </div>
                          )}
                          <p className="font-serif text-[18px] mb-1 capitalize" style={{ color: '#1C1C1C' }}>{method}</p>
                          <p className="font-sans text-[12px]" style={{ color: '#6B6B6B' }}>{method === 'delivery' ? '$25.00' : 'Free'}</p>
                        </button>
                      ))}
                    </div>
                  </div>

                  <div className="h-px w-full bg-[#E5E2DB]" />

                  {/* Buyer's own details — this is who we call to confirm. */}
                  <div className="flex flex-col gap-6">
                    <h3 className="font-sans text-[12px] tracking-[0.2em] uppercase" style={{ color: '#1C1C1C' }}>Your Contact Details</h3>
                    <div className="flex flex-col gap-4">
                      <FloatingInput id="c-cust-name" name="customerName" defaultValue={state.values?.customerName} label="Your Name" autoComplete="name" error={state.errors?.customerName} required />
                      <FloatingInput id="c-cust-phone" name="customerPhone" defaultValue={state.values?.customerPhone} label="Your Phone Number" type="tel" autoComplete="tel" error={state.errors?.customerPhone} required />
                      <FloatingInput id="c-cust-email" name="customerEmail" defaultValue={state.values?.customerEmail} label="Your Email" type="email" autoComplete="email" error={state.errors?.customerEmail} required />
                    </div>

                    <label className="flex items-center gap-3 cursor-pointer w-fit">
                      <input
                        type="checkbox"
                        name="sameAsRecipient"
                        key={`same-${state.status}-${state.values?.sameAsRecipient ?? ''}`}
                        checked={sameAsRecipient}
                        onChange={(e) => setSameAsRecipient(e.target.checked)}
                        className="w-4 h-4 accent-[#1C1C1C]"
                      />
                      <span className="text-[13px]" style={{ color: '#333333' }}>
                        I am the recipient
                      </span>
                    </label>
                  </div>

                  <div className="h-px w-full bg-[#E5E2DB]" />

                  {/* Recipient Details */}
                  <div className="flex flex-col gap-6">
                    <h3 className="font-sans text-[12px] tracking-[0.2em] uppercase" style={{ color: '#1C1C1C' }}>
                      {sameAsRecipient ? 'Delivery Details' : 'Recipient Details'}
                    </h3>
                    <div className="flex flex-col gap-4">
                      {/*
                        When the buyer is the recipient we drop these two rather
                        than mirror them into disabled inputs: the server copies
                        the customer values across, so the two can never drift.
                      */}
                      {!sameAsRecipient && (
                        <>
                          <FloatingInput id="c-name" name="recipientName" defaultValue={state.values?.recipientName} label="Recipient Name" error={state.errors?.recipientName} required />
                          <FloatingInput id="c-phone" name="recipientPhone" defaultValue={state.values?.recipientPhone} label="Recipient Phone Number" type="tel" error={state.errors?.recipientPhone} required />
                        </>
                      )}
                      {shippingMethod === 'delivery' && (
                        <FloatingInput id="c-address" name="address" defaultValue={state.values?.address} label="Delivery Address (Las Vegas Area)" error={state.errors?.address} isTextArea required />
                      )}
                      <FloatingInput id="c-message" name="cardMessage" defaultValue={state.values?.cardMessage} label="Card Message (Optional)" isTextArea />
                    </div>
                  </div>

                  {paymentsEnabled && (
                    <div className="pt-6 border-t" style={{ borderColor: '#E5E2DB' }}>
                      <SquareCardField
                        applicationId={SQUARE_APP_ID!}
                        locationId={SQUARE_LOCATION_ID!}
                        environment={SQUARE_ENV}
                        amount={total}
                        onReady={(handle) => { cardRef.current = handle; }}
                      />
                    </div>
                  )}
                </div>
              )}
            </div>

            {/* Footer / Checkout */}
            {items.length > 0 && (
              <div className="border-t border-[#E5E2DB] pb-safe" style={{ backgroundColor: '#F7F5F2', padding: '24px 32px 32px' }}>
                <div className="flex justify-between mb-2">
                  <span className="text-[13px]" style={{ color: '#6B6B6B' }}>Subtotal</span>
                  <span className="text-[13px]" style={{ color: '#1C1C1C' }}>${cartTotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between mb-2">
                  <span className="text-[13px]" style={{ color: '#6B6B6B' }}>Shipping</span>
                  <span className="text-[13px]" style={{ color: '#1C1C1C' }}>${shippingCost.toFixed(2)}</span>
                </div>
                <div className="flex justify-between mb-5">
                  <span className="text-[13px]" style={{ color: '#6B6B6B' }}>Taxes (est)</span>
                  <span className="text-[13px]" style={{ color: '#1C1C1C' }}>${taxes.toFixed(2)}</span>
                </div>
                <div className="flex justify-between mb-6">
                  <span className="font-serif text-[24px]" style={{ color: '#1C1C1C' }}>Total</span>
                  <span className="font-serif text-[24px]" style={{ color: '#1C1C1C' }}>${total.toFixed(2)}</span>
                </div>

                {(state.status === 'error' || cardError) && (
                  <p role="alert" className="text-[#C0392B] text-[12px] mb-3">
                    {cardError || state.message}
                  </p>
                )}

                <SubmitButton
                  pendingLabel={tokenising ? 'Checking card…' : 'Taking payment…'}
                  style={{ backgroundColor: '#1C1C1C', color: '#FDFDFD' }}
                  className="w-full py-4 uppercase tracking-[0.18em] text-[12px] hover:opacity-80 transition-opacity rounded-sm border-none flex items-center justify-center font-sans"
                >
                  {paymentsEnabled ? `Pay $${total.toFixed(2)}` : 'Place Order'}
                </SubmitButton>

                <p className="text-[12px] mt-3 leading-relaxed text-center" style={{ color: '#6B6B6B' }}>
                  {paymentsEnabled
                    ? 'Your card is charged when you place the order. We call to confirm the delivery slot, and refund in full if we cannot fulfil it.'
                    : 'No payment is taken on this site. We confirm availability by phone, then agree the payment method with you.'}
                </p>
              </div>
            )}
            </form>
            )}
          </motion.div>
      )}
    </AnimatePresence>
  );
}
