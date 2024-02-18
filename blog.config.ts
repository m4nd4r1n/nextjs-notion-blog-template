import { blogConfig } from './src/libs/blog-config';

export default blogConfig({
  title: 'Devlog.',
  author: 'm4nd4r1n',
  email: 'kdh@m4nd4r1n.me',
  siteUrl: 'https://blog.m4nd4r1n.me',
  description: "m4nd4r1n's Devlog.",
  locale: 'ko-KR',
  timezone: 'Asia/Seoul',
  postsPerPage: 4,
  sortByDate: true,
  showAbout: true,
  siteLogo: '/logo.png',
});
