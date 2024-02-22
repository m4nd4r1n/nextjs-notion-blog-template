import { notFound } from 'next/navigation';

import SearchLayout from '@/layouts/search-layout';
import { getAllPosts, getTagsAndCountsFromPosts } from '@/libs/notion';

interface TagPageProps {
  params: {
    tag: string;
  };
}

const TagPage = async ({ params }: TagPageProps) => {
  const posts = await getAllPosts({ includePages: false });
  const currentTag = decodeURIComponent(params.tag);
  if (!posts || !currentTag) return notFound();

  const [tags, tagCounts] = getTagsAndCountsFromPosts(posts);
  const filteredPosts = posts.filter((post) =>
    post.tags?.some(({ tag }) => tag === currentTag),
  );

  return (
    <SearchLayout
      posts={filteredPosts}
      currentTag={currentTag}
      tags={tags}
      tagCounts={tagCounts}
    />
  );
};

export default TagPage;

export const revalidate = 10;

export const generateStaticParams = async (): Promise<{ tag: string }[]> => {
  const posts = await getAllPosts({ includePages: false });
  if (!posts) return [];
  const [tags] = getTagsAndCountsFromPosts(posts);
  return tags.map((tag) => ({ tag }));
};
