import { notFound } from 'next/navigation';

import { createHash } from 'crypto';

import config from '@/../blog.config';
import PrevNextPost from '@/app/[slug]/prev-next-post';
import TagItem from '@/components/tag-item';
import { getAllPosts, getPage } from '@/libs/notion';

import Comments from './comments';
import Post from './post';
import PostBackTop from './post-top-back';
import ScrollTopAndComment from './scroll-top-and-comment';

interface Params {
  params: {
    slug: string;
  };
}

const PostPage = async ({ params }: Params) => {
  const posts = await getAllPosts({ includePages: true });
  const slug = decodeURIComponent(params.slug);
  if (!posts) notFound();

  const post = posts.find((post) => post.slug === slug);
  if (!post || !post.id) notFound();

  const blockMap = await getPage(post.id);
  const emailHash = createHash('md5')
    .update(config.email)
    .digest('hex')
    .trim()
    .toLowerCase();

  return (
    <div className='px-4 sm:px-6'>
      <Post post={post} blockMap={blockMap} emailHash={emailHash} />

      {post.type?.[0] === 'Post' && (
        <>
          <Comments />
          {post.tags && (
            <div className='py-4'>
              <h2 className='text-xs uppercase tracking-wide text-gray-500 dark:text-gray-400'>
                Tags
              </h2>
              <div className='flex flex-wrap'>
                {post.tags.map((tag) => (
                  <TagItem key={tag.tag} {...tag} />
                ))}
              </div>
            </div>
          )}
          <PrevNextPost posts={posts} slug={slug} />
        </>
      )}
      <PostBackTop />
      <ScrollTopAndComment className='fixed bottom-8 right-8 w-fit xl:right-auto xl:translate-x-[57rem]' />
    </div>
  );
};

export default PostPage;

export const generateStaticParams = async (): Promise<{ slug: string }[]> => {
  const posts = await getAllPosts({ includePages: true });
  if (!posts) return [];
  return posts.map((post) => ({ slug: `${post.slug}` }));
};

export const revalidate = 10;
