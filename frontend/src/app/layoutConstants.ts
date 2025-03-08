import { Geist, Geist_Mono } from 'next/font/google';
import type { Metadata } from 'next';

export const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

export const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Finance Tracker",
  description: "This app can help you to manage your finance!",
};