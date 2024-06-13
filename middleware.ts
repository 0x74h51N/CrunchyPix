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

  if (cookieLang) {
    lng = cookieLang;
  } else {
    const referer = req.headers.get('referer');
    const acceptLang = req.headers.get('accept-language');

    if (referer) {
      const urlParams = new URLSearchParams(referer.split('?')[1]);
      let searchLang: string | null = null;

      if (referer.includes('google')) {
        searchLang = urlParams.get('hl');
      } else if (referer.includes('bing')) {
        const mkt = urlParams.get('mkt');
        if (mkt) {
          searchLang = mkt.split('-')[0];
        }
      }

      if (searchLang && languageMappings[searchLang]) {
        lng = languageMappings[searchLang];
      }
    }

    if (!lng && acceptLang) {
      const lngInp = acceptLang.split(',')[0].split('-')[0];
      lng = languageMappings[lngInp] || FALLBACK_LOCALE;
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
