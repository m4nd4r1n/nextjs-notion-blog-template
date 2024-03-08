import { blogConfig } from './src/libs/blog-config';

export default blogConfig({
  title: 'Next.js notion blog',
  author: 'm4nd4r1n',
  email: 'kdh@m4nd4r1n.me',
  siteUrl: 'https://blog-demo.m4nd4r1n.me',
  description:
    'A Next.js, Tailwind CSS blog template, based on Next.js App Router and using react-notion-x to render notion posts.',
  locale: 'en-US',
  timezone: 'Asia/Seoul',
  theme: 'system',
  postsPerPage: 4,
  sortByDate: true,
  showAbout: true,
  siteLogo: '/logo.png',
  socialLink: 'https://github.com/m4nd4r1n',
  lightBg: '#ffffff',
  darkBg: '#18181b',
  // comments: {
  //   provider: 'giscus',
  //   giscusConfig: {
  //     repo: '',
  //     repoId: '',
  //     category: 'Announcements',
  //     categoryId: '',
  //     mapping: 'pathname',
  //     strict: '0',
  //     reactionsEnabled: '1',
  //     emitMetadata: '0',
  //     inputPosition: 'top',
  //     lang: 'ko',
  //   },
  // },
  analytics: {
    googleAnalytics: {
      googleAnalyticsId: process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID ?? '',
    },
    posthogAnalytics: {
      posthogKey: process.env.NEXT_PUBLIC_POST_HOG_ID ?? '',
      posthogApiHost: process.env.NEXT_PUBLIC_POST_HOG_API_HOST,
    },
  },
  // googleSiteVerification: '',
});
