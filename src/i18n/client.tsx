'use client';

import type { ComponentPropsWithoutRef, FC } from 'react';

import { createI18nClient } from 'next-international/client';

import config from '@/../blog.config';

const {
  useI18n,
  useScopedI18n,
  I18nProviderClient: Provider,
} = createI18nClient({
  'en-US': () => import('./en-US'),
  'ko-KR': () => import('./ko-KR'),
});

interface I18nProviderClientProps
  extends Omit<ComponentPropsWithoutRef<typeof Provider>, 'locale'> {}

const I18nProviderClient: FC<I18nProviderClientProps> = ({
  fallback,
  children,
}) => {
  return (
    <Provider locale={config.locale} fallback={fallback}>
      {children}
    </Provider>
  );
};

export { useI18n, useScopedI18n, I18nProviderClient };
