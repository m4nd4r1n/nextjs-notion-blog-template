'use client';

import type { FC } from 'react';

import { I18nProviderClient, useScopedI18n } from '@/i18n/client';
import { formatDate } from '@/utils/date';

interface FormattedDateProps {
  date: number | string | Date;
  showWeekday?: boolean;
}

const FormattedDate: FC<FormattedDateProps> = (props) => {
  return (
    <I18nProviderClient>
      <FormattedDateImpl {...props} />
    </I18nProviderClient>
  );
};

const FormattedDateImpl: FC<FormattedDateProps> = ({
  date,
  showWeekday = false,
}) => {
  const t = useScopedI18n('date');

  return (
    <dl>
      <dt className='sr-only'>{t('published')}</dt>
      <dd className='text-base font-medium text-gray-500 dark:text-gray-400'>
        <time dateTime={new Date(date).toISOString()}>
          {formatDate(date, { showWeekday })}
        </time>
      </dd>
    </dl>
  );
};

export default FormattedDate;
