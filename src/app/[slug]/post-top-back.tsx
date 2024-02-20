'use client';

import Link from '@/components/link';

const PostBackTop = () => {
  const handleScrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  return (
    <div className='flex justify-between py-4 font-medium'>
      <Link href='/'>&larr; Back</Link>
      <a className='block md:hidden'>
        <button
          onClick={handleScrollToTop}
          className='text-primary-500 hover:text-primary-600 motion-safe:transition-colors dark:hover:text-primary-400'
        >
          &uarr; Top
        </button>
      </a>
    </div>
  );
};

export default PostBackTop;
