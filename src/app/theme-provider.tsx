'use client';

import type { FC, PropsWithChildren } from 'react';

import { ThemeProvider as Provider } from 'next-themes';

import config from '@/../blog.config';

interface ThemeProviderProps extends PropsWithChildren {}

const ThemeProvider: FC<ThemeProviderProps> = ({ children }) => {
  return (
    <Provider attribute='class' defaultTheme={config.theme} enableSystem>
      {children}
    </Provider>
  );
};

export default ThemeProvider;
