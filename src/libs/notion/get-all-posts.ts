// ref: https://github.com/craigary/nobelium/blob/main/lib/notion/getAllPosts.js
import { cache } from 'react';

import { idToUuid } from 'notion-utils';

import config from '@/../blog.config';
import type { Post } from '@/types';

import api from './api';
import { filterPublishedPosts } from './filter-published-posts';
import { getAllPageIds } from './get-all-page-ids';
import { getPageCovers } from './get-page-covers';
import { getPageProperties } from './get-page-properties';
import { getTagColors } from './get-tag-colors';

interface GetAllPostsArgs {
  includePages: boolean;
}
type GetAllPosts = (arg: GetAllPostsArgs) => Promise<Post[] | null>;

export const getAllPosts = cache<GetAllPosts>(async ({ includePages }) => {
  const id = idToUuid(process.env.NOTION_PAGE_ID);

  const response = await api.getPage(id, {});
  const collection = Object.values(response.collection)[0]?.value;
  const collectionQuery = response.collection_query;
  const block = response.block;
  const schema = collection?.schema;
  const rawMetadata = block[id].value;

  if (
    rawMetadata?.type !== 'collection_view_page' &&
    rawMetadata?.type !== 'collection_view'
  ) {
    console.log(`pageId "${id}" is not a database`);
    return null;
  } else {
    const pageIds = getAllPageIds(collectionQuery);
    const tagColorMap = getTagColors(schema);
    const pageCoverMap = getPageCovers(block);
    const propertiesArray = await Promise.all(
      pageIds.map((id) => getPageProperties(id, block, schema)),
    );
    const posts: Post[] = pageIds.map((id, index) => {
      const properties = propertiesArray[index];
      const date = new Date(
        properties.date?.start_date
          ? properties.date?.start_date
          : block[id].value?.created_time,
      ).getTime();
      const fullWidth = block[id].value?.format?.page_full_width ?? false;
      const tags =
        properties.tags?.map((tag) => ({
          tag,
          color: tagColorMap[tag] || 'blue',
        })) ?? [];
      const pageCover = pageCoverMap[id] ?? '';

      return { ...properties, fullWidth, date, tags, pageCover };
    });
    const filteredPosts = filterPublishedPosts({ posts, includePages });

    if (config.sortByDate) {
      filteredPosts.sort((a, b) => b.date - a.date);
    }

    return filteredPosts;
  }
});
