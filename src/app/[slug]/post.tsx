import Image from 'next/image';
import type { FC } from 'react';

import type { ExtendedRecordMap } from 'notion-types';

import config from '@/../blog.config';
import FormattedDate from '@/components/formatted-date';
import type { Post } from '@/types';

import NotionRenderer from './notion-renderer';
import TableOfContents from './table-of-contents';

interface PostProps {
  post: Post;
  blockMap: ExtendedRecordMap;
  emailHash: string;
}

const Post: FC<PostProps> = ({ post, blockMap, emailHash }) => {
  const isPost = post.type?.[0] === 'Post';

  return (
    <article className='flex flex-col items-center'>
      {isPost ? (
        <>
          <header className='space-y-1 pt-20 text-center'>
            <FormattedDate date={post.date} showWeekday />
            <h1 className='w-full break-keep text-3xl font-extrabold leading-9 tracking-tight text-neutral-900 dark:text-neutral-100 sm:text-4xl sm:leading-10 md:text-5xl md:leading-[3.5rem]'>
              {post.title}
            </h1>
          </header>
          <nav className='w-full border-b border-neutral-200 pb-10 pt-6 text-neutral-500 dark:border-neutral-700 dark:text-neutral-400'>
            <div className='flex justify-center'>
              <a href={config.socialLink || '#'} className='flex'>
                <Image
                  alt={config.author}
                  width={28}
                  height={28}
                  src={`https://gravatar.com/avatar/${emailHash}`}
                  className='rounded-full'
                />
                <div className='ml-2 flex items-center text-sm font-medium'>
                  {config.author}
                </div>
              </a>
            </div>
          </nav>
        </>
      ) : (
        <h1 className='w-full pt-20 text-3xl font-extrabold leading-9 tracking-tight text-neutral-900 dark:text-neutral-100 sm:text-4xl sm:leading-10'>
          {post.title}
        </h1>
      )}

      {post.pageCover && (
        <div className='w-full py-8'>
          <div className='relative h-64 md:h-80'>
            <Image
              className='rounded object-cover'
              src={post.pageCover}
              alt='cover'
              fill
            />
          </div>
        </div>
      )}

      <div className='-mt-4 flex flex-col items-center self-stretch lg:flex-row lg:items-stretch'>
        <div className='w-full flex-none'>
          <NotionRenderer recordMap={blockMap} fullPage={false} />
        </div>
        <div className='order-first w-full flex-1 lg:order-[unset] lg:w-auto lg:min-w-[160px] lg:max-w-[unset] lg:pl-4'>
          <TableOfContents
            blockMap={blockMap}
            className='sticky'
            headerHeight={68}
          />
        </div>
      </div>
    </article>
  );
};

export default Post;
