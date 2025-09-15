import { defineRouting } from 'next-intl/routing';

export const routing = defineRouting({
  locales: ['en', 'es'] as const, // 'as const' fixes union type inference
  defaultLocale: 'en',
  localePrefix: 'always', // Or 'as-needed' if you want no prefix for default locale
});