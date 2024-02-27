import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

import conf from '../blog.config';

const LOCALE_HEADER = 'X-Next-Locale';
const LOCALE_COOKIE = 'Next-Locale';

export const middleware = (request: NextRequest) => {
  if (
    conf.analytics?.posthogAnalytics &&
    request.nextUrl.pathname.startsWith('/ingest')
  ) {
    const { posthogApiHost } = conf.analytics.posthogAnalytics;
    const { hostname } = new URL(posthogApiHost ?? 'https://app.posthog.com');

    const requestHeaders = new Headers(request.headers);
    requestHeaders.set('host', hostname);

    const url = request.nextUrl.clone();
    url.protocol = 'https';
    url.hostname = hostname;
    url.port = '443';
    url.pathname = url.pathname.replace(/^\/ingest/, '');

    return NextResponse.rewrite(url, {
      headers: requestHeaders,
    });
  }

  const response = NextResponse.next();
  response.headers.set(LOCALE_HEADER, conf.locale);
  if (request.cookies.get(LOCALE_COOKIE)?.value !== conf.locale) {
    response.cookies.set(LOCALE_COOKIE, conf.locale, { sameSite: 'strict' });
  }
  return response;
};

export const config = {
  matcher: [
    '/((?!api|static|.*\\..*|_next|favicon.ico|robots.txt).*)',
    '/ingest/:path*',
  ],
};
