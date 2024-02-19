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

type GetUnixTimestamp = {
  (date: string | number | Date): number;
  (date: string, time: string, timezone: string): number;
};

export const getUnixTimestamp: GetUnixTimestamp = (
  date,
  time?: string,
  timezone?: string,
) => {
  if (!time || !timezone) {
    return new Date(date).getTime();
  }

  const offset = getTimezoneOffset(timezone);

  return new Date(`${date} ${time} ${offset}`).getTime();
};

const getTimezoneOffset = (timezone: string) => {
  const format = new Intl.DateTimeFormat('en-US', {
    timeZone: timezone,
    timeZoneName: 'short',
  });
  const parts = format.formatToParts(new Date());

  return parts.find((part) => part.type === 'timeZoneName')?.value ?? '';
};
