'use client';

import dynamic from 'next/dynamic';
import type { FC, PropsWithChildren } from 'react';

import posthog from 'posthog-js';
import { PostHogProvider as Provider } from 'posthog-js/react';

import config from '@/../blog.config';

if (
  typeof window !== 'undefined' &&
  config.analytics?.posthogAnalytics?.posthogKey
) {
  const { posthogApiHost, posthogKey } = config.analytics.posthogAnalytics;
  const api_host = `${window.location.origin}/ingest`;

  posthog.init(posthogKey, {
    api_host,
    ui_host: posthogApiHost ?? 'https://app.posthog.com',
    capture_pageview: false,
    loaded: (posthog) => {
      if (process.env.NODE_ENV === 'development') posthog.debug();
    },
  });
}

const PostHogPageView = dynamic(() => import('./post-hog-page-view'), {
  ssr: false,
});

const PostHogProvider: FC<PropsWithChildren> = ({ children }) => {
  if (!config.analytics?.posthogAnalytics?.posthogKey) return children;

  return (
    <Provider client={posthog}>
      <PostHogPageView />
      {children}
    </Provider>
  );
};

export default PostHogProvider;
