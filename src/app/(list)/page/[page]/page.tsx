import { notFound } from 'next/navigation';

import config from '@/../blog.config';
import ListLayout from '@/layouts/list-layout';
import { getAllPosts } from '@/libs/notion';

interface Params {
  params: {
    page: string;
  };
}

const ListPage = async ({ params }: Params) => {
  const posts = await getAllPosts({ includePages: false });
  if (!posts) notFound();

  const currentPage = Number(params.page);
  const postsToShow = posts.slice(
    config.postsPerPage * (currentPage - 1),
    config.postsPerPage * currentPage,
  );
  const showNext = currentPage * config.postsPerPage < posts.length;
  const totalPages = Math.ceil(posts.length / config.postsPerPage);

  return (
    <ListLayout
      postsToShow={postsToShow}
      currentPage={currentPage}
      totalPages={totalPages}
      showNext={showNext}
    />
  );
};

export default ListPage;

export const generateStaticParams = async (): Promise<{ page: string }[]> => {
  const posts = await getAllPosts({ includePages: false });
  if (!posts || !posts.length) return [];

  const totalPages = Math.ceil(posts.length / config.postsPerPage);
  return Array(totalPages - 1)
    .fill(null)
    .map((_, i) => ({ page: `${i + 2}` }));
};

export const revalidate = 10;
