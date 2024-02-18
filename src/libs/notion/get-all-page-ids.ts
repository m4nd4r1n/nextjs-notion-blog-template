// ref: https://github.com/craigary/nobelium/blob/main/lib/notion/getAllPageIds.js
import type { ExtendedRecordMap } from 'notion-types';
import { idToUuid } from 'notion-utils';

type GetAllPageIds = (
  collectionQuery: ExtendedRecordMap['collection_query'],
  viewId?: string,
) => string[];

export const getAllPageIds: GetAllPageIds = (collectionQuery, viewId) => {
  const views = Object.values(collectionQuery)[0];

  if (viewId) {
    const vId = idToUuid(viewId);
    return views[vId].blockIds;
  }

  const pageSet = Object.values(views).reduce((pageSet, view) => {
    view?.collection_group_results?.blockIds?.forEach((id) => pageSet.add(id));
    return pageSet;
  }, new Set<string>());

  return Array.from(pageSet);
};
