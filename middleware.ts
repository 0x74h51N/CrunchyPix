import { NextRequest, NextResponse } from 'next/server';
import { FALLBACK_LOCALE, supportedLocales, Locales } from './i18n/settings';

export default function middleware(req: NextRequest) {
  let lng: Locales;
  const cookieLang = req.cookies.get('preferred_language')?.value as Locales;

  if (cookieLang) {
    lng = cookieLang;
  } else {
    const acceptLang = req.headers.get('accept-language');
    if (acceptLang) {
      const lngInp = acceptLang.split(',')[0].split('-')[0];
      if (!supportedLocales.includes(lngInp as Locales)) {
        lng = FALLBACK_LOCALE;
      } else {
        lng = lngInp as Locales;
      }
    } else {
      lng = FALLBACK_LOCALE;
    }
  }

  const response = NextResponse.next();
  response.cookies.set('preferred_language', lng, {
    path: '/',
    maxAge: 365 * 24 * 60 * 60,
    httpOnly: false,
    sameSite: 'strict',
    secure: process.env.NODE_ENV === 'production',
  });

  response.headers.set('x-preferred-language', lng);

  return response;
}

export const config = {
  matcher: '/:path*',
};
