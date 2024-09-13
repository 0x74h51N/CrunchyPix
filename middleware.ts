import { NextRequest, NextResponse } from 'next/server';
import {
  FALLBACK_LOCALE,
  Locales,
  NEXT_LOCALE,
  supportedLocales,
} from './i18n/settings';

export default function middleware(req: NextRequest) {
  const url = req.nextUrl.clone();
  const pathLocale = url.pathname.split('/')[1] as Locales;
  const cookieLang = req.cookies.get(NEXT_LOCALE)?.value as Locales;
  const acceptLang = req.headers.get('accept-language');
  let lng: Locales;

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
    '/((?!api|static|.*\\..*|_next|favicon-light\\.ico|favicon-dark\\.ico).*)',
  ],
};
