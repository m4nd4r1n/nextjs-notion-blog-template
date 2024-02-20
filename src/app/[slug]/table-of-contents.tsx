'use client';

// ref: https://github.com/craigary/nobelium/blob/main/components/TableOfContents.js
import type { FC } from 'react';

import type { ExtendedRecordMap, NotionMap, PageBlock } from 'notion-types';
import { getPageTableOfContents } from 'notion-utils';

import { cn } from '@/utils/cn';

interface TableOfContentsProps {
  blockMap: ExtendedRecordMap;
  className?: string;
  headerHeight: number;
}

const TableOfContents: FC<TableOfContentsProps> = ({
  blockMap,
  className,
  headerHeight,
}: TableOfContentsProps) => {
  const collectionId = Object.keys(blockMap.collection)[0];
  const pageBlock = Object.values(blockMap.block).find(
    (block): block is NotionMap<PageBlock>[string] =>
      block.value.parent_id === collectionId,
  )?.value;
  if (!pageBlock) return null;

  const tocEntries = getPageTableOfContents(pageBlock, blockMap);
  if (!tocEntries.length) return null;

  const scrollTo = (id: string) => () => {
    id = id.replaceAll('-', '');
    const target = document.querySelector(`.notion-block-${id}`);
    if (!target) return;

    const top =
      document.documentElement.scrollTop +
      target.getBoundingClientRect().top -
      headerHeight;

    document.documentElement.scrollTo({
      top,
      behavior: 'smooth',
    });
  };

  return (
    <aside
      className={cn(
        className,
        'z-10 rounded-md text-sm text-neutral-700/70 backdrop-blur-sm dark:text-neutral-400 lg:p-1.5',
      )}
      style={{ top: `${headerHeight}px` }}
    >
      {tocEntries.map((entry) => (
        <div key={entry.id}>
          <a
            data-target-id={entry.id}
            className='block cursor-pointer py-1 hover:text-neutral-900 active:text-neutral-700 motion-safe:transition-colors dark:hover:text-neutral-50 dark:active:text-neutral-300'
            style={{ paddingLeft: entry.indentLevel * 24 + 'px' }}
            onClick={scrollTo(entry.id)}
          >
            {entry.text}
          </a>
        </div>
      ))}
    </aside>
  );
};

export default TableOfContents;
