'use server';

import { cookies } from 'next/headers';
import { Locales, NEXT_LOCALE, supportedLocales } from '@/i18n/settings';

export async function switchLocaleAction(value: Locales) {
  if (supportedLocales.includes(value)) {
    cookies().set(NEXT_LOCALE, value, {
      path: '/',
      maxAge: 365 * 24 * 60 * 60,
      httpOnly: true,
      sameSite: 'strict',
      secure: process.env.NODE_ENV === 'production',
    });

    return {
      status: 'success',
    };
  }

  return {
    status: 'error',
    message: 'Unsupported locale',
  };
}

export async function getLocaleCookie(): Promise<Locales | null> {
  const response = cookies().get(NEXT_LOCALE);

  if (response && supportedLocales.includes(response.value as Locales)) {
    return response.value as Locales;
  }

  return null;
}
