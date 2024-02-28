import type { Metadata, Viewport } from 'next';

import { GoogleAnalytics } from '@next/third-parties/google';
import 'katex/dist/katex.min.css';
import 'prismjs/themes/prism.min.css';
import 'react-notion-x/src/styles.css';

import config from '@/../blog.config';
import Footer from '@/components/footer';
import Header from '@/components/header';
import { codeFont, mainFont } from '@/libs/fonts';
import { cn } from '@/utils/cn';

import './globals.css';
import OverlayScrollbars from './overlay-scrollbars';
import PostHogProvider from './post-hog-provider';
import ThemeProvider from './theme-provider';

const isProd = process.env.NODE_ENV === 'production';

const RootLayout = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  const lang = config.locale.slice(0, 2);

  return (
    <html
      lang={lang}
      suppressHydrationWarning
      data-overlayscrollbars-initialize=''
    >
      <body
        className={cn(
          'bg-day font-sans antialiased dark:bg-night',
          mainFont.variable,
          codeFont.variable,
        )}
        data-overlayscrollbars-initialize=''
      >
        <PostHogProvider>
          <div className='mx-auto max-w-3xl px-4 sm:px-6'>
            <div className='flex min-h-screen flex-col justify-between'>
              <ThemeProvider>
                <Header />
                <main className='flex-grow pt-[4.25rem]'>{children}</main>
                <Footer />
                <OverlayScrollbars />
              </ThemeProvider>
            </div>
          </div>
        </PostHogProvider>
      </body>
      {isProd && config.analytics?.googleAnalytics && (
        <GoogleAnalytics
          gaId={config.analytics.googleAnalytics.googleAnalyticsId}
        />
      )}
    </html>
  );
};

export default RootLayout;

export const metadata: Metadata = {
  metadataBase: new URL(config.siteUrl),
  title: config.title,
  description: config.description,
  verification: { google: config.googleSiteVerification },
  robots: {
    follow: true,
    index: true,
  },
  openGraph: {
    title: config.title,
    description: config.description,
    url: '/',
    siteName: config.title,
    locale: config.locale,
    type: 'website',
  },
  twitter: {
    title: config.title,
    card: 'summary_large_image',
  },
  alternates: {
    canonical: '/',
  },
};

export const generateViewport = (): Viewport => {
  const light = config.lightBg || '#ffffff';
  const dark = config.darkBg || '#18181b';

  if (config.theme === 'system') {
    return {
      themeColor: [
        {
          media: '(prefers-color-scheme: light)',
          color: light,
        },
        {
          media: '(prefers-color-scheme: dark)',
          color: dark,
        },
      ],
    };
  }

  return {
    themeColor: {
      color: config.theme === 'dark' ? dark : light,
    },
  };
};
