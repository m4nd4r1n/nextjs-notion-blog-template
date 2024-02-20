import type { Metadata } from 'next';

import 'katex/dist/katex.min.css';

import config from '@/../blog.config';
import OverlayScrollbars from '@/app/overlay-scrollbars';
import Footer from '@/components/footer';
import Header from '@/components/header';
import { codeFont, mainFont } from '@/libs/fonts';
import { cn } from '@/utils/cn';

import './globals.css';

export const metadata: Metadata = {
  title: '',
  description: '',
};

const RootLayout = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  const lang = config.locale.slice(0, 2);

  return (
    <html lang={lang}>
      <body
        className={cn(
          'bg-day font-sans antialiased dark:bg-night',
          mainFont.variable,
          codeFont.variable,
        )}
      >
        <div className='mx-auto max-w-3xl px-4 sm:px-6'>
          <div className='flex min-h-screen flex-col justify-between'>
            <Header />
            <main className='flex-grow pt-[4.25rem]'>{children}</main>
            <Footer />
          </div>
        </div>
        <OverlayScrollbars />
      </body>
    </html>
  );
};

export default RootLayout;
