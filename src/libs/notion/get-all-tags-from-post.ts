// ref: https://github.com/craigary/nobelium/blob/main/lib/notion/getAllTagsFromPosts.js
import type { Post } from '@/types';

type GetTagsAndCountsFromPosts = (
  posts: Post[],
) => [string[], Record<string, number>];

export const getTagsAndCountsFromPosts: GetTagsAndCountsFromPosts = (posts) => {
  const allTags = [
    ...posts
      .filter((post) => post?.tags)
      .map(({ tags }) => tags)
      .filter((tags): tags is NonNullable<typeof tags> => Boolean(tags))
      .flat(),
  ];

  const tagCounts = allTags.reduce(
    (tagObj, { tag }) => {
      if (tag in tagObj) {
        tagObj[tag]++;
      } else {
        tagObj[tag] = 1;
      }
      return tagObj;
    },
    {} as Record<string, number>,
  );

  const tags = Object.keys(tagCounts).toSorted(
    (a, b) => tagCounts[b] - tagCounts[a],
  );

  return [tags, tagCounts];
};
