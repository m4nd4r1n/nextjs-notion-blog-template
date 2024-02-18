import type { Metadata } from 'next';

import config from '@/../blog.config';
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
          'font-sans antialiased',
          mainFont.variable,
          codeFont.variable,
        )}
      >
        <div className='mx-auto max-w-3xl px-4 sm:px-6'>
          <div className='flex min-h-screen flex-col justify-between'>
            <Header />
            <main className='flex-grow'>{children}</main>
            <Footer />
          </div>
        </div>
      </body>
    </html>
  );
};

export default RootLayout;
