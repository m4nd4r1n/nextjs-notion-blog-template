import { AnalyticsConfig } from './analytics';
import { CommentsConfig } from './comments';

export type Locale = 'en-US' | 'ko-KR';

export interface BlogConfig {
  title: string;
  author: string;
  description: string;
  theme: 'light' | 'dark' | 'system';
  locale: Locale;
  timezone: string;
  email: string;
  siteUrl: string;
  siteLogo: string;
  postsPerPage: number;
  sortByDate: boolean;
  showAbout: boolean;
  socialLink: string;
  comments?: CommentsConfig;
  analytics?: AnalyticsConfig;
  googleSiteVerification?: string;
  lightBg?: string;
  darkBg?: string;
}

export const blogConfig = (config: BlogConfig) => config;
