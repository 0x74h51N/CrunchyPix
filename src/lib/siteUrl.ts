/**
 * Canonical site URL, resolved from a single env variable.
 *
 * Priority:
 * 1. NEXT_PUBLIC_SITE_URL (e.g. https://crunchypix.vercel.app)
 * 2. VERCEL_PROJECT_PRODUCTION_URL (set by Vercel, host only)
 * 3. VERCEL_URL (set by Vercel per deployment, host only)
 * 4. http://localhost:8080
 */
const resolveSiteUrl = (): string => {
  const explicit = process.env.NEXT_PUBLIC_SITE_URL;
  if (explicit) return explicit.replace(/\/+$/, '');

  const vercelHost =
    process.env.VERCEL_PROJECT_PRODUCTION_URL || process.env.VERCEL_URL;
  if (vercelHost) return `https://${vercelHost}`;

  return 'http://localhost:8080';
};

export const SITE_URL = resolveSiteUrl();
export const SITE_HOST = new URL(SITE_URL).host;
