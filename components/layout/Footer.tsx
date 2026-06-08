'use client';

const CONTAINER: React.CSSProperties = {

  maxWidth: 1280,
  margin: '0 auto',
  paddingLeft: 'clamp(20px, 5vw, 72px)',
  paddingRight: 'clamp(20px, 5vw, 72px)',
};

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer style={{ borderTop: '1px solid #E5E5E5', marginTop: 80, width: '100%' }}>
      <div style={{ ...CONTAINER, paddingTop: 72, paddingBottom: 72, display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 48 }}>
        {/* Brand */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
          <div style={{ lineHeight: 1 }}>
            <p style={{ fontFamily: "'Cormorant Garamond', Georgia, serif", fontSize: 20, letterSpacing: '0.14em', color: '#1C1C1C' }}>MOTHER</p>
            <p style={{ fontSize: 10, letterSpacing: '0.4em', color: '#8A8A8A', textTransform: 'uppercase', marginTop: -2 }}>of flower</p>
          </div>
          <p style={{ fontSize: 13, color: '#8A8A8A', lineHeight: 1.7, maxWidth: 280 }}>
            Luxury floral artistry, curated for extraordinary moments. Delivered across Las Vegas and the US.
          </p>
        </div>

        {/* Links */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 12, alignItems: 'center' }}>
          <p style={{ fontSize: 11, letterSpacing: '0.2em', textTransform: 'uppercase', color: '#8A8A8A', marginBottom: 8 }}>Explore</p>
          {['Collections', 'Occasions', 'About Us', 'FAQ', 'Care Guide'].map((item) => (
            <a key={item} href="#" style={{ fontSize: 13, color: '#8A8A8A', textDecoration: 'none', transition: 'color 0.3s' }}
              onMouseEnter={e => (e.currentTarget.style.color = '#1C1C1C')}
              onMouseLeave={e => (e.currentTarget.style.color = '#8A8A8A')}
            >{item}</a>
          ))}
        </div>

        {/* Contact */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 12, alignItems: 'flex-end' }}>
          <p style={{ fontSize: 11, letterSpacing: '0.2em', textTransform: 'uppercase', color: '#8A8A8A', marginBottom: 8 }}>Get in Touch</p>
          <a href="mailto:info@motherofflower.com" style={{ fontSize: 13, color: '#8A8A8A', textDecoration: 'none' }}>info@motherofflower.com</a>
          <a href="tel:+17252242454" style={{ fontSize: 13, color: '#8A8A8A', textDecoration: 'none' }}>+1 (725) 224-2454</a>
          <p style={{ fontSize: 13, color: '#8A8A8A' }}>Las Vegas, Nevada, USA</p>
          <div style={{ display: 'flex', gap: 16, marginTop: 8 }}>
            {['Instagram', 'Pinterest', 'TikTok'].map((s) => (
              <a key={s} href="#" style={{ fontSize: 11, letterSpacing: '0.1em', textTransform: 'uppercase', color: '#8A8A8A', textDecoration: 'none' }}
                onMouseEnter={e => (e.currentTarget.style.color = '#1C1C1C')}
                onMouseLeave={e => (e.currentTarget.style.color = '#8A8A8A')}
              >{s}</a>
            ))}
          </div>
        </div>
      </div>

      <div style={{ borderTop: '1px solid #E5E5E5' }}>
        <div style={{ ...CONTAINER, paddingTop: 20, paddingBottom: 20, display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: 8 }}>
          <p style={{ fontSize: 11, color: '#8A8A8A', letterSpacing: '0.05em' }}>© {year} MotherOfFlower. All rights reserved.</p>
          <div style={{ display: 'flex', gap: 24 }}>
            {['Privacy Policy', 'Terms', 'Shipping & Returns'].map((item) => (
              <a key={item} href="#" style={{ fontSize: 11, color: '#8A8A8A', textDecoration: 'none' }}>{item}</a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
