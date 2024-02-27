import type { Metadata } from 'next';

import { GoogleAnalytics } from '@next/third-parties/google';
import 'katex/dist/katex.min.css';

import config from '@/../blog.config';
import PostHogProvider from '@/app/post-hog-provider';
import Footer from '@/components/footer';
import Header from '@/components/header';
import { codeFont, mainFont } from '@/libs/fonts';
import { cn } from '@/utils/cn';

import './globals.css';
import OverlayScrollbars from './overlay-scrollbars';
import ThemeProvider from './theme-provider';

export const metadata: Metadata = {
  title: '',
  description: '',
};

const isProd = process.env.NODE_ENV === 'production';

const RootLayout = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  const lang = config.locale.slice(0, 2);

  return (
    <html lang={lang} suppressHydrationWarning>
      <body
        className={cn(
          'bg-day font-sans antialiased dark:bg-night',
          mainFont.variable,
          codeFont.variable,
        )}
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
