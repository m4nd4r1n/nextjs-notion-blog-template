'use client';

import Link from 'next/link';
import { type FC, useState } from 'react';

import { MagnifyingGlassIcon } from '@heroicons/react/24/outline';

import PostListItem from '@/components/post-list-item';
import type { Post } from '@/types';
import { cn } from '@/utils/cn';

interface SearchProps {
  tags: string[];
  tagCounts: Record<string, number>;
  posts: Post[];
  currentTag?: string;
}

const SearchLayout: FC<SearchProps> = ({
  tags,
  tagCounts,
  posts,
  currentTag,
}) => {
  const [searchValue, setSearchValue] = useState('');

  const filteredPosts = posts.filter((post) => {
    const tagContent = post.tags.map(({ tag }) => tag).join(' ');
    const searchContent = `${post.title ?? ''}${post.summary ?? ''}${tagContent}`;
    return searchContent.toLowerCase().includes(searchValue.toLowerCase());
  });

  return (
    <>
      <div className='relative mt-4'>
        <label htmlFor='search' className='sr-only'>
          Search
        </label>
        <input
          id='search'
          name='search'
          type='text'
          placeholder={
            currentTag ? `Search in #${currentTag}` : 'Search Articles'
          }
          className='block h-9 w-full rounded-md border border-neutral-200 bg-transparent pl-3 pr-10 text-sm shadow-sm placeholder:text-neutral-500 focus-visible:border-primary-400 focus-visible:outline-none motion-safe:transition-colors'
          onChange={(e) => setSearchValue(e.target.value)}
          spellCheck={false}
        />
        <MagnifyingGlassIcon className='pointer-events-none absolute right-3 top-2 h-5 w-5 text-black dark:text-white' />
      </div>

      <ul className='mt-4 flex max-h-[5.5rem] max-w-full flex-wrap gap-3 overflow-y-scroll'>
        {tags.map((tag) => (
          <SearchTagItem
            key={tag}
            tag={tag}
            selected={tag === currentTag}
            tagCounts={tagCounts}
          />
        ))}
      </ul>

      <ul className='my-4 divide-y'>
        {!filteredPosts.length && (
          <p className='text-gray-500 dark:text-gray-300'>No posts found.</p>
        )}
        {filteredPosts.slice(0, 20).map((post) => (
          <PostListItem key={post.id} post={post} />
        ))}
      </ul>
    </>
  );
};

export default SearchLayout;

interface SearchTagItemProps {
  tag: string;
  selected: boolean;
  tagCounts: Record<string, number>;
}

const SearchTagItem: FC<SearchTagItemProps> = ({
  selected,
  tag,
  tagCounts,
}) => {
  return (
    <li className='whitespace-nowrap text-sm font-medium'>
      <Link
        href={selected ? '/search' : `/tag/${encodeURIComponent(tag)}`}
        className={cn('block motion-safe:transition-colors', {
          'text-primary-500 hover:text-primary-600 dark:hover:text-primary-400':
            selected,
          'text-neutral-400 hover:text-neutral-500 dark:text-neutral-300 dark:hover:text-neutral-400':
            !selected,
        })}
      >
        {`${tag.toUpperCase()} (${tagCounts[tag]})`}
      </Link>
    </li>
  );
};
