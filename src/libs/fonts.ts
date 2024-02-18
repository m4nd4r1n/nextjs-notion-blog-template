import localFont from 'next/font/local';

export const mainFont = localFont({
  src: [{ path: '../../public/fonts/main-variable.woff2' }],
  variable: '--notion-font',
});

export const codeFont = localFont({
  src: [{ path: '../../public/fonts/code-variable.woff2' }],
  variable: '--code-font',
});
