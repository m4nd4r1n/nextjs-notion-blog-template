// ref: https://github.com/craigary/nobelium/blob/main/lib/notion/getPageProperties.js
import type { Collection, ExtendedRecordMap } from 'notion-types';
import { getDateValue, getTextContent } from 'notion-utils';

import type { Properties } from '@/types';

type SelectKeys = 'type' | 'tags' | 'status';
type DateKey = 'date';
type GetPageProperties = (
  id: string,
  block: ExtendedRecordMap['block'],
  schema: Collection['schema'],
) => Properties;

export const getPageProperties: GetPageProperties = (id, block, schema) => {
  const rawProperties = Object.entries(block?.[id]?.value?.properties || []);
  const excludeProperties = ['date', 'select', 'multi_select'];

  return rawProperties.reduce((properties, [key, value]) => {
    const type = schema[key]?.type;
    const name = schema[key]?.name;

    properties.id = id;

    if (type && !excludeProperties.includes(type)) {
      properties[name as Exclude<keyof Properties, SelectKeys>] =
        getTextContent(value as Parameters<typeof getTextContent>[0]);
      return properties;
    }

    switch (type) {
      case 'date': {
        const tmpDateProperty: Partial<ReturnType<typeof getDateValue>> =
          getDateValue(value as Parameters<typeof getDateValue>[0]);
        if (tmpDateProperty) {
          delete tmpDateProperty.type;
          properties[name as DateKey] = tmpDateProperty;
        }
        break;
      }
      case 'select':
      case 'multi_select': {
        const selects = getTextContent(
          value as Parameters<typeof getTextContent>[0],
        );
        if (selects[0]?.length) {
          properties[name as SelectKeys] = selects.split(',');
        }
        break;
      }
      default:
        break;
    }

    return properties;
  }, {} as Properties);
};
