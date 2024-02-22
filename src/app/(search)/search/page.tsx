import { notFound } from 'next/navigation';

import SearchLayout from '@/layouts/search-layout';
import { getAllPosts, getTagsAndCountsFromPosts } from '@/libs/notion';

const SearchPage = async () => {
  const posts = await getAllPosts({ includePages: false });
  if (!posts) return notFound();

  const [tags, tagCounts] = getTagsAndCountsFromPosts(posts);

  return <SearchLayout tags={tags} tagCounts={tagCounts} posts={posts} />;
};

export default SearchPage;

export const revalidate = 10;
