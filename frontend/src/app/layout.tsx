import './globals.css';
import React from 'react';
import { Provider } from '@/qraphql/provider';
import { geistMono, geistSans } from '@/app/layoutConstants';


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