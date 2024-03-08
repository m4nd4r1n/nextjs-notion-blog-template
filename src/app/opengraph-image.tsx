import { ImageResponse } from 'next/og';

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

import config from '@/../blog.config';
import OgImage from '@/components/og-image';
import { OG_FONT } from '@/constants/opengraph';
import { toArrayBuffer } from '@/utils/node';

export const runtime = 'nodejs';
export const size = {
  width: 1200,
  height: 630,
};

export const contentType = 'image/png';

const Image = async () => {
  const boldFont = fs.promises
    .readFile(
      path.join(
        fileURLToPath(import.meta.url),
        '../../../public/fonts/open-graph-bold.woff',
      ),
    )
    .then(toArrayBuffer);
  const logo = fs.promises
    .readFile(
      path.join(fileURLToPath(import.meta.url), '../../../public/logo.png'),
    )
    .then(toArrayBuffer);
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
