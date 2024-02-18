export type Locale = 'en-US' | 'ko-KR';

export interface BlogConfig {
  title: string;
  author: string;
  description: string;
  locale: Locale;
  timezone: string;
  email: string;
  siteUrl: string;
  siteLogo: string;
  postsPerPage: number;
  sortByDate: boolean;
  showAbout: boolean;
}

export const blogConfig = (config: BlogConfig) => config;
