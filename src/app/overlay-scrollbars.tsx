'use client';

import { useEffect } from 'react';

import { useTheme } from 'next-themes';
import { useOverlayScrollbars } from 'overlayscrollbars-react';
import 'overlayscrollbars/overlayscrollbars.css';

const OverlayScrollbars = () => {
  const { theme, resolvedTheme } = useTheme();
  const isDark = theme === 'dark' || resolvedTheme === 'dark';
  const [initialize] = useOverlayScrollbars({
    defer: true,
    options: {
      scrollbars: {
        theme: isDark ? 'os-theme-light' : 'os-theme-dark',
        autoHide: 'scroll',
      },
    },
  });

  useEffect(() => {
    initialize(document.body);
  }, [initialize]);

  return null;
};

export default OverlayScrollbars;
