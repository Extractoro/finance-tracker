import './globals.css';
import React from 'react';
import { Provider } from '@/qraphql/provider';
import { geistMono, geistSans } from '@/app/layoutConstants';
import Head from 'next/head';

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
    <Head>
      <title>Finance</title>
      <meta name="description" content="This app can help you to manage your finance!" />
    </Head>
    <body
      className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <Provider>{children}</Provider>
      </body>
    </html>
  );
}