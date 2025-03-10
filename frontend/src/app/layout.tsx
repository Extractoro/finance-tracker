import './globals.css';
import React from 'react';
import { Provider } from '@/qraphql/provider';
import { comfortaaSans } from '@/app/layoutConstants';


export default function RootLayout({
                                     children,
                                   }: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">

    <body
      className={`${comfortaaSans.variable} antialiased`}
    >
        <Provider>{children}</Provider>
    </body>
    </html>
  );
}