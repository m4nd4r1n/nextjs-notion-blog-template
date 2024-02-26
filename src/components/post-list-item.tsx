import type { FC } from 'react';

import FormattedDate from '@/components/formatted-date';
import Link from '@/components/link';
import ReadMore from '@/components/read-more';
import TagItem from '@/components/tag-item';
import type { Post } from '@/types';
import { cn } from '@/utils/cn';

interface PostListItemProps {
  post: Post;
  isWide?: boolean;
}

const PostListItem: FC<PostListItemProps> = ({ post, isWide = false }) => {
  const postHref = `/${encodeURIComponent(post.slug ?? '')}`;

  return (
    <li className={cn({ 'py-10': isWide, 'py-4': !isWide })}>
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
          {isWide && <ReadMore title={post.title} postHref={postHref} />}
        </div>
      </article>
    </li>
  );
};

export default PostListItem;
