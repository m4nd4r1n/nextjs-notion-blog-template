import type { CollectionPropertySchemaMap } from 'notion-types';

import type { SelectColor } from '@/types';

type GetTagColors = (
  schema: CollectionPropertySchemaMap,
) => Record<string, SelectColor>;

export const getTagColors: GetTagColors = (schema) => {
  const possibleTags = Object.values(schema ?? {}).filter(
    (schema) => schema.name === 'tags',
  )[0]?.options;

  return (
    possibleTags?.reduce(
      (tagColorMap, tag) => {
        tagColorMap[tag.value] = tag.color as SelectColor;
        return tagColorMap;
      },
      {} as Record<string, SelectColor>,
    ) ?? {}
  );
};
