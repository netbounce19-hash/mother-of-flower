import { ImageResponse } from 'next/og';

export const size = { width: 64, height: 64 };
export const contentType = 'image/png';

export default function Icon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          background: '#1C1C1C',
          color: '#FDFDFD',
          fontSize: 38,
          fontFamily: 'serif',
          letterSpacing: '-0.02em',
        }}
      >
        M
      </div>
    ),
    size
  );
}
