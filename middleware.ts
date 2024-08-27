import { NextRequest, NextResponse } from 'next/server';
import { FALLBACK_LOCALE, Locales } from './i18n/settings';
import { switchLocaleAction } from './app/actions/switch-locale';

const languageMappings: { [key: string]: Locales } = {
  en: 'en',
  de: 'de',
  tr: 'tr',
  'en-US': 'en',
  'de-DE': 'de',
  'tr-TR': 'tr',
};

export default async function middleware(req: NextRequest) {
  const url = req.nextUrl.clone();
  const pathLocale = url.pathname.split('/')[1] as Locales;
  const cookieLang = req.cookies.get('preferred_language')?.value as Locales;
  const acceptLang = req.headers.get('accept-language');
  let lng: Locales | undefined;

  if (pathLocale && Object.keys(languageMappings).includes(pathLocale)) {
    lng = pathLocale;
  } else if (cookieLang) {
    lng = cookieLang;
    url.pathname = `/${lng}${url.pathname}`;
    return NextResponse.redirect(url);
  } else if (acceptLang) {
    const lngInp = acceptLang.split(',')[0];
    const primaryLang = lngInp.split('-')[0];
    if (languageMappings[primaryLang]) {
      lng = languageMappings[primaryLang];
      url.pathname = `/${lng}${url.pathname}`;
      return NextResponse.redirect(url);
    }
  } else {
    lng = FALLBACK_LOCALE;
    url.pathname = `/${lng}${url.pathname}`;
    return NextResponse.redirect(url);
  }

  if (pathLocale === lng) {
    return NextResponse.next();
  }

  if (cookieLang !== lng) {
    await switchLocaleAction(lng as Locales);
    return NextResponse.redirect(url);
  }

  return NextResponse.next();
}

export const config = {
  matcher: '/((?!api|static|.*\\..*|_next).*)',
};
