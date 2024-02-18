import type { Metadata } from 'next';

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
  return (
    <html lang='en'>
      <body
        className={cn(
          'font-sans antialiased',
          mainFont.variable,
          codeFont.variable,
        )}
      >
        {children}
      </body>
    </html>
  );
};

export default RootLayout;
