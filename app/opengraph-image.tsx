import { ImageResponse } from 'next/og';
import { site } from '@/lib/site';

export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';
export const alt = `${site.name} — Luxury Floral Artistry, Las Vegas`;

export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          background: '#FDFDFD',
          color: '#1C1C1C',
        }}
      >
        <div
          style={{
            fontSize: 22,
            letterSpacing: '0.35em',
            textTransform: 'uppercase',
            color: '#C9A96E',
            marginBottom: 32,
          }}
        >
          Las Vegas
        </div>
        <div style={{ fontSize: 92, fontFamily: 'serif', letterSpacing: '-0.01em' }}>
          {site.name}
        </div>
        <div
          style={{
            width: 80,
            height: 2,
            background: '#C9A96E',
            margin: '40px 0',
          }}
        />
        <div style={{ fontSize: 28, color: '#8A8A8A' }}>
          Luxury Floral Artistry
        </div>
      </div>
    ),
    size
  );
}
