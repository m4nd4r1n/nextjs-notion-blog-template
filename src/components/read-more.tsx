'use client';

import type { FC } from 'react';

import Link from '@/components/link';
import { I18nProviderClient, useScopedI18n } from '@/i18n/client';

interface ReadMoreProps {
  postHref: string;
  title?: string;
}

const ReadMore: FC<ReadMoreProps> = (props) => {
  return (
    <I18nProviderClient>
      <ReadMoreImpl {...props} />
    </I18nProviderClient>
  );
};

const ReadMoreImpl: FC<ReadMoreProps> = ({ title, postHref }) => {
  const t = useScopedI18n('list.read');
  return (
    <div className='text-base font-medium leading-6'>
      <Link href={postHref} aria-label={t('aria', { title })}>
        {t('default')} &rarr;
      </Link>
    </div>
  );
};

export default ReadMore;
