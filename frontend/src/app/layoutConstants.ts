import { Comfortaa, Montserrat_Alternates } from 'next/font/google';
import type { Metadata } from 'next';

// export const geistMono = Geist_Mono({
//   variable: "--font-geist-mono",
//   subsets: ["latin"],
// });

export const comfortaaSans = Comfortaa({
  variable: "--font-comfortaa-sans",
  subsets: ["latin", 'cyrillic'],
});

export const montserratAlternatesSans = Montserrat_Alternates({
  variable: "--font-montserrat-alternates",
  subsets: ["latin", 'cyrillic'],
  weight: ['100', '200', '300', '400', '500', '600', '700', '800'],
});

export const metadata: Metadata = {
  title: "Finance Tracker",
  description: "This app can help you to manage your finance!",
};