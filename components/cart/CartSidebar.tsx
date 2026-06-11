'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Minus, Plus, Trash2, ShoppingBag, Check } from 'lucide-react';
import { useCart } from '@/contexts/CartContext';

interface FieldProps {
  id: string;
  label: string;
  type?: string;
  value: string;
  onChange: (v: string) => void;
  required?: boolean;
  isTextArea?: boolean;
}

function FloatingInput({ id, label, type = 'text', value, onChange, required, isTextArea }: FieldProps) {
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
      {isTextArea ? (
        <textarea
          id={id}
          value={value}
          required={required}
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
          onChange={(e) => onChange(e.target.value)}
          rows={2}
          style={{
            width: '100%', backgroundColor: 'transparent', border: 'none',
            borderBottom: `1px solid ${focused ? '#1C1C1C' : '#E5E5E5'}`,
            outline: 'none', padding: '8px 0', fontSize: 14, color: '#1C1C1C',
            transition: 'border-color 0.2s', fontFamily: 'Inter, sans-serif', resize: 'none'
          }}
        />
      ) : (
        <input
          id={id}
          type={type}
          value={value}
          required={required}
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
          onChange={(e) => onChange(e.target.value)}
          style={{
            width: '100%', backgroundColor: 'transparent', border: 'none',
            borderBottom: `1px solid ${focused ? '#1C1C1C' : '#E5E5E5'}`,
            outline: 'none', padding: '8px 0', fontSize: 14, color: '#1C1C1C',
            transition: 'border-color 0.2s', fontFamily: 'Inter, sans-serif'
          }}
        />
      )}
    </div>
  );
}

