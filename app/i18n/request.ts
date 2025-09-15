import { getRequestConfig } from 'next-intl/server';
import { routing } from './routing'; // Adjust path if needed (same folder)
import { hasLocale } from 'next-intl';

export default getRequestConfig(async ({ requestLocale }) => {
  let requested = await requestLocale; // Can be string | undefined

  // Use hasLocale to safely check (handles undefined and types it correctly)
  const locale = hasLocale(routing.locales, requested)
    ? requested // Now guaranteed to be 'en' | 'es'
    : routing.defaultLocale;

  return {
    locale,
    messages: (await import(`../messages/${locale}.json`)).default, // Adjust path to your messages/
  };
});