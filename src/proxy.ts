import { NextRequest, NextResponse } from 'next/server';
import {
  FALLBACK_LOCALE,
  Locales,
  NEXT_LOCALE,
  supportedLocales,
} from './i18n/settings';
import { SITE_HOST, SITE_URL } from './lib/siteUrl';

export default function proxy(req: NextRequest) {
  const url = req.nextUrl.clone();
  const pathLocale = url.pathname.split('/')[1] as Locales;
  const cookieLang = req.cookies.get(NEXT_LOCALE)?.value as Locales;
  const acceptLang = req.headers.get('accept-language');
  const production = process.env.VERCEL_ENV === 'production';
  let lng: Locales;
  const host = req.headers.get('host');

  if (
    production &&
    host &&
    host !== SITE_HOST &&
    host.endsWith('.vercel.app')
  ) {
    return NextResponse.redirect(
      `${SITE_URL}${url.pathname}${url.search}`,
      301,
    );
  }

  if (supportedLocales.includes(pathLocale)) {
    return NextResponse.next();
  }

  if (cookieLang && supportedLocales.includes(cookieLang)) {
    lng = cookieLang;
  } else if (acceptLang) {
    const lngInp = acceptLang.split(',')[0];
    const primaryLang = lngInp.split('-')[0];
    lng =
      supportedLocales.find((loc) => primaryLang.includes(loc)) ||
      FALLBACK_LOCALE;
  } else {
    lng = FALLBACK_LOCALE;
  }

  url.pathname = `/${lng}${url.pathname}`;
  return NextResponse.redirect(url);
}

export const config = {
  matcher: [
    '/((?!api|static|.*\\..*|_next|favicon\\.ico|favicon-light\\.ico).*)',
  ],
};
