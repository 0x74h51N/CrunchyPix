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

export default async function middleware(req: NextRequest) {
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

  const url = req.nextUrl.clone();
  if (url.pathname === '/api/contact') {
    const token = req.headers.get('x-turnstile-token');
    if (!token) {
      return NextResponse.json(
        { message: 'Turnstile token missing' },
        { status: 400 },
      );
    }

    const secret = process.env.TURNSLITE_SECRET_KEY;
    if (!secret) {
      return NextResponse.json(
        { message: 'Turnstile secret key missing' },
        { status: 500 },
      );
    }
    const verificationUrl = `https://challenges.cloudflare.com/turnstile/v0/siteverify`;

    const response = await fetch(verificationUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: `secret=${encodeURIComponent(secret)}&response=${encodeURIComponent(token)}`,
    });

    const verification = await response.json();

    if (!verification.success) {
      return NextResponse.json(
        {
          message: 'Turnstile verification failed',
          errors: verification['error-codes'],
        },
        { status: 400 },
      );
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
