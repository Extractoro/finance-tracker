import './globals.css';
import React from 'react';
import { geistMono, geistSans } from '@/app/layoutConstants';
import { Provider } from '@/graphql/provider';


export default function RootLayout({
                                     children,
                                   }: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">

    <body
      className={`${geistSans.variable} ${geistMono.variable} antialiased`}
    >
        <Provider>{children}</Provider>
    </body>
    </html>
  );
}