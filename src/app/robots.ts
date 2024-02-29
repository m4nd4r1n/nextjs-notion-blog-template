import type { MetadataRoute } from 'next';

import config from '@/../blog.config';

const robots = (): MetadataRoute.Robots => {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
    },
    host: config.siteUrl,
    sitemap: `${config.siteUrl}/sitemap.xml`,
  };
};

export default robots;
