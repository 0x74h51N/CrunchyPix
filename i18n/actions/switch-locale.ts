'use server';

import { cookies } from 'next/headers';
import { NEXT_LOCALE } from '@/i18n/settings';

export async function switchLocaleAction(value: string) {
  cookies().set(NEXT_LOCALE, value, {
    path: '/',
    maxAge: 365 * 24 * 60 * 60,
    httpOnly: false,
    sameSite: 'strict',
    secure: process.env.NODE_ENV === 'production',
  });

  return {
    status: 'success',
  };
}
