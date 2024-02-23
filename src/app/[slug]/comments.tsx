'use client';

import dynamic from 'next/dynamic';

import { useTheme } from 'next-themes';

import config from '@/../blog.config';
import Client from '@/components/client';

const Giscus = dynamic(() => import('@giscus/react'), { ssr: false });

const Comments = () => {
  const { theme, resolvedTheme } = useTheme();

  const isDark = theme === 'dark' || resolvedTheme === 'dark';
  return (
    <div
      id='comment'
      className='mx-auto mt-4 border-y border-neutral-200 py-4 dark:border-neutral-700'
    >
      {config.comments?.provider === 'giscus' && (
        <Client>
          <Giscus
            theme={isDark ? 'noborder_dark' : 'light'}
            {...config.comments.giscusConfig}
          />
        </Client>
      )}
    </div>
  );
};

export default Comments;
