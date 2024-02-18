import config from '@/../blog.config';

interface Option {
  showWeekday?: boolean;
  locale?: Intl.LocalesArgument;
  timeZone?: string;
}

type FormatDate = (date: string | number | Date, options?: Option) => string;

export const formatDate: FormatDate = (
  date: string | number | Date,
  options = {},
) => {
  options.locale ??= config.locale;
  options.showWeekday ??= false;
  options.timeZone ??= config.timezone;

  const { locale, timeZone, showWeekday } = options;

  return new Date(date).toLocaleDateString(locale, {
    year: 'numeric',
    month: 'long',
    day: '2-digit',
    weekday: showWeekday ? 'long' : undefined,
    timeZone,
  });
};
