'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ShoppingBag, X, Menu, Phone } from 'lucide-react';

const navLinks = [
  { label: 'Collections', href: '#catalog' },
  { label: 'About', href: '#about' },
  { label: 'Occasions', href: '#occasions' },
  { label: 'Contact', href: '#contact' },
];

const CONTAINER: React.CSSProperties = {
  maxWidth: 1280,
  margin: '0 auto',
  paddingLeft: 'clamp(20px, 5vw, 72px)',
  paddingRight: 'clamp(20px, 5vw, 72px)',
  height: '100%',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
};

export default function Navbar({ cartCount = 0 }: { cartCount?: number }) {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <>
      <motion.header
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] as [number,number,number,number] }}
        style={{
          position: 'fixed',
          top: 0, left: 0, right: 0,
          zIndex: 50,
          height: 72,
          transition: 'background-color 0.4s, border-color 0.4s, backdrop-filter 0.4s',
          backgroundColor: scrolled ? 'rgba(253,253,253,0.92)' : 'transparent',
          borderBottom: scrolled ? '1px solid #E5E5E5' : '1px solid transparent',
          backdropFilter: scrolled ? 'blur(12px)' : 'none',
        }}
      >
        <nav style={CONTAINER}>
          {/* Logo */}
          <a href="/" style={{ display: 'flex', flexDirection: 'column', lineHeight: 1, textDecoration: 'none', flexShrink: 0 }}>
            <span style={{ fontFamily: "'Cormorant Garamond', Georgia, serif", fontSize: 18, letterSpacing: '0.12em', color: '#1C1C1C' }}>
              MOTHER
            </span>
            <span style={{ fontFamily: "'Cormorant Garamond', Georgia, serif", fontSize: 10, letterSpacing: '0.4em', color: '#8A8A8A', textTransform: 'uppercase', marginTop: -2 }}>
              of flower
            </span>
          </a>

          {/* Desktop Nav */}
          <ul style={{ display: 'flex', alignItems: 'center', gap: 40, listStyle: 'none', margin: 0, padding: 0 }}>
            {navLinks.map((link) => (
              <li key={link.label}>
                <a
                  href={link.href}
                  style={{ fontSize: 12, letterSpacing: '0.12em', textTransform: 'uppercase', color: '#8A8A8A', textDecoration: 'none', transition: 'color 0.3s' }}
                  onMouseEnter={e => (e.currentTarget.style.color = '#1C1C1C')}
                  onMouseLeave={e => (e.currentTarget.style.color = '#8A8A8A')}
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>

          {/* Right actions */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
            {/* Order a Call */}
            <a
              href="tel:+17252242454"
              style={{
                display: 'inline-flex', alignItems: 'center', gap: 6,
                padding: '8px 16px',
                borderRadius: 9999,
                border: '1px solid #E5E5E5',
                fontSize: 11, letterSpacing: '0.12em', textTransform: 'uppercase',
                color: '#1C1C1C', textDecoration: 'none',
                transition: 'all 0.25s',
              }}
              onMouseEnter={e => {
                e.currentTarget.style.backgroundColor = '#1C1C1C';
                e.currentTarget.style.color = '#FDFDFD';
                e.currentTarget.style.borderColor = '#1C1C1C';
              }}
              onMouseLeave={e => {
                e.currentTarget.style.backgroundColor = 'transparent';
                e.currentTarget.style.color = '#1C1C1C';
                e.currentTarget.style.borderColor = '#E5E5E5';
              }}
            >
              <Phone size={12} strokeWidth={1.5} />
              Order a Call
            </a>

            <button
              aria-label="Shopping bag"
              style={{ position: 'relative', padding: 8, color: '#1C1C1C', background: 'none', border: 'none', cursor: 'pointer' }}
            >
              <ShoppingBag size={20} strokeWidth={1.5} />
              {cartCount > 0 && (
                <span style={{ position: 'absolute', top: 4, right: 4, width: 16, height: 16, borderRadius: '50%', backgroundColor: '#1C1C1C', color: '#FDFDFD', fontSize: 9, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  {cartCount}
                </span>
              )}
            </button>

            {/* Mobile hamburger */}
            <button
              aria-label="Open menu"
              style={{ padding: 8, color: '#1C1C1C', background: 'none', border: 'none', cursor: 'pointer', display: 'none' }}
              className="mobile-menu-btn"
              onClick={() => setMenuOpen(true)}
            >
              <Menu size={20} strokeWidth={1.5} />
            </button>
          </div>
        </nav>
      </motion.header>

      {/* Mobile full-screen menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            key="mobile-menu"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            style={{ position: 'fixed', inset: 0, zIndex: 60, backgroundColor: '#FDFDFD', display: 'flex', flexDirection: 'column' }}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '0 24px', height: 64 }}>
              <span style={{ fontFamily: "'Cormorant Garamond', Georgia, serif", fontSize: 18, letterSpacing: '0.12em', color: '#1C1C1C' }}>MOTHER</span>
              <button aria-label="Close menu" onClick={() => setMenuOpen(false)} style={{ padding: 8, background: 'none', border: 'none', cursor: 'pointer', color: '#1C1C1C' }}>
                <X size={22} strokeWidth={1.5} />
              </button>
            </div>

            <nav style={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center', padding: '0 40px', gap: 32 }}>
              {navLinks.map((link, i) => (
                <motion.a
                  key={link.label}
                  href={link.href}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.08, duration: 0.4 }}
                  style={{ fontFamily: "'Cormorant Garamond', Georgia, serif", fontSize: 40, color: '#1C1C1C', textDecoration: 'none' }}
                  onClick={() => setMenuOpen(false)}
                >
                  {link.label}
                </motion.a>
              ))}
              <motion.a
                href="tel:+17252242454"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: navLinks.length * 0.08, duration: 0.4 }}
                style={{ display: 'inline-flex', alignItems: 'center', gap: 10, fontSize: 13, letterSpacing: '0.15em', textTransform: 'uppercase', color: '#8A8A8A', textDecoration: 'none' }}
                onClick={() => setMenuOpen(false)}
              >
                <Phone size={16} strokeWidth={1.5} />
                Order a Call
              </motion.a>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
