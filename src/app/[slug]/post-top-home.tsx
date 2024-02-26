'use client';

import Link from '@/components/link';
import { I18nProviderClient, useScopedI18n } from '@/i18n/client';

const PostTopHome = () => {
  return (
    <I18nProviderClient>
      <PostTopHomeImpl />
    </I18nProviderClient>
  );
};

const PostTopHomeImpl = () => {
  const t = useScopedI18n('post');

  const handleScrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  return (
    <div className='flex justify-between py-4 font-medium'>
      <Link href='/'>&larr; {t('home')}</Link>
      <a className='block md:hidden'>
        <button
          onClick={handleScrollToTop}
          className='text-primary-500 hover:text-primary-600 motion-safe:transition-colors dark:hover:text-primary-400'
        >
          &uarr; {t('top')}
        </button>
      </a>
    </div>
  );
};

export default PostTopHome;
