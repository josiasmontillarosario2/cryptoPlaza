import "../globals.css";
import { metadata } from "../metadata";
import { geistSans } from "@/components/fonts";
import Navbar from "@/components/navbar";
import { Footer } from "@/components/footer";
import { Suspense } from "react";
import { NavbarSkeleton } from "@/components/Skeletons/NavbarSkeleton";
import { HomeSkeleton } from "@/components/Skeletons/HomeSkeleton";
//import NavMobile from "@/components/NavMobile";
import { hasLocale, NextIntlClientProvider } from "next-intl";
import { notFound } from "next/navigation";
import { routing } from "@/app/i18n/routing"; // Adjust path if needed
import { Analytics } from "@vercel/analytics/next"

type Props = {
  children: React.ReactNode;
  params: Promise<{ lang: string }>; // Use 'lang' to match your folder
};

export { metadata };

export default async function LocaleLayout({ children, params }: Props) {
  const { lang } = await params;

  // Use hasLocale for safe check (fixes type error: handles string vs. union)
  if (!hasLocale(routing.locales, lang)) {
    notFound();
  }

  // Load messages dynamically based on locale
  let messages;
  try {
    messages = (await import(`../messages/${lang}.json`)).default; // Adjust path to your messages files (e.g., messages/en.json, messages/es.json)
  } catch (error) {
    notFound(); // Fallback if messages file doesn't exist
  }

  return (
    <html lang={lang} suppressHydrationWarning={true}>
      <body
        className={`${geistSans.className} antialiased bg-black text-white min-h-screen`}
      >
        <NextIntlClientProvider locale={lang} messages={messages}>
          <div className="flex flex-col min-h-screen">
            <Suspense fallback={<NavbarSkeleton />}>
              <Navbar />
            </Suspense>
            <Suspense fallback={<HomeSkeleton />}>
              <main className="flex-1">{children}</main>
            </Suspense>
            <Footer />
          </div>
        </NextIntlClientProvider>
        <Analytics />
      </body>
    </html>
  );
}