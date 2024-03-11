'use client';

import * as Switch from '@radix-ui/react-switch';
import { useTheme } from 'next-themes';

import { I18nProviderClient, useScopedI18n } from '@/i18n/client';

export const ThemeSwitch = () => {
  return (
    <I18nProviderClient>
      <ThemeSwitchImpl />
    </I18nProviderClient>
  );
};

const ThemeSwitchImpl = () => {
  const t = useScopedI18n('switch');
  const { theme, setTheme, resolvedTheme } = useTheme();

  const isDark = theme === 'dark' || resolvedTheme === 'dark';

  const onChange = () => {
    setTheme(theme === 'dark' || resolvedTheme === 'dark' ? 'light' : 'dark');
  };

  return (
    <Switch.Root
      checked={isDark}
      onCheckedChange={onChange}
      className='relative inline-flex h-6 w-12 shrink-0 cursor-pointer items-center overflow-hidden rounded-full bg-gradient-light shadow-inset shadow-neutral-800 drop-shadow focus:outline-none dark:bg-gradient-dark dark:shadow-neutral-100'
    >
      <span className='sr-only'>{t('theme')}</span>
      <Switch.Thumb
        aria-hidden='true'
        className='motion-safe:-in-out pointer-events-none inline-block h-[18px] w-[18px] translate-x-1 transform rounded-full bg-sun shadow-light ring-0 motion-safe:transition-transform motion-safe:duration-200 dark:translate-x-6 dark:bg-moon dark:shadow-dark'
      />
    </Switch.Root>
  );
};

export default ThemeSwitch;
