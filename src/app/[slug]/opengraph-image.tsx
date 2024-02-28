import { ImageResponse } from 'next/og';

import * as fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

import OgImage from '@/components/og-image';
import { OG_FONT } from '@/constants/opengraph';
import { getAllPosts } from '@/libs/notion';

export const runtime = 'nodejs';
export const size = {
  width: 1200,
  height: 630,
};
export const contentType = 'image/png';

interface Params {
  params: {
    slug: string;
  };
}

const Image = async ({ params }: Params) => {
  const posts = await getAllPosts({ includePages: true });
  const slug = decodeURIComponent(params.slug);
  if (!posts) throw new Error('Post not found.');
  const post = posts.find((post) => post.slug === slug);
  if (!post || !post.id) throw new Error('Post not found.');

  const boldFont = fs.promises
    .readFile(
      path.join(
        fileURLToPath(import.meta.url),
        '../../../../public/fonts/open-graph-bold.woff',
      ),
    )
    .then(toArrayBuffer);
  const logo = fs.promises
    .readFile(
      path.join(fileURLToPath(import.meta.url), '../../../../public/logo.png'),
    )
    .then(toArrayBuffer);

  const [boldFontData, logoData] = await Promise.all([boldFont, logo]);

  return new ImageResponse(
    <OgImage logoSrc={logoData} title={post.title ?? ''} />,
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

const toArrayBuffer = (buffer: Buffer) =>
  buffer.buffer.slice(buffer.byteOffset, buffer.byteOffset + buffer.byteLength);
