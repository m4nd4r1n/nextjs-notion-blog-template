import { blogConfig } from './src/libs/blog-config';

export default blogConfig({
  title: 'Devlog.',
  author: 'm4nd4r1n',
  email: 'kdh@m4nd4r1n.me',
  siteUrl: 'https://blog.m4nd4r1n.me',
  description: "m4nd4r1n's Devlog.",
  locale: 'ko-KR',
  timezone: 'Asia/Seoul',
  theme: 'system',
  postsPerPage: 4,
  sortByDate: true,
  showAbout: true,
  siteLogo: '/logo.png',
  socialLink: 'https://github.com/m4nd4r1n',
  comments: {
    provider: 'giscus',
    giscusConfig: {
      repo: 'm4nd4r1n/blog-comment',
      repoId: 'R_kgDOKHzBrw',
      category: 'Announcements',
      categoryId: 'DIC_kwDOKHzBr84CYpHD',
      mapping: 'pathname',
      strict: '0',
      reactionsEnabled: '1',
      emitMetadata: '0',
      inputPosition: 'top',
      lang: 'ko',
    },
  },
});
