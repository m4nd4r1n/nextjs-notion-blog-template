import type { MetadataRoute } from 'next';

import config from '@/../blog.config';
import { getAllPosts } from '@/libs/notion';

const sitemap = async (): Promise<MetadataRoute.Sitemap> => {
  const posts = await getAllPosts({ includePages: false });
  if (!posts) return [];

  const latest = Math.max(...posts.map((post) => post.date));

  const fields: MetadataRoute.Sitemap = posts.map((post) => ({
    url: `${config.siteUrl}/${post.slug}`,
    lastModified: new Date(post.date).toISOString(),
    changeFrequency: 'daily',
    priority: 0.7,
  }));

  const home: MetadataRoute.Sitemap[number] = {
    url: `${config.siteUrl}`,
    lastModified: new Date(latest).toISOString(),
    changeFrequency: 'daily',
    priority: 1,
  };

  return [home, ...fields];
};

export default sitemap;
