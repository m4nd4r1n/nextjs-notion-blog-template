import type { FC } from 'react';

import FormattedDate from '@/components/formatted-date';
import Link from '@/components/link';
import TagItem from '@/components/tag-item';
import type { Post } from '@/types';

interface PostListItemProps {
  post: Post;
}

const PostListItem: FC<PostListItemProps> = ({ post }) => {
  const postHref = `/${encodeURIComponent(post.slug ?? '')}`;

  return (
    <li className='py-10'>
      <article key={post.id} className='space-y-2'>
        <FormattedDate date={post.date} />
        <div className='space-y-5'>
          <div className='space-y-6'>
            <div className='space-y-1'>
              <h2 className='text-2xl font-bold leading-8 tracking-tight'>
                <Link variant='secondary' href={postHref}>
                  {post.title}
                </Link>
              </h2>
              {!!post.tags.length && (
                <div className='flex flex-row flex-wrap'>
                  {post.tags.map((tag, i) => (
                    <TagItem key={`${post.id}-${i}`} {...tag} />
                  ))}
                </div>
              )}
            </div>
            <div className='prose max-w-none text-gray-500 dark:text-gray-400'>
              {post.summary}
            </div>
          </div>
          <div className='text-base font-medium leading-6'>
            <Link href={postHref} aria-label={`Read "${post.title}"`}>
              Read more &rarr;
            </Link>
          </div>
        </div>
      </article>
    </li>
  );
};

export default PostListItem;
