import { NextRequest, NextResponse } from 'next/server';
import { FALLBACK_LOCALE, Locales } from './i18n/settings';

const languageMappings: { [key: string]: Locales } = {
  en: 'en',
  de: 'de',
  tr: 'tr',
  'en-US': 'en',
  'de-DE': 'de',
  'tr-TR': 'tr',
};

export default function middleware(req: NextRequest) {
  let lng: Locales = FALLBACK_LOCALE;
  const cookieLang = req.cookies.get('preferred_language')?.value as Locales;

  const referer = req.headers.get('referer');
  const acceptLang = req.headers.get('accept-language');

  if (cookieLang) {
    lng = cookieLang;
  } else if (referer && !cookieLang) {
    const url = new URL(referer);
    const urlParams = new URLSearchParams(url.search);
    let searchLang: string | null = null;

    if (url.hostname.includes('google')) {
      searchLang = urlParams.get('hl');
    } else if (url.hostname.includes('bing')) {
      const mkt = urlParams.get('mkt');
      if (mkt) {
        searchLang = mkt.split('-')[0];
      }
    }

    if (searchLang && languageMappings[searchLang]) {
      lng = languageMappings[searchLang];
    }
  }

  if (acceptLang && !cookieLang) {
    const lngInp = acceptLang.split(',')[0].split('-')[0];
    if (languageMappings[lngInp]) {
      lng = languageMappings[lngInp];
    }
  }

  const response = NextResponse.next();
  if (!cookieLang) {
    response.cookies.set('preferred_language', lng, {
      path: '/',
      maxAge: 365 * 24 * 60 * 60,
      httpOnly: false,
      sameSite: 'strict',
      secure: process.env.NODE_ENV === 'production',
    });
    response.headers.set('x-preferred-language', lng);
  }
  return response;
}

export const config = {
  matcher: '/:path*',
};
