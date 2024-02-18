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
      <ul className='divide-y divide-gray-200 dark:divide-gray-700'>
        {postsToShow.map((post) => (
          <PostListItem key={post.id} post={post} />
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
      {isFirstPage && (
        <button className='opacity-50' disabled={isFirstPage}>
          &larr; Prev
        </button>
      )}
      {!isFirstPage && (
        <Link
          className='block'
          href={isSecondPage ? '/' : `/page/${currentPage - 1}`}
          rel='prev'
        >
          &larr; Prev
        </Link>
      )}

      <span>
        {currentPage} / {totalPages}
      </span>

      {showNext && (
        <Link className='block' href={`/page/${currentPage + 1}`} rel='next'>
          Next &rarr;
        </Link>
      )}
      {!showNext && (
        <button className='opacity-50' disabled={!showNext}>
          Next &rarr;
        </button>
      )}
    </nav>
  );
};
