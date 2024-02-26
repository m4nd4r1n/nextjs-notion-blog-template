import { setStaticParamsLocale } from 'next-international/server';

import config from '@/../blog.config';
import Link from '@/components/link';
import { getScopedI18n } from '@/i18n/server';

const NotFound = async () => {
  setStaticParamsLocale(config.locale);

  const t = await getScopedI18n('404');

  return (
    <>
      <h1 className='mt-8 text-center text-5xl text-black dark:text-white'>
        404
      </h1>
      <p className='text-center text-xl text-gray-600 dark:text-gray-300'>
        {t('message')}
      </p>
      <div className='mt-4 text-center'>
        <Link href='/' replace>
          {t('go_home')}
        </Link>
      </div>
    </>
  );
};

export default NotFound;
