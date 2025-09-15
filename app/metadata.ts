// app/metadata.ts
import type { Metadata } from "next";

const defaultUrl = process.env.VERCEL_URL
  ? `https://${process.env.VERCEL_URL}`
  : "http://localhost:3000";

export const metadata: Metadata = {
  metadataBase: new URL(defaultUrl),
  title: "CryptoPlaza | Tu Amazon en Criptomonedas",
  description:
    "Compra ropa, accesorios, tecnología y más pagando 100% con criptomonedas. CryptoPlaza es tu marketplace global de productos con pagos en crypto.",
  keywords: [
    "cryptoplaza",
    "comprar con crypto",
    "ropa con bitcoin",
    "tecnología con crypto",
    "marketplace crypto",
    "cripto ecommerce",
  ],
  authors: [{ name: "CryptoPlaza Team", url: "https://cryptoplaza.store" }],
  openGraph: {
    title: "CryptoPlaza | Tu Amazon en Criptomonedas",
    description: "Compra todo lo que imaginas y págalo con crypto.",
    url: defaultUrl,
    siteName: "CryptoPlaza",
    images: [
      {
        url: "https://cryptoplaza.com/og-image.png",
        width: 1200,
        height: 630,
        alt: "CryptoPlaza - Marketplace en Crypto",
      },
    ],
    locale: "es_ES",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "CryptoPlaza | Tu Amazon en Criptomonedas",
    description:
      "Compra ropa, accesorios, tecnología y más pagando con criptomonedas.",
    images: ["https://cryptoplaza.com/og-image.png"],
    creator: "@cryptoplaza",
  },
  alternates: {
    canonical: defaultUrl,
  },
};
