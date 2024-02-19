import { FC } from 'react';

import { formatDate } from '@/utils/date';

interface FormattedDateProps {
  date: number | string | Date;
  showWeekday?: boolean;
}

const FormattedDate: FC<FormattedDateProps> = ({
  date,
  showWeekday = false,
}) => {
  return (
    <dl>
      <dt className='sr-only'>Published on</dt>
      <dd className='text-base font-medium text-gray-500 dark:text-gray-400'>
        <time dateTime={new Date(date).toISOString()}>
          {formatDate(date, { showWeekday })}
        </time>
      </dd>
    </dl>
  );
};

export default FormattedDate;
