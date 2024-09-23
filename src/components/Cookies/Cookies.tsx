import { getCookieConsent } from '@/app/actions/setCookiesConsent';
import { Analytics } from '@vercel/analytics/react';
import { SpeedInsights } from '@vercel/speed-insights/next';

export default async function Layout() {
  const cookieConsent = await getCookieConsent();

  return (
    <>
      {cookieConsent === 'true' ? (
        <>
          <Analytics mode="auto" />
          <SpeedInsights />
        </>
      ) : null}
    </>
  );
}
