// ref: https://github.com/craigary/nobelium/blob/main/lib/notion/getAllPosts.js
import { idToUuid } from 'notion-utils';

import config from '@/../blog.config';
import type { Post } from '@/types';
import { getUnixTimestamp } from '@/utils/date';

import { getPage } from './api';
import { filterPublishedPosts } from './filter-published-posts';
import { getAllPageIds } from './get-all-page-ids';
import { getPageCovers } from './get-page-covers';
import { getPageProperties } from './get-page-properties';
import { getTagColors } from './get-tag-colors';

interface GetAllPostsArgs {
  includePages: boolean;
}
type GetAllPosts = (arg: GetAllPostsArgs) => Promise<Post[] | null>;

export const getAllPosts: GetAllPosts = async ({ includePages }) => {
  const id = idToUuid(process.env.NOTION_PAGE_ID);
  const response = await getPage(id);
  const collection = Object.values(response.collection)[0]?.value;
  const collectionQuery = response.collection_query;
  const block = response.block;
  const schema = collection?.schema;
  const rawMetadata = block[id].value;

  if (
    rawMetadata?.type !== 'collection_view_page' &&
    rawMetadata?.type !== 'collection_view'
  ) {
    console.warn(`pageId "${id}" is not a database`);
    return null;
  } else {
    const pageIds = getAllPageIds(collectionQuery);
    const tagColorMap = getTagColors(schema);
    const pageCoverMap = getPageCovers(block);
    const propertiesArray = pageIds.map((id) =>
      getPageProperties(id, block, schema),
    );
    const posts: Post[] = pageIds.map((id, index) => {
      const properties = propertiesArray[index];
      const tags =
        properties.tags?.map((tag) => ({
          tag,
          color: tagColorMap[tag] || 'blue',
        })) ?? [];
      const pageCover = pageCoverMap[id] ?? '';
      const { time_zone, start_time, start_date } = properties.date ?? {};

      let date: number;

      if (start_date && start_time && time_zone) {
        date = getUnixTimestamp(start_date, start_time, time_zone);
      } else if (start_date) {
        date = getUnixTimestamp(start_date);
      } else {
        date = getUnixTimestamp(block[id].value.created_time);
      }

      return { ...properties, date, tags, pageCover };
    });
    const filteredPosts = filterPublishedPosts({ posts, includePages });

    if (config.sortByDate) {
      filteredPosts.sort((a, b) => {
        if (b.date !== a.date) return b.date - a.date;
        const titleA = a.title ?? '';
        const titleB = b.title ?? '';
        if (titleA >= titleB) return -1;
        else return 1;
      });
    }

    return filteredPosts;
  }
};
