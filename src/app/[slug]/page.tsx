import type { Metadata } from 'next';
import { notFound } from 'next/navigation';

import { createHash } from 'crypto';
import { setStaticParamsLocale } from 'next-international/server';

import config from '@/../blog.config';
import { getAllPosts, getPage } from '@/libs/notion';

import Comments from './comments';
import Post from './post';
import PostTags from './post-tags';
import PostTopHome from './post-top-home';
import PrevNextPost from './prev-next-post';
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
  setStaticParamsLocale(config.locale);

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
          <PostTags tags={post.tags} />
          <PrevNextPost posts={posts} slug={slug} />
        </>
      )}
      <PostTopHome />
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

export const generateMetadata = async ({
  params,
}: Params): Promise<Metadata> => {
  const posts = await getAllPosts({ includePages: true });
  const slug = decodeURIComponent(params.slug);
  if (!posts) return {};

  const post = posts.find((post) => post.slug === slug);
  if (!post || !post.id) return {};

  const path = `/${slug}`;
  const tags = post.tags.slice(0, 10).map(({ tag }) => tag);

  return {
    title: post.title,
    description: post.summary,
    alternates: {
      canonical: path,
    },
    openGraph: {
      title: post.title,
      description: post.summary,
      url: path,
      siteName: config.title,
      locale: config.locale,
      type: 'article',
      publishedTime: new Date(post.date).toISOString(),
      modifiedTime: new Date(post.date).toISOString(),
      authors: config.author,
    },
    twitter: {
      card: 'summary_large_image',
      title: post.title,
      description: post.summary,
    },
    keywords: tags,
    authors: { name: config.author },
  };
};
