import { notFound } from 'next/navigation';

import { setStaticParamsLocale } from 'next-international/server';

import config from '@/../blog.config';
import SearchLayout from '@/layouts/search-layout';
import { getAllPosts, getTagsAndCountsFromPosts } from '@/libs/notion';

const SearchPage = async () => {
  const posts = await getAllPosts({ includePages: false });
  if (!posts) return notFound();
  setStaticParamsLocale(config.locale);

  const [tags, tagCounts] = getTagsAndCountsFromPosts(posts);

  return <SearchLayout tags={tags} tagCounts={tagCounts} posts={posts} />;
};

export default SearchPage;

export const revalidate = 10;
