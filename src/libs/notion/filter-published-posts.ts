// ref: https://github.com/craigary/nobelium/blob/main/lib/notion/filterPublishedPosts.js
import type { Post } from '@/types';

interface FilterPublishedPostsArg {
  posts: Post[];
  includePages: boolean;
}

type FilterPublishedPosts = (arg: FilterPublishedPostsArg) => Post[];

export const filterPublishedPosts: FilterPublishedPosts = ({
  posts,
  includePages,
}) => {
  if (!posts || !posts.length) return [] as Post[];

  return posts
    .filter((post) =>
      includePages
        ? post?.type?.[0] === 'Post' || post?.type?.[0] === 'Page'
        : post?.type?.[0] === 'Post',
    )
    .filter(
      (post) =>
        post.title &&
        post.slug &&
        post?.status?.[0] === 'Published' &&
        post.date <= Date.now(),
    );
};
