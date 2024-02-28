import { ImageResponse } from 'next/og';

import config from '@/../blog.config';
import OgImage from '@/components/og-image';
import { OG_FONT } from '@/constants/opengraph';

export const runtime = 'edge';
export const size = {
  width: 1200,
  height: 630,
};

export const contentType = 'image/png';

const Image = async () => {
  const boldFont = fetch(
    new URL(`../../public/fonts/open-graph-bold.woff`, import.meta.url),
  ).then((res) => res.arrayBuffer());
  const logo = fetch(new URL(`../../public/logo.png`, import.meta.url)).then(
    (res) => res.arrayBuffer(),
  );
  const [boldFontData, logoData] = await Promise.all([boldFont, logo]);

  return new ImageResponse(
    <OgImage logoSrc={logoData} title={config.title} />,
    {
      ...size,
      fonts: [
        {
          name: OG_FONT,
          data: boldFontData,
          style: 'normal',
          weight: 700,
        },
      ],
    },
  );
};

export default Image;
