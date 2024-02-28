import type { FC } from 'react';

import { OG_FONT } from '@/constants/opengraph';

interface OgImageProps {
  logoSrc: string | ArrayBuffer;
  title: string;
}

const OgImage: FC<OgImageProps> = ({ logoSrc, title }) => {
  return (
    <div
      style={{
        fontFamily: `${OG_FONT}, sans-serif`,
        display: 'flex',
        position: 'relative',
        height: '100%',
        width: '100%',
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'column',
        backgroundImage: 'linear-gradient(to bottom, #dbf4ff, #fff1f1)',
        textAlign: 'center',
        gap: '4rem',
      }}
    >
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        style={{ position: 'absolute', top: '7rem' }}
        width={128}
        height={128}
        // @ts-expect-error ArrayBuffer available in ImageResponse in next/og
        src={logoSrc}
        alt=''
      />
      <span
        style={{
          position: 'absolute',
          top: '50%',
          maxWidth: '1000px',
          wordBreak: 'keep-all',
          backgroundImage:
            'linear-gradient(90deg, rgb(255, 77, 77), rgb(249, 203, 40))',
          backgroundClip: 'text',
          color: 'transparent',
          fontSize: 60,
          letterSpacing: -2,
          fontWeight: 700,
        }}
      >
        {title}
      </span>
    </div>
  );
};

export default OgImage;
