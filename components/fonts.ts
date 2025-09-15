import { Inter } from 'next/font/google';
import { Geist } from "next/font/google";

export const inter = Inter({ subsets: ['latin'] });

export const geistSans = Geist({
  variable: "--font-geist-sans",
  display: "swap",
  subsets: ["latin"],
});