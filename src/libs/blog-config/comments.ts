import type { GiscusProps } from '@giscus/react';

interface GiscusConfig {
  provider: 'giscus';
  giscusConfig: Omit<GiscusProps, 'id' | 'host' | 'term' | 'theme' | 'loading'>;
}

export type CommentsConfig = GiscusConfig;
