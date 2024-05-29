import { NextRequest, NextResponse } from 'next/server';
import { NEXT_LOCALE, FALLBACK_LOCALE, supportedLocales, Locales } from '@/i18n/settings';
import cookie from 'cookie';

export async function GET(req: NextRequest) {
  const cookies = cookie.parse(req.headers.get('cookie') || '');
  const locale = (cookies[NEXT_LOCALE] ?? FALLBACK_LOCALE) as Locales;

  if (!supportedLocales.includes(locale)) {
    return NextResponse.json({ error: 'Invalid locale' }, { status: 400 });
  }

  return NextResponse.json({ locale });
}
