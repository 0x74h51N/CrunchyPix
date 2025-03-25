'use server';
import { cookies } from 'next/headers';

export type ThemeType = 'dark' | 'light';

export async function setThemeAction(theme: ThemeType) {
  const cookieStore = cookies();

  (await cookieStore).set('theme', theme, {
    path: '/',
    expires: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000),
    sameSite: 'strict',
    secure: true,
    httpOnly: true,
  });

  return { success: true };
}

export async function getTheme(): Promise<ThemeType | null> {
  const response = await (await cookies()).get('theme');
  if (response && (response.value === 'dark' || response.value === 'light')) {
    return response.value as ThemeType;
  }
  return null;
}