export default function CartSidebar() {
  const { isCartOpen, setIsCartOpen, items, updateQuantity, removeFromCart, cartTotal } = useCart();
  const [shippingMethod, setShippingMethod] = useState<'delivery' | 'pickup'>('delivery');
  const [recipientName, setRecipientName] = useState('');
  const [recipientPhone, setRecipientPhone] = useState('');
  const [address, setAddress] = useState('');
  const [message, setMessage] = useState('');

  const shippingCost = shippingMethod === 'delivery' ? 25 : 0;
  const taxes = cartTotal * 0.08375; // Vegas tax rate approx
  const total = cartTotal + shippingCost + taxes;

  const handleCheckout = () => {
    alert(`Checkout Flow Initiated!\n\nTotal: $${total.toFixed(2)}\nItems: ${items.length}\nShipping: ${shippingMethod}`);
  };

  return (
    <AnimatePresence>
      {isCartOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            onClick={() => setIsCartOpen(false)}
            className="fixed inset-0 bg-[#1C1C1C]/40 backdrop-blur-sm z-[100]"
          />

          {/* Sidebar */}
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
            className="fixed top-0 right-0 bottom-0 w-full md:w-[480px] z-[110] shadow-2xl flex flex-col"
            style={{ backgroundColor: '#FDFDFD' }}
          >
            {/* Header */}
            <div className="flex items-center justify-between border-b border-[#E5E5E5]" style={{ padding: '24px 32px', backgroundColor: '#FDFDFD' }}>
              <h2 className="font-serif text-[28px] leading-none" style={{ color: '#1C1C1C' }}>Your Bag</h2>
              <button
                onClick={() => setIsCartOpen(false)}
                className="w-10 h-10 rounded-full hover:opacity-70 transition-opacity flex items-center justify-center"
                style={{ backgroundColor: '#F7F5F2' }}
              >
                <X size={16} strokeWidth={1.5} color="#1C1C1C" />
              </button>
            </div>

            {/* Content (Scrollable) */}
            <div className="flex-1 overflow-y-auto" style={{ padding: '32px' }}>
              {items.length === 0 ? (
                <div className="flex flex-col items-center justify-center h-full gap-4" style={{ color: '#8A8A8A' }}>
                  <ShoppingBag size={48} strokeWidth={1} />
                  <p className="font-sans text-[12px] uppercase tracking-[0.2em]">Your bag is empty</p>
                  <button 
                    onClick={() => setIsCartOpen(false)}
                    className="mt-4 border-b pb-1 text-[11px] tracking-[0.15em] uppercase hover:opacity-50 transition-opacity"
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
                        <div className="w-24 h-32 rounded-sm overflow-hidden flex-shrink-0" style={{ backgroundColor: '#F7F5F2' }}>
                          <img src={item.product.images[0]} alt={item.product.name} className="w-full h-full object-cover" />
                        </div>
                        <div className="flex-1 flex flex-col py-1">
                          <div className="flex justify-between items-start gap-4 mb-2">
                            <h3 className="font-serif text-[20px] leading-tight" style={{ color: '#1C1C1C' }}>{item.product.name}</h3>
                            <p className="font-sans text-[14px] whitespace-nowrap mt-1" style={{ color: '#1C1C1C' }}>
                              ${(item.product.price * item.quantity).toLocaleString()}
                            </p>
                          </div>
                          <p className="text-[12px] mb-1" style={{ color: '#8A8A8A' }}>Size: {item.size}</p>
                          <p className="text-[12px] mb-1" style={{ color: '#8A8A8A' }}>Box: {item.boxColor}</p>
                          <p className="text-[12px]" style={{ color: '#8A8A8A' }}>Delivery: {item.date === 'tomorrow' ? 'Tomorrow' : 'Scheduled'}</p>
                          
                          <div className="flex items-center justify-between mt-auto">
                            <div className="flex items-center border border-[#E5E5E5] rounded-full px-2 py-1">
                              <button 
                                onClick={() => updateQuantity(item.id, item.quantity - 1)}
                                className="p-1 hover:text-[#1C1C1C] transition-colors"
                                style={{ color: '#8A8A8A' }}
                              >
                                <Minus size={12} strokeWidth={1.5} />
                              </button>
                              <span className="px-3 text-[12px] min-w-[24px] text-center" style={{ color: '#1C1C1C' }}>
                                {item.quantity}
                              </span>
                              <button 
                                onClick={() => updateQuantity(item.id, item.quantity + 1)}
                                className="p-1 hover:text-[#1C1C1C] transition-colors"
                                style={{ color: '#8A8A8A' }}
                              >
                                <Plus size={12} strokeWidth={1.5} />
                              </button>
                            </div>
                            <button 
                              onClick={() => removeFromCart(item.id)}
                              className="hover:text-[#E02424] transition-colors p-2"
                              style={{ color: '#8A8A8A' }}
                              aria-label="Remove item"
                            >
                              <Trash2 size={16} strokeWidth={1.5} />
                            </button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>

                  <div className="h-px w-full bg-[#E5E5E5]" />

                  {/* Shipping Method */}
                  <div className="flex flex-col gap-4">
                    <h3 className="font-sans text-[11px] tracking-[0.2em] uppercase" style={{ color: '#1C1C1C' }}>Delivery Method</h3>
                    <div className="flex gap-4">
                      {(['delivery', 'pickup'] as const).map((method) => (
                        <button
                          key={method}
                          onClick={() => setShippingMethod(method)}
                          className={`flex-1 p-5 rounded-sm border transition-all duration-300 text-left relative overflow-hidden`}
                          style={{
                            borderColor: shippingMethod === method ? '#1C1C1C' : '#E5E5E5',
                            backgroundColor: shippingMethod === method ? '#FDFDFD' : '#F7F5F2'
                          }}
                        >
                          {shippingMethod === method && (
                            <div className="absolute top-0 right-0 w-8 h-8 flex items-center justify-center" style={{ backgroundColor: '#1C1C1C', clipPath: 'polygon(100% 0, 0 0, 100% 100%)' }}>
                              <Check size={10} color="#FDFDFD" strokeWidth={3} className="absolute top-1.5 right-1.5" />
                            </div>
                          )}
                          <p className="font-serif text-[18px] mb-1 capitalize" style={{ color: '#1C1C1C' }}>{method}</p>
                          <p className="font-sans text-[12px]" style={{ color: '#8A8A8A' }}>{method === 'delivery' ? '$25.00' : 'Free'}</p>
                        </button>
                      ))}
                    </div>
                  </div>

                  <div className="h-px w-full bg-[#E5E5E5]" />

                  {/* Recipient Details */}
                  <div className="flex flex-col gap-6">
                    <h3 className="font-sans text-[11px] tracking-[0.2em] uppercase" style={{ color: '#1C1C1C' }}>Recipient Details</h3>
                    <div className="flex flex-col gap-4">
                      <FloatingInput id="c-name" label="Recipient Name" value={recipientName} onChange={setRecipientName} required />
                      <FloatingInput id="c-phone" label="Recipient Phone Number" type="tel" value={recipientPhone} onChange={setRecipientPhone} required />
                      {shippingMethod === 'delivery' && (
                        <FloatingInput id="c-address" label="Delivery Address (Las Vegas Area)" value={address} onChange={setAddress} isTextArea required />
                      )}
                      <FloatingInput id="c-message" label="Card Message (Optional)" value={message} onChange={setMessage} isTextArea />
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Footer / Checkout */}
            {items.length > 0 && (
              <div className="border-t border-[#E5E5E5] pb-safe" style={{ backgroundColor: '#F7F5F2', padding: '24px 32px 32px' }}>
                <div className="flex justify-between mb-2">
                  <span className="text-[13px]" style={{ color: '#8A8A8A' }}>Subtotal</span>
                  <span className="text-[13px]" style={{ color: '#1C1C1C' }}>${cartTotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between mb-2">
                  <span className="text-[13px]" style={{ color: '#8A8A8A' }}>Shipping</span>
                  <span className="text-[13px]" style={{ color: '#1C1C1C' }}>${shippingCost.toFixed(2)}</span>
                </div>
                <div className="flex justify-between mb-5">
                  <span className="text-[13px]" style={{ color: '#8A8A8A' }}>Taxes (est)</span>
                  <span className="text-[13px]" style={{ color: '#1C1C1C' }}>${taxes.toFixed(2)}</span>
                </div>
                <div className="flex justify-between mb-6">
                  <span className="font-serif text-[24px]" style={{ color: '#1C1C1C' }}>Total</span>
                  <span className="font-serif text-[24px]" style={{ color: '#1C1C1C' }}>${total.toFixed(2)}</span>
                </div>

                <button
                  onClick={handleCheckout}
                  style={{ backgroundColor: '#1C1C1C', color: '#FDFDFD' }}
                  className="w-full py-4 uppercase tracking-[0.18em] text-[12px] hover:opacity-80 transition-opacity rounded-sm border-none flex items-center justify-center cursor-pointer font-sans"
                >
                  Checkout
                </button>
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
