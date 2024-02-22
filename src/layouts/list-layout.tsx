import { notFound } from 'next/navigation';
import type { FC } from 'react';

import Link from '@/components/link';
import PostListItem from '@/components/post-list-item';
import type { Post } from '@/types';

interface ListLayoutProps {
  postsToShow: Post[];
  currentPage: number;
  totalPages: number;
  showNext: boolean;
}

const ListLayout: FC<ListLayoutProps> = ({
  postsToShow,
  showNext,
  totalPages,
  currentPage,
}) => {
  if (!postsToShow.length) return notFound();

  return (
    <>
      <ul className='divide-y divide-neutral-200 dark:divide-neutral-700'>
        {postsToShow.map((post) => (
          <PostListItem key={post.id} post={post} isWide />
        ))}
      </ul>
      {(currentPage !== 1 || showNext) && (
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          showNext={showNext}
        />
      )}
    </>
  );
};

export default ListLayout;

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  showNext: boolean;
}

const Pagination: FC<PaginationProps> = ({
  currentPage,
  totalPages,
  showNext,
}) => {
  const isFirstPage = currentPage === 1;
  const isSecondPage = currentPage === 2;

  return (
    <nav className='flex justify-between'>
      {isFirstPage ? (
        <button
          className='text-neutral-900 opacity-50 dark:text-neutral-100'
          disabled={isFirstPage}
        >
          &larr; Prev
        </button>
      ) : (
        <Link
          className='block'
          href={isSecondPage ? '/' : `/page/${currentPage - 1}`}
          rel='prev'
        >
          &larr; Prev
        </Link>
      )}

      <span className='text-neutral-900 dark:text-neutral-100'>
        {currentPage} / {totalPages}
      </span>

      {showNext ? (
        <Link className='block' href={`/page/${currentPage + 1}`} rel='next'>
          Next &rarr;
        </Link>
      ) : (
        <button
          className='text-neutral-900 opacity-50 dark:text-neutral-100'
          disabled={!showNext}
        >
          Next &rarr;
        </button>
      )}
    </nav>
  );
};
