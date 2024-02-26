import { notFound } from 'next/navigation';

import { setStaticParamsLocale } from 'next-international/server';

import config from '@/../blog.config';
import ListLayout from '@/layouts/list-layout';
import { getAllPosts } from '@/libs/notion';

const Home = async () => {
  const posts = await getAllPosts({ includePages: false });
  if (!posts) notFound();
  setStaticParamsLocale(config.locale);

  const postsToShow = posts.slice(0, config.postsPerPage);
  const showNext = posts.length > config.postsPerPage;
  const totalPages = Math.ceil(posts.length / config.postsPerPage);

  return (
    <ListLayout
      postsToShow={postsToShow}
      currentPage={1}
      totalPages={totalPages}
      showNext={showNext}
    />
  );
};

export default Home;

export const revalidate = 10;
