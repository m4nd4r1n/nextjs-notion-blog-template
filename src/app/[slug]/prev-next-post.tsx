import type { FC } from 'react';

import Link from '@/components/link';
import { getScopedI18n } from '@/i18n/server';
import type { Post } from '@/types';

interface PrevNextPost {
  posts: Post[];
  slug: string;
}

const PrevNextPost: FC<PrevNextPost> = async ({ posts, slug }) => {
  const postsWithoutPages = posts.filter((post) => post.type?.[0] === 'Post');
  const postIndex = postsWithoutPages.findIndex((post) => post.slug === slug);
  const prevPost = postsWithoutPages[postIndex + 1];
  const nextPost = postsWithoutPages[postIndex - 1];
  const t = await getScopedI18n('post');

  let prev;
  let next;

  if (prevPost) {
    prev = { path: prevPost.slug, title: prevPost.title };
  }
  if (nextPost) {
    next = { path: nextPost.slug, title: nextPost.title };
  }

  if (!prev && !next) return null;

  return (
    <div className='flex justify-between py-4 xl:block xl:space-y-8 xl:py-8'>
      <div>
        {prev && prev.path && (
          <>
            <h2 className='text-xs uppercase tracking-wide text-gray-500 dark:text-gray-400'>
              {t('prev')}
            </h2>
            <Link href={`/${prev.path}`}>{prev.title}</Link>
          </>
        )}
      </div>
      {next && next.path && (
        <div>
          <h2 className='text-xs uppercase tracking-wide text-gray-500 dark:text-gray-400'>
            {t('next')}
          </h2>
          <Link href={`/${next.path}`}>{next.title}</Link>
        </div>
      )}
    </div>
  );
};

export default PrevNextPost;
