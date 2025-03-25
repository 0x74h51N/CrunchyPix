'use server';
import { cookies } from 'next/headers';

export async function setCookiesConsent() {
  const cookieStore = cookies();

  (await cookieStore).set('cookiesConsent', 'true', {
    path: '/',
    expires: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000),
    sameSite: 'strict',
    secure: true,
    httpOnly: true,
  });

  return { success: true };
}

export async function getCookieConsent(): Promise<string> {
  const response = await (await cookies()).get('cookiesConsent');
  if (response && response.value === 'true') {
    return 'true';
  }
  return 'false';
}
